# mal

A monorepo containing a React Native mobile app and an Express API, managed with [Turborepo](https://turbo.build/) and [Bun](https://bun.sh/).

## Structure

```
apps/
  api/      - Express REST API (TypeScript)
  mobile/   - Expo React Native app
packages/
  validators/ - Shared types and validation schemas
```

## Prerequisites

- [Bun](https://bun.sh/) v1.2.10+
- [Node.js](https://nodejs.org/) (for Expo tooling)
- [Expo Go](https://expo.dev/go) on your phone, or an iOS/Android simulator

## Getting started

Install dependencies from the root:

```bash
bun install
```

## Running the project

### Run everything (API + mobile) concurrently

```bash
bun dev
```

### Run apps individually

**API only:**

```bash
cd apps/api
bun dev
```

The API runs on `http://localhost:3000` by default.

**Mobile only:**

```bash
cd apps/mobile
bun dev
```

Then scan the QR code with Expo Go, or press:
- `i` to open in iOS simulator
- `a` to open in Android emulator

## Building

```bash
bun build
```

## Cleaning

Remove all build artifacts and `node_modules`:

```bash
bun clean
```
