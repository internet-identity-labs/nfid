---
title: Overview
position: 40
description: "The complete guide to NFID"
category: How It Works
---

<div class="-mt-4"><p class="text-gray-600 dark:text-gray-400">Find more at the source <a href="https://internetcomputer.org/docs/current/references/ii-spec">IC reference</a>.

## Introduction

NFID is a set of smart contracts on the Internet Computer where users create identities and store
GBs of tamper-resistent, encrypted data. The current phase of development is to make self-sovereign
private key management feel like a web2 experience. NFID achieves this with the Internet Computer's
smart contracts and cryptographic primitives, which allow the generation of powerful, self-sovereign
`delegation identities` that can make authenticated smart contract calls without user approval
prompts, and encrypt/decrypt its own data.

## Goals, requirements, and use cases

### The NFID protocol currently allows users to

- Manage private keys and their assets across a variety of
  [supported networks](../#currently-supported-chains)
- Sign in using an email address or one out of a set of passkeys (when 2FA is enabled)
- Authenticate to client (3rd party) applications

### Functional requirements

- Users have one identifier for each supported network, with the option to extend with app and
  stealth addresses
- These identities are stable (i.e. do not depend on the email or passkey from which the user
  authenticated)
- Users do not need to remember secret information
- Clients can use the user's identity (`client delegation`) to interact with their own smart
  contracts (canisters), look up balances, and are otherwise enforced to request user approval
  ([see SDK](../integration/icp))
- Each `client delegation` has a session duration during which it can make authenticated calls
- Non-ICP clients (i.e. EVM dapps) can use the user's identity (`provider`) to look up balances and
  request signatures ([see SDK](../integration/evm))

### Security requirements

- Email addresses are private to users, never to be exposed without user consent
- `Client delegations` handed out to client applications by NFID must be targeted with the frontend
  application's canisters only
- Private keys can not be reconstructed without user authentication
- Users can not authenticate without a passkey if 2FA is enabled, and otherwise without a Google
  token or opening a magic link

### Security assumptions

- The delivery of frontend applications is secure. In particular, a user accessing NFID through a
  TLS-secured HTTP connection cannot be tricked into running another web application.
- Passkeys are trustworthy
- The user's browser is trustworthy

## The NFID identity (NFIDentity)

- A user account is identified by a unique NFIDentity, a natural number chosen by the smart
  contract.
- A user has one address for each network (same across EVM).
- When a user authenticates to non-ICP network applications, the returned identity is a `provider`.
- When a user authenticates to ICP network applications, the returned identity is a
  [self-authenticating id](https://internetcomputer.org/docs/current/references/ic-interface-spec#id-classes)
  of the
  [DER encoded canister signature public key](https://internetcomputer.org/docs/current/references/ic-interface-spec/#canister-signatures)
  which has the form:
  ```
  user_id = SHA-224(DER encoded public key) · 0x02` (29 bytes)
  ```
  > _More on [public key encoding and signatures](./signatures)_

The NFID Identity Manager smart contract stores the following data in user accounts, indexed by the
respective NFIDentity:

- A set of _device information_, consisting of
  - the device's public key (DER-encoded)
  - a device alias, matched by aaguid and editable by the user, to recognize the device
  - an optional credential id, which is necessary for WebAuthn authentication

## NFID user flow with your application

Users authenticate using email (or FIDO-based device biometrics for returning users with 2FA
enabled).

1. User initiates login on your site.
2. User authenticates to their NFID and provides a network address (or delegation identity in the
   case of ICP)
3. When your application requests a signature, the NFID iframe reappears for user approval.

<img src="../nfid-embed-flow.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

## The node network

As of May 2023, the base protocol consists of
[549 (live) nodes](https://dashboard.internetcomputer.org/nodes) run by
[75 (live) node providers](https://dashboard.internetcomputer.org/providers) across
[44 (live) geographically distributed data centers](https://dashboard.internetcomputer.org/centers).
