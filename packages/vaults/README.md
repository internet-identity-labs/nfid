# NFID Vault Manager

This library is designed to manage volt canisters. 

## Usage

The main interface is VoltManager, which offers a set of methods for communication with the canister. 
To create a VoltManager object, you need to pass the canister identifier and identity.

You can find descriptions of each type of possible transaction in the class files.

### Example

How to create transactions:

```typescript
const vm = new VaultManager(activeVaultCanisterId, adminIdentity)
const quorumTransactionRequest = new QuorumTransactionRequest(
  newApprovalThreshold,
)
const txs = await vm.requestTransaction([quorumTransactionRequest])
```

How to approve transactions:

```typescript
const approveRequest: ApproveRequest[] = [
      { trId: this.transaction.id, state: TransactionState.Approved },
    ]
const vm = new VaultManager(activeVaultCanisterId, memberIdentity)
const txs =  this.vm.approveTransaction(approves)
``` 

