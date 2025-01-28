export interface ScanOptions {
	/**
	 * Whether to follow redirects
	 *
	 * @default true
	 */
	followRedirects?: boolean;

	/**
	 * Add a custom list of domains.
	 *
	 * @default []
	 */
	customDomains?: string[];

	/**
	 * If the scanner is blocked by a bot detection system, one of the following options will be applied:
	 * - ignore: The scanner will return false
	 * - links: The scanner will return true if the link is a link shortener
	 * - always: The scanner will always return true
	 *
	 * @default links
	 */
	botDetection?: "ignore" | "links" | "always";

	/**
	 * How to handle errors.
	 * - ignore: Do nothing
	 * - log: Log the error
	 * - throw: Throw the error
	 *
	 * @default ignore
	 */
	errors?: "ignore" | "log" | "throw";
}
