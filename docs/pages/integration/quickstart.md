---
title: Quickstart
position: 10
category: Integration
description: The complete guide to NFID
---

Sample implementation to demonstrate how this could look in your app: https://playground.nfid.one

## Installation

Add the `@nfid/embed` package and dependencies:

```bash
# npm
npm install @nfid/embed @dfinity/agent @dfinity/identity @dfinity/auth-client @dfinity/principal

# yarn
yarn add @nfid/embed @dfinity/agent @dfinity/identity @dfinity/auth-client @dfinity/principal
```

## Setup

Import the `NFID` class:

```ts
import { NFID } from "@nfid/embed"
```

The static `NFID.init()` method returns a promise that resolves as soon as the mounted NFID iframe
is ready to use. You can use the `await` keyword to wait for the promise to resolve:

```ts
type NFIDConfig = {
  origin?: string; // default is "https://nfid.one"
  application?: { // your application details to display in the NFID iframe
    name?: string; // your app name user can recognize
    logo?: string; // your app logo user can recognize
  };
};

const nfid = await NFID.init({
  application: {
    name: "My Sweet App",
    logo: "https://dev.nfid.one/static/media/id.300eb72f3335b50f5653a7d6ad5467b3.svg"
  },
}: NFIDConfig);
```

You're now ready to onboard users and request approvals without interrupting your dapp UX.
