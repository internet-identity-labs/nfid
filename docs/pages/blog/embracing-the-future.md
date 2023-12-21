---
title: "Embracing the Future: How ICP Wallet Standards are Revolutionizing Web3 Applications"
date: "2023-12-12"
authors:
  - name: "Dan Ostrovski"
  - name: "Philipp Litzenberger"
---

# Streamlining Development: Embracing ICP Wallet Standards in Web3

The Internet Computer Protocol (ICP) has emerged as a pivotal force in the realm of decentralized
applications, with its rapid evolution and diverse applications ranging from Bitcoin marketplaces to
music streaming platforms. This dynamic growth has reshaped the way we interact with decentralized
systems, significantly reducing reliance on centralized infrastructures and leveraging the inherent
security of the protocol itself. However, the journey is not without its challenges.

## Why ICP Wallet Standards are Important

### Empowering User Choice in Web3

In the ever-evolving landscape of Web3, one principle stands paramount: user choice. This ethos not
only advocates for freedom in wallet selection but also demands flexibility in interaction with
various applications. The current state of ICP application development, however, presents a
significant hurdle. The need for individual wallet integrations consumes vast amounts of time and
resources, diverting attention from enhancing application functionality. Recognizing this, DFINITY
and the NFID Wallet team are spearheading an initiative to standardize cryptographic flows, thereby
broadening user choices and smoothing the developer experience.

### Streamlining the Development Process

By introducing standard wallet protocols, developers can bypass the cumbersome process of individual
wallet integrations. This standardization not only accelerates the development cycle but also opens
the door for a wider range of wallet options for users. The outcome is a more robust and
user-friendly ecosystem, where developers can focus on innovation rather than integration.

## How ICP Wallet Standards Will Be Used

### Enhancing User Experience with Seamless Integration

Post-implementation of these standards, the most noticeable change for users will be the increased
compatibility between applications and a variety of wallets. This means users can manage assets more
efficiently and engage with applications in more dynamic ways. Features like secure data sharing
across applications without compromising privacy will become a norm.

### NFID's Role in Facilitating Adoption

The NFID team is poised to release the IdentityKit package, an open-source tool designed to simplify
the integration of these new standards. This package will enable developers to effortlessly
incorporate a broad spectrum of functionalities, paving the way for a more interconnected and
efficient application environment.

## Exploring the Different ICP Wallet Standards

### ICRC-25 Base Signer Interaction Standard

This standard outlines a foundational protocol for communication between decentralized apps (dapps)
and signers. It specifies a set of messages to facilitate this interaction, ensuring a seamless and
secure exchange of information. The ICRC-25 aims to create a uniform language for dapps and signers,
enhancing interoperability and simplifying the development process.

#### Establish a Signer Connection:

We invite the community to contribute adapters for other signers to `@nfid/identity-kit`. But
obviously, you can also use custom adapters from your own or other external packages.

```typescript
import * as IdentityKit from "@nfid/identity-kit"

// adapter contributed to this open source package
import { NFID, II } from "@nfid/identity-kit/adapter"

// bring your own adapter
import { CUSTOM } from "@your-package/icrc-25-compatible-signer"

// NFID Signer
const nfid = NFID.config({
  providerUrl: "https://nfid.one",
})

// Internet Identity Signer
const ii = II.config({
  providerUrl: "https://identity.ic0.app",
})

// You're free to build your custom signer by complying to the specs.
const custom = CUSTOM.config({
  providerUrl: "https://your.signer.app",
})

IdentityKit.config({
  derivationOrigin: "https://<canisterId>.ic0.app",
  appMeta: {
    name: "My App",
    logo: "https://domain.com/path/to/logo.png",
  },
})

// Establish a connection with the Signer the user has selected:
const connection = await IdentityKit.connect({
  signer: custom,
})
```

#### Exploring available standards on a given signer:

```typescript
type Response = string[]

const supported: SupportedStandards = await connection.supportedStandards()
// ["ICRC-31", "ICRC-32"]
```

### ICRC-31 Get Principals

The `icrc31_get_principals` message plays a crucial role in identity management. It allows
applications to retrieve information about the identities managed by a signer, streamlining the
authentication process. This standard is pivotal in ensuring that users can manage their digital
identities efficiently and securely.

```typescript
type Response = {
  version: string // "1"
  principals: string[] // ["gyu2j-2ni7o-o6yjt-n7lyh-x3sxq-zh7hp-sjvqe-t7oul-4eehb-2gvtt-Jae"]
}

const response: Response = await connection.getPrincipals()
```

### ICRC-32 Sign Challenge

The `icrc32_sign_challenge` method provides a secure mechanism for verifying ownership of user
identities. By facilitating cryptographic proofs, this standard strengthens the security framework
of applications, ensuring that user identities are protected and authenticated reliably.

```typescript
type Response = {
  version: string // "1"
  principals: string[] // ["gyu2j-2ni7o-o6yjt-n7lyh-x3sxq-zh7hp-sjvqe-t7oul-4eehb-2gvtt-Jae"]
}

const response: Response = await connection.getPrincipals()
```

### ICRC-33 Call Canister

This standard allows applications to request the execution of calls to third-party canisters by the
signer. By using the `icrc33_call_canister` method, applications can interact with a broader range
of services and functionalities, enhancing the versatility and reach of ICP-based applications.

```typescript
type Response = {
  version: string
  signedChallenge: {
    publicKey: string
    signature: string
  }
}
const response: Response = await connection.signChallange({
  challenge: "UjwgsORvEzp98TmB1cAIseNOoD9+GLyN/1DzJ5+jxZM=",
})
```

### ICRC-34 Get Delegation

The `icrc34_get_delegation` method is designed to facilitate the delegation of identity management.
This process allows users to securely manage their identities and permissions, providing a flexible
and secure framework for identity delegation within the ICP ecosystem.

```typescript
const response = await connection.getDelegation({...})
```

## Conclusion

In conclusion, the introduction of ICP wallet standards is a significant stride towards a more
unified and user-friendly Web3 environment. These standards not only alleviate the developmental
challenges but also enrich the user experience, paving the way for a more interconnected and secure
digital future.
