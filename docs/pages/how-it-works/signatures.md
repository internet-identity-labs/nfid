---
title: Signatures
position: 42
category: How It Works
description: "The complete guide to NFID"
---

<div class="-mt-4"><p class="text-gray-600 dark:text-gray-400">Find more at the source <a href="https://internetcomputer.org/docs/current/references/ic-interface-spec/#signatures">IC reference</a>.

## Introduction

Digital signature schemes are used for authenticating messages in various parts of the IC
infrastructure. Signatures are domain separated, which means that every message is prefixed with a
byte string that is unique to the purpose of the signature.

The IC supports multiple signature schemes, with details given in the following subsections. For
each scheme, we specify the data encoded in the public key (which is always DER-encoded, and
indicates the scheme to use) as well as the form of the signatures (which are opaque blobs for the
purposes of the rest of this specification).

In all cases, the signed payload is the concatenation of the domain separator and the message. All
uses of signatures in this specification indicate a domain separator, to uniquely identify the
purpose of the signature. The domain separators are prefix-free by construction, as their first byte
indicates their length.

### Ed25519 and ECDSA signatures

- Plain signatures are supported for the schemes [Ed25519](https://ed25519.cr.yp.to/index.html) or
  [ECDSA](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-4.pdf) on curve P-256 (also known as
  `secp256r1`), using SHA-256 as hash function, as well as on the Koblitz curve `secp256k1`.
- Public keys must be valid for signature schemes Ed25519 or ECDSA and are encoded as DER.
  - See [RFC 8410](https://tools.ietf.org/html/rfc8410) for DER encoding of Ed25519 public keys.
  - See [RFC 5480](https://tools.ietf.org/rfc/rfc5480) for DER encoding of ECDSA public keys; the
    DER encoding must not specify a hash function. For curve `secp256k1`, the OID 1.3.132.0.10 is
    used. The points must be specified in uncompressed form (i.e. `0x04` followed by the big-endian
    32-byte encodings of `x` and `y`).
- The signatures are encoded as the concatenation of the 32-byte big endian encodings of the two
  values _r_ and _s_.

### Web Authentication

The allowed signature schemes for web authentication are

- [ECDSA](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-4.pdf) on curve P-256 (also known as
  `secp256r1`), using SHA-256 as hash function.
- [RSA PKCS#1v1.5 (RSASSA-PKCS1-v1_5)](https://datatracker.ietf.org/doc/html/rfc8017#section-8.2),
  using SHA-256 as hash function.

The signature is calculated by using the payload as the challenge in the web authentication
assertion.

The signature is checked by verifying that the `challenge` field contains the
[base64url](https://tools.ietf.org/html/rfc4648#section-5) encoding of the payload, and that
`signature` verifies on `authenticatorData · SHA-256(utf8(clientDataJSON))`, as specified in the
[WebAuthn w3c recommendation](https://www.w3.org/TR/webauthn/#op-get-assertion).

The public key is encoded as a DER-wrapped COSE key.

It uses the `SubjectPublicKeyInfo` type used for other types of public keys (see, e.g.,
[RFC 8410, Section 4](https://tools.ietf.org/html/rfc8410#section-4)), with OID
1.3.6.1.4.1.56387.1.1 (iso.org.dod.internet.private.enterprise.dfinity.mechanisms.der-wrapped-cose).
The `BIT STRING` field `subjectPublicKey` contains the COSE encoding. See
[WebAuthn w3c recommendation](https://www.w3.org/TR/webauthn/#sctn-encoded-credPubKey-examples) or
[RFC 8152](https://tools.ietf.org/html/rfc8152#section-13.1) for details on the COSE encoding.

The signature is a
[CBOR](https://internetcomputer.org/docs/current/references/ic-interface-spec#cbor) value consisting
of a data item with major type 6 ("Semantic tag") and tag value `55799`, followed by a map with
three mandatory fields:

- `authenticator_data` (`blob`): WebAuthn authenticator data.
- `client_data_json` (`text`): WebAuthn client data in JSON representation.
- `signature` (`blob`): Signature as specified in the
  [WebAuthn w3c recommendation](https://www.w3.org/TR/webauthn/#signature-attestation-types), which
  means DER encoding in the case of an ECDSA signature.

## Canister signatures

The IC also supports a scheme where a canister can sign a payload by declaring a special "certified
variable".

This section makes forward references to other concepts in this document, in particular the section
[Certification](https://internetcomputer.org/docs/current/references/ic-interface-spec#certification).

- The public key is a DER-wrapped structure that indicates the `signing canister`, and includes a
  freely choosable seed. Each choice of seed yields a distinct public key for the canister, and the
  canister can choose to encode information, such as a user id, in the seed. More concretely, it
  uses the `SubjectPublicKeyInfo` type used for other types of public keys (see, e.g.,
  [RFC 8410, Section 4](https://tools.ietf.org/html/rfc8410#section-4)), with OID
  1.3.6.1.4.1.56387.1.2
  (iso.org.dod.internet.private.enterprise.dfinity.mechanisms.canister-signature). The `BIT STRING`
  field `subjectPublicKey` is the blob `|signing_canister_id| · signing_canister_id · seed`, where
  `|signing_canister_id|` is the one-byte encoding of the the length of the `signing_canister_id`
  and `·` denotes blob concatenation.
- The signature is a
  [CBOR](https://internetcomputer.org/docs/current/references/ic-interface-spec#cbor) value
  consisting of a data item with major type 6 ("Semantic tag") and tag value `55799`, followed by a
  map with two mandatory fields:
  - `certificate` (`blob`): A CBOR-encoded certificate as per
    [Encoding of certificates](https://internetcomputer.org/docs/current/references/ic-interface-spec#certification-encoding).
  - `tree` (`hash-tree`): A hash tree as per
    [Encoding of certificates](https://internetcomputer.org/docs/current/references/ic-interface-spec#certification-encoding).
- Given a payload together with public key and signature in the format described above the signature
  can be verified by checking the following two conditions:
  - The `certificate` must be a valid certificate as described in
    [Certification](https://internetcomputer.org/docs/current/references/ic-interface-spec#certification),
    with
    ```
    lookup(/canister/<signing_canister_id>/certified_data, certificate.tree) = Found (reconstruct(tree))
    ```
    where `signing_canister_id` is the id of the signing canister and `reconstruct` is a function
    that computes a root-hash for the tree.
    - If the `certificate` includes subnet delegations (possibly nested), then the
      `signing_canister_id` must be included in each delegation's canister id range (see
      [Delegation](https://internetcomputer.org/docs/current/references/ic-interface-spec#certification-delegation)).
  - The tree must be a well_formed tree with
    ```
    lookup(/sig/<s>/<m>, tree) = Found ""
    ```
    where `s` is the SHA-256 hash of the `seed` used in the public key and `m` is the SHA-256 hash
    of the payload.
