---
title: Overview
position: 60
category: NFID Vaults
description: "The complete guide to NFID"
---

<img src="../vaults.png" style="width:100%;margin:auto;padding-bottom:20px;"></img>

## Introduction

Vaults are a separate Internet Computer smart contract canister to easily create and manage DAOs.
The current phase of development is to make DAO management feel like a web2 experience.

## Goals, requirements, and use cases

### The NFID Vault currently allows users to

- Create a DAO that manages a treasury of ICP tokens.
- Invite members to vote on DAO proposals.
- Create policies by which proposals should execute.
- Execute proposals when policy conditions are met.

### Functional requirements

- Treasury assets and smart contract calls must be protected from cyber attacks, internal collusion,
  and human error
- Users can intuitively manage all aspects of the DAO on their own.
- Members are whitelisted addresses, and will be extended to support other vote-weighting methods in
  the future.
- Proposals can be rejected by any single member, and will be extended in the future.

### Security requirements

- User can not cast a vote without a valid `NFID delegation` (see
  [here](../how-it-works/auth-protocol#nfid-delegation)).
- Votes are not accepted without a valid `caller` whose `principal identifier` is a valid member.

### Security assumptions

- The delivery of frontend applications is secure. In particular, a user accessing NFID through a
  TLS-secured HTTP connection cannot be tricked into running another web application.
- Passkeys are trustworthy
- The user's browser is trustworthy

## The Vault contract

- A `Vault` is identified by a unique Vault ID, a natural number chosen by the smart contract.
- An `Account` is identified by a subaccount of the smart contract canister's principal identifier.
- A `Member` is identified by a unique principal identifier, the user's global identifier on the ICP
  network.
- A `Proposal` is a transaction that waits for approval before execution.
- A `Policy` contains the conditions that must be met for proposals to execute.
- Every `Proposal` will execute when conditions from exactly one matched `Policy` are met.
- When a `Proposal` is submitted, its matched `Policy` conditions are statically applied. For
  example, a proposal submitted when the Vault has 3 members and that requires 2 approvers will only
  accept votes from the first 3 members even when a fourth member was added.

Explore more of the flows:

- [Create a Vault](/vaults/create)
- [Invite members](/vaults/members)
- [Create an account](/vaults/accounts)
- [Manage policies](/vaults/policies)
- [View and approve proposals](/vaults/transactions)
