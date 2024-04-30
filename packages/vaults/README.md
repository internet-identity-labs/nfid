# NFID Vault Manager

This library is designed to manage vault canisters. 

## Usage

The main interface is VaultManager, which offers a set of methods for communication with the canister. 
To create a VaultManager object, you need to pass the canister identifier and identity.

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

### Keeping the Vault Canister Topped Up with Cycles

There are two methods to ensure your vault canister is always topped up with cycles:

1. **Using Cycleops**: Cycleops is a proactive, automated, no-code canister management tool for the Internet Computer. You can learn more about it and how to use it [here](https://forum.dfinity.org/t/meet-cycleops-proactive-automated-no-code-canister-management-for-the-internet-computer/20969). To use Cycleops with your vault canister, you need to add the Cycleops canister through a "ControllersUpdateTransaction". And them follow the instructions provided in the link.

2. **Manual Top Up**: Alternatively, you can manually top up the canister by sending cycles to the canister address.
