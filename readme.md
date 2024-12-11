# suresure-check-slip-e2e

This repository contains end-to-end tests for the SureSure Check Slip application using Playwright.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the dependencies, run:

```bash
npm install
```

## Usage

To run the tests, use the following command:

```bash
npx playwright test
```

## Project Structure

- `tests/`: Contains the test files.
- `playwright.config.ts`: Playwright configuration file.
- `package.json`: Project dependencies and scripts.
- `vercel.json`: Configuration for deploying the Playwright report to Vercel.
- `.gitignore`: Specifies files and directories to be ignored by Git.

## Configuration

The Playwright configuration is defined in `playwright.config.ts`. You can customize the settings such as test directory, reporter, and browser settings.

## Running Tests

To run all tests, use:

```bash
npx playwright test
```

To run a specific test file, use:

```bash
npx playwright test tests/<test-file-name>.spec.ts
```

To generate a Playwright report, use:

```bash
npx playwright show-report
```
