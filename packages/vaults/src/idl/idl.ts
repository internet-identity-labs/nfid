export const idlFactory = ({ IDL } : any) => {
    const Conf = IDL.Record({
        'origins' : IDL.Vec(IDL.Text),
        'repo_canister' : IDL.Text,
    });
    const TransactionState = IDL.Variant({
        'Blocked' : IDL.Null,
        'Failed' : IDL.Null,
        'Approved' : IDL.Null,
        'Rejected' : IDL.Null,
        'Executed' : IDL.Null,
        'Purged' : IDL.Null,
        'Pending' : IDL.Null,
    });
    const TransactionApproveRequest = IDL.Record({
        'transaction_id' : IDL.Nat64,
        'state' : TransactionState,
    });
    const VaultError = IDL.Variant({
        'ControllersUpdateError' : IDL.Record({ 'message' : IDL.Text }),
        'WalletNotExists' : IDL.Null,
        'CouldNotDefinePolicy' : IDL.Null,
        'ThresholdAlreadyExists' : IDL.Null,
        'QuorumNotReachable' : IDL.Null,
        'CanisterReject' : IDL.Record({ 'message' : IDL.Text }),
        'MemberNotExists' : IDL.Null,
        'MemberAlreadyExists' : IDL.Null,
        'ThresholdDefineError' : IDL.Record({ 'message' : IDL.Text }),
        'UIDAlreadyExists' : IDL.Null,
        'PolicyNotExists' : IDL.Null,
    });
    const Approve = IDL.Record({
        'status' : TransactionState,
        'signer' : IDL.Text,
        'created_date' : IDL.Nat64,
    });
    const BasicTransactionFields = IDL.Record({
        'id' : IDL.Nat64,
        'threshold' : IDL.Opt(IDL.Nat8),
        'initiator' : IDL.Text,
        'modified_date' : IDL.Nat64,
        'memo' : IDL.Opt(IDL.Text),
        'error' : IDL.Opt(VaultError),
        'state' : TransactionState,
        'approves' : IDL.Vec(Approve),
        'is_vault_state' : IDL.Bool,
        'created_date' : IDL.Nat64,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const ControllersUpdateTransaction = IDL.Record({
        'principals' : IDL.Vec(IDL.Principal),
        'common' : BasicTransactionFields,
        'current_controllers' : IDL.Vec(IDL.Principal),
    });
    const Network = IDL.Variant({
        'IC' : IDL.Null,
        'BTC' : IDL.Null,
        'ETH' : IDL.Null,
    });
    const WalletCreateTransaction = IDL.Record({
        'uid' : IDL.Text,
        'name' : IDL.Text,
        'network' : Network,
        'common' : BasicTransactionFields,
    });
    const Currency = IDL.Variant({ 'ICP' : IDL.Null });
    const PolicyCreateTransaction = IDL.Record({
        'uid' : IDL.Text,
        'member_threshold' : IDL.Nat8,
        'amount_threshold' : IDL.Nat64,
        'wallets' : IDL.Vec(IDL.Text),
        'currency' : Currency,
        'common' : BasicTransactionFields,
    });
    const VaultRole = IDL.Variant({ 'Member' : IDL.Null, 'Admin' : IDL.Null });
    const MemberUpdateRoleTransaction = IDL.Record({
        'role' : VaultRole,
        'member_id' : IDL.Text,
        'common' : BasicTransactionFields,
    });
    const ICRC1CanistersRemoveTransaction = IDL.Record({
        'ledger_canister' : IDL.Principal,
        'common' : BasicTransactionFields,
    });
    const TopUpTransaction = IDL.Record({
        'block_index' : IDL.Opt(IDL.Nat64),
        'currency' : Currency,
        'wallet' : IDL.Text,
        'common' : BasicTransactionFields,
        'amount' : IDL.Nat64,
        'policy' : IDL.Opt(IDL.Text),
    });
    const TopUpQuorumTransaction = IDL.Record({
        'block_index' : IDL.Opt(IDL.Nat64),
        'currency' : Currency,
        'wallet' : IDL.Text,
        'common' : BasicTransactionFields,
        'amount' : IDL.Nat64,
    });
    const ICRC1CanistersAddTransaction = IDL.Record({
        'index_canister' : IDL.Opt(IDL.Principal),
        'ledger_canister' : IDL.Principal,
        'common' : BasicTransactionFields,
    });
    const VaultNamingUpdateTransaction = IDL.Record({
        'name' : IDL.Opt(IDL.Text),
        'description' : IDL.Opt(IDL.Text),
        'common' : BasicTransactionFields,
    });
    const TransferTransaction = IDL.Record({
        'block_index' : IDL.Opt(IDL.Nat64),
        'currency' : Currency,
        'address' : IDL.Text,
        'wallet' : IDL.Text,
        'common' : BasicTransactionFields,
        'amount' : IDL.Nat64,
        'policy' : IDL.Opt(IDL.Text),
    });
    const PolicyRemoveTransaction = IDL.Record({
        'uid' : IDL.Text,
        'common' : BasicTransactionFields,
    });
    const Account = IDL.Record({
        'owner' : IDL.Principal,
        'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const MemberExtendICRC1AccountTransaction = IDL.Record({
        'account' : Account,
        'common' : BasicTransactionFields,
    });
    const PolicyUpdateTransaction = IDL.Record({
        'uid' : IDL.Text,
        'member_threshold' : IDL.Nat8,
        'amount_threshold' : IDL.Nat64,
        'common' : BasicTransactionFields,
    });
    const TransferICRC1QuorumTransaction = IDL.Record({
        'to_principal' : IDL.Principal,
        'block_index' : IDL.Opt(IDL.Nat),
        'to_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
        'ledger_id' : IDL.Principal,
        'wallet' : IDL.Text,
        'common' : BasicTransactionFields,
        'amount' : IDL.Nat64,
    });
    const MemberCreateTransaction = IDL.Record({
        'name' : IDL.Text,
        'role' : VaultRole,
        'member_id' : IDL.Text,
        'common' : BasicTransactionFields,
    });
    const MemberUpdateNameTransaction = IDL.Record({
        'name' : IDL.Text,
        'member_id' : IDL.Text,
        'common' : BasicTransactionFields,
    });
    const VersionUpgradeTransaction = IDL.Record({
        'version' : IDL.Text,
        'initial_version' : IDL.Text,
        'common' : BasicTransactionFields,
    });
    const PurgeTransaction = IDL.Record({ 'common' : BasicTransactionFields });
    const TransferQuorumTransaction = IDL.Record({
        'block_index' : IDL.Opt(IDL.Nat64),
        'currency' : Currency,
        'address' : IDL.Text,
        'wallet' : IDL.Text,
        'common' : BasicTransactionFields,
        'amount' : IDL.Nat64,
    });
    const QuorumUpdateTransaction = IDL.Record({
        'common' : BasicTransactionFields,
        'quorum' : IDL.Nat8,
    });
    const MemberCreateTransactionV2 = IDL.Record({
        'name' : IDL.Text,
        'role' : VaultRole,
        'account' : Account,
        'common' : BasicTransactionFields,
    });
    const WalletUpdateNameTransaction = IDL.Record({
        'uid' : IDL.Text,
        'name' : IDL.Text,
        'common' : BasicTransactionFields,
    });
    const MemberRemoveTransaction = IDL.Record({
        'member_id' : IDL.Text,
        'common' : BasicTransactionFields,
    });
    const TransactionCandid = IDL.Variant({
        'ControllersUpdateTransactionV' : ControllersUpdateTransaction,
        'WalletCreateTransactionV' : WalletCreateTransaction,
        'PolicyCreateTransactionV' : PolicyCreateTransaction,
        'MemberUpdateRoleTransactionV' : MemberUpdateRoleTransaction,
        'ICRC1CanistersRemoveTransactionV' : ICRC1CanistersRemoveTransaction,
        'TopUpTransactionV' : TopUpTransaction,
        'TopUpQuorumTransactionV' : TopUpQuorumTransaction,
        'ICRC1CanistersAddTransactionV' : ICRC1CanistersAddTransaction,
        'VaultNamingUpdateTransactionV' : VaultNamingUpdateTransaction,
        'TransferTransactionV' : TransferTransaction,
        'PolicyRemoveTransactionV' : PolicyRemoveTransaction,
        'MemberExtendICRC1AccountTransactionV' : MemberExtendICRC1AccountTransaction,
        'PolicyUpdateTransactionV' : PolicyUpdateTransaction,
        'TransferICRC1QuorumTransactionV' : TransferICRC1QuorumTransaction,
        'MemberCreateTransactionV' : MemberCreateTransaction,
        'MemberUpdateNameTransactionV' : MemberUpdateNameTransaction,
        'UpgradeTransactionV' : VersionUpgradeTransaction,
        'PurgeTransactionV' : PurgeTransaction,
        'TransferQuorumTransactionV' : TransferQuorumTransaction,
        'QuorumUpdateTransactionV' : QuorumUpdateTransaction,
        'MemberCreateTransactionV2' : MemberCreateTransactionV2,
        'WalletUpdateNameTransactionV' : WalletUpdateNameTransaction,
        'MemberRemoveTransactionV' : MemberRemoveTransaction,
    });
    const Member = IDL.Record({
        'modified_date' : IDL.Nat64,
        'name' : IDL.Text,
        'role' : VaultRole,
        'account' : IDL.Opt(Account),
        'member_id' : IDL.Text,
        'created_date' : IDL.Nat64,
    });
    const ICRC1 = IDL.Record({
        'ledger' : IDL.Principal,
        'index' : IDL.Opt(IDL.Principal),
    });
    const Wallet = IDL.Record({
        'uid' : IDL.Text,
        'modified_date' : IDL.Nat64,
        'name' : IDL.Text,
        'network' : Network,
        'created_date' : IDL.Nat64,
    });
    const Quorum = IDL.Record({
        'modified_date' : IDL.Nat64,
        'quorum' : IDL.Nat8,
    });
    const Policy = IDL.Record({
        'uid' : IDL.Text,
        'member_threshold' : IDL.Nat8,
        'modified_date' : IDL.Nat64,
        'amount_threshold' : IDL.Nat64,
        'wallets' : IDL.Vec(IDL.Text),
        'currency' : Currency,
        'created_date' : IDL.Nat64,
    });
    const VaultState = IDL.Record({
        'members' : IDL.Vec(Member),
        'name' : IDL.Opt(IDL.Text),
        'description' : IDL.Opt(IDL.Text),
        'icrc1_canisters' : IDL.Vec(ICRC1),
        'wallets' : IDL.Vec(Wallet),
        'quorum' : Quorum,
        'policies' : IDL.Vec(Policy),
    });
    const ICRC1CanistersRemoveTransactionRequest = IDL.Record({
        'ledger_canister' : IDL.Principal,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const QuorumUpdateTransactionRequest = IDL.Record({
        'quorum' : IDL.Nat8,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const VaultNamingUpdateTransactionRequest = IDL.Record({
        'name' : IDL.Opt(IDL.Text),
        'description' : IDL.Opt(IDL.Text),
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const ICRC1CanistersAddTransactionRequest = IDL.Record({
        'index_canister' : IDL.Opt(IDL.Principal),
        'ledger_canister' : IDL.Principal,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const ControllersUpdateTransactionRequest = IDL.Record({
        'principals' : IDL.Vec(IDL.Principal),
    });
    const MemberUpdateNameTransactionRequest = IDL.Record({
        'name' : IDL.Text,
        'member_id' : IDL.Text,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const TopUpTransactionRequest = IDL.Record({
        'currency' : Currency,
        'wallet' : IDL.Text,
        'amount' : IDL.Nat64,
    });
    const TransferICRC1QuorumTransactionRequest = IDL.Record({
        'to_principal' : IDL.Principal,
        'to_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
        'memo' : IDL.Opt(IDL.Text),
        'ledger_id' : IDL.Principal,
        'wallet' : IDL.Text,
        'amount' : IDL.Nat64,
    });
    const WalletCreateTransactionRequest = IDL.Record({
        'uid' : IDL.Text,
        'name' : IDL.Text,
        'network' : Network,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const MemberRemoveTransactionRequest = IDL.Record({
        'member_id' : IDL.Text,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const MemberCreateTransactionRequest = IDL.Record({
        'name' : IDL.Text,
        'role' : VaultRole,
        'member_id' : IDL.Text,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const TransferTransactionRequest = IDL.Record({
        'memo' : IDL.Opt(IDL.Text),
        'currency' : Currency,
        'address' : IDL.Text,
        'wallet' : IDL.Text,
        'amount' : IDL.Nat64,
    });
    const MemberCreateTransactionRequestV2 = IDL.Record({
        'name' : IDL.Text,
        'role' : VaultRole,
        'account' : Account,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const MemberUpdateRoleTransactionRequest = IDL.Record({
        'role' : VaultRole,
        'member_id' : IDL.Text,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const WalletUpdateNameTransactionRequest = IDL.Record({
        'uid' : IDL.Text,
        'name' : IDL.Text,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const PolicyUpdateTransactionRequest = IDL.Record({
        'uid' : IDL.Text,
        'member_threshold' : IDL.Nat8,
        'amount_threshold' : IDL.Nat64,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const VersionUpgradeTransactionRequest = IDL.Record({ 'version' : IDL.Text });
    const MemberExtendICRC1AccountRequest = IDL.Record({
        'account' : Account,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const PolicyRemoveTransactionRequest = IDL.Record({
        'uid' : IDL.Text,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const PolicyCreateTransactionRequest = IDL.Record({
        'uid' : IDL.Text,
        'member_threshold' : IDL.Nat8,
        'amount_threshold' : IDL.Nat64,
        'wallets' : IDL.Vec(IDL.Text),
        'currency' : Currency,
        'batch_uid' : IDL.Opt(IDL.Text),
    });
    const TransactionRequest = IDL.Variant({
        'ICRC1CanistersRemoveTransactionRequestV' : ICRC1CanistersRemoveTransactionRequest,
        'QuorumUpdateTransactionRequestV' : QuorumUpdateTransactionRequest,
        'VaultNamingUpdateTransactionRequestV' : VaultNamingUpdateTransactionRequest,
        'PurgeTransactionRequestV' : IDL.Record({}),
        'ICRC1CanistersAddTransactionRequestV' : ICRC1CanistersAddTransactionRequest,
        'ControllersUpdateTransactionRequestV' : ControllersUpdateTransactionRequest,
        'MemberUpdateNameTransactionRequestV' : MemberUpdateNameTransactionRequest,
        'TopUpTransactionRequestV' : TopUpTransactionRequest,
        'TransferICRC1QuorumTransactionRequestV' : TransferICRC1QuorumTransactionRequest,
        'WalletCreateTransactionRequestV' : WalletCreateTransactionRequest,
        'MemberRemoveTransactionRequestV' : MemberRemoveTransactionRequest,
        'MemberCreateTransactionRequestV' : MemberCreateTransactionRequest,
        'TransferQuorumTransactionRequestV' : TransferTransactionRequest,
        'MemberCreateTransactionRequestV2' : MemberCreateTransactionRequestV2,
        'TransferTransactionRequestV' : TransferTransactionRequest,
        'MemberUpdateRoleTransactionRequestV' : MemberUpdateRoleTransactionRequest,
        'WalletUpdateNameTransactionRequestV' : WalletUpdateNameTransactionRequest,
        'PolicyUpdateTransactionRequestV' : PolicyUpdateTransactionRequest,
        'VersionUpgradeTransactionRequestV' : VersionUpgradeTransactionRequest,
        'TopUpQuorumTransactionRequestV' : TopUpTransactionRequest,
        'MemberExtendICRC1AccountRequestV' : MemberExtendICRC1AccountRequest,
        'PolicyRemoveTransactionRequestV' : PolicyRemoveTransactionRequest,
        'PolicyCreateTransactionRequestV' : PolicyCreateTransactionRequest,
    });
    return IDL.Service({
        'approve' : IDL.Func(
            [IDL.Vec(TransactionApproveRequest)],
            [IDL.Vec(TransactionCandid)],
            [],
        ),
        'canister_balance' : IDL.Func([], [IDL.Nat64], ['query']),
        'execute' : IDL.Func([], [], []),
        'get_controllers' : IDL.Func([], [IDL.Vec(IDL.Principal)], []),
        'get_state' : IDL.Func([IDL.Opt(IDL.Nat64)], [VaultState], ['query']),
        'get_transactions_all' : IDL.Func(
            [],
            [IDL.Vec(TransactionCandid)],
            ['query'],
        ),
        'get_trusted_origins_certified' : IDL.Func(
            [],
            [
                IDL.Record({
                    'certificate' : IDL.Vec(IDL.Nat8),
                    'witness' : IDL.Vec(IDL.Nat8),
                    'response' : IDL.Vec(IDL.Text),
                }),
            ],
            ['query'],
        ),
        'get_version' : IDL.Func([], [IDL.Text], ['query']),
        'request_transaction' : IDL.Func(
            [IDL.Vec(TransactionRequest)],
            [IDL.Vec(TransactionCandid)],
            [],
        ),
    });
};
