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
}
