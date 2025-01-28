import { URL } from "node:url";
import type { ScanOptions } from "./types";

const adultExtensions = [
	"adult",
	"cam",
	"porn",
	"sex",
	"sexy",
	"webcam",
	"wtf",
	"xxx",
];

const adultDomains = new Set([
	"onlyfans.com",
	"fansly.com",
	"pornhub.com",
	"xhamster.com",
	"xvideos.com",
	"porn.com",
]);

const linkShorteners = new Set([
	"getallmylinks.com",
	"allmylinks.com", // this gets blocked by the bot detection service, but it's commonly used to link to adult content
	"linktr.ee",
	"beacons.ai",
	"linktree.com",
	"linkin.bio",
	"link.bio",
]);

function getDomain(url: URL) {
	return url.hostname.split(".").slice(-2).join(".");
}

/**
 * Scrapes the URL for adult content
 *
 * This function will follow at most 5 redirects and check the final URL.
 * If there are more than 5 redirects, the function will return true.
 *
 * @param url URL to scrape
 * @returns Whether the URL is adult content
 */
async function scrape(url: URL, options: ScanOptions = defaultOptions) {
	const response = await fetch(url.toString(), {
		redirect: options.followRedirects ? "follow" : "manual",
	});

	const page = await response.text();

	if (page.includes("Just a moment")) {
		// we've been stopped by a bot detection service
		if (linkShorteners.has(getDomain(url))) {
			return true;
		}

		return false;
	}

	const urlPattern =
		/(?:https?:\/\/[^\s"'<>]+|href=["']?(https?:\/\/[^"'\s>]+))/gi;
	const matches = page.matchAll(urlPattern);

	const links = [...matches].map((match) => {
		const url = match[0];
		return url.startsWith("href=") ? url.replace(/^href=["']?/, "") : url;
	});

	for (const link of links) {
		try {
			const linkUrl = new URL(link);
			const domain = linkUrl.hostname.split(".").slice(-2).join(".");
			if (adultDomains.has(domain)) {
				return true;
			}
		} catch {
			console.warn(`Error processing link: ${link}`);
		}
	}

	return false;
}

const defaultOptions: ScanOptions = {
	followRedirects: true,
};

/**
 * Identifies if adult content is likely to be present in the URL
 *
 * @param url_to_scan URL to check
 * @param options Scan options
 * @returns Whether the URL is adult content
 */
export async function scan(
	url_to_scan: string,
	options: ScanOptions = defaultOptions,
): Promise<boolean> {
	const opts = { ...defaultOptions, ...options };

	const url = new URL(url_to_scan);

	if (!url.protocol) {
		url.protocol = "http"; // default to http instead of https
	}

	const domain = getDomain(url);
	const extension = domain.split(".").pop() ?? "";

	if (adultDomains.has(domain)) {
		return true;
	}

	if (adultExtensions.includes(extension)) {
		return true;
	}

	const result = await scrape(url, opts);

	return result;
}
