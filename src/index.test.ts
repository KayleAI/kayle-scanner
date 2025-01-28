import { describe, expect, test } from "bun:test";
import { scan } from "./index";

describe("scan google", () => {
	test("not adult content", async () => {
		const input = "https://www.google.com";
		const expected = false;
		expect(await scan(input)).toBe(expected);
	});

	test("adult content", async () => {
		const input = "https://www.onlyfans.com";
		const expected = true;
		expect(await scan(input)).toBe(expected);
	});

	test("getallmylinks", async () => {
		const input = "http://getallmylinks.com/sofiababyyx/";
		const expected = true;
		expect(await scan(input)).toBe(expected);
	});

	test("allmylinks", async () => {
		const input = "https://allmylinks.com/kuroha";
		const expected = true;
		expect(await scan(input)).toBe(expected);
	});

	test("linktree with adult content", async () => {
		const input = "https://linktr.ee/kurohaa";
		const expected = true;
		expect(await scan(input)).toBe(expected);
	});

	test("beacons with no adult content", async () => {
		const input = "https://beacons.ai/digitallymeena";
		const expected = false;
		expect(await scan(input)).toBe(expected);
	});
});
