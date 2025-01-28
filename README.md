# kayle-scanner

Scan URLs for adult content.

## Usage

Install the package:

```bash
npm install kayle-scanner
```

Import the package:

```ts
import { scan } from "kayle-scanner";
```

Use the `scan` function:

```ts
const thisIsntAdultContent = scan("https://www.google.com");
console.log(thisIsntAdultContent); // false

const thisIsAdultContent = scan("https://onlyfans.com");
console.log(thisIsAdultContent); // true
```

## Options

```ts
const options: ScanOptions = {
	followRedirects: true,
	botDetection: "links", // ignore, links, always
	customDomains: [],
	errors: "ignore", // ignore, log, throw
};
```

## Tests

```bash
bun test
```
