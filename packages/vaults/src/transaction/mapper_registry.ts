import {Transaction} from "./transaction";
import {MemberCreateTransactionMapper} from "./member/member_create";
import {TransactionMapper} from "./transaction_mapper";
import {MemberUpdateNameTransactionMapper} from "./member/member_update_name";
import {TransactionCandid} from "../idl/service_vault";
import {hasOwnProperty} from "../util/helper";
import {MemberUpdateRoleTransactionMapper} from "./member/member_update_role";
import {MemberRemoveTransactionMapper} from "./member/member_remove";
import {QuorumUpdateTransactionMapper} from "./config/quorum_update";
import {VaultUpdateNamingTransactionMapper} from "./config/vault_naming";
import {VersionUpgradeTransactionMapper} from "./config/version_upgrade";
import {PurgeTransactionMapper} from "./config/purge";
import {WalletCreateTransactionMapper} from "./wallet/wallet_create";
import {PolicyCreateTransactionMapper} from "./policy/policy_create";
import {PolicyUpdateTransactionMapper} from "./policy/policy_update";
import {PolicyRemoveTransactionMapper} from "./policy/policy_remove";
import {TransferTransactionMapper} from "./transfer/transfer";
import {TopUpTransactionMapper} from "./transfer/top_up";
import {TransferQuorumTransactionMapper} from "./transfer/transfer_quorum";
import {ControllersUpdateTransactionMapper} from "./config/controllers_update";
import {WalletUpdateNameTransactionMapper} from "./wallet/wallet_update_name";

export const TransactionMapperRegistry: Map<PropertyKey, TransactionMapper> = new Map();

type TransactionMapperConstructor<T extends Transaction> = new () => TransactionMapper;

function RegisterTransactionMapper<T extends Transaction>(
    target: TransactionMapperConstructor<T>
) {
    let instance = new target();
    TransactionMapperRegistry.set(instance.getVariant(), instance);
}

export function registerMappers() {
    RegisterTransactionMapper(MemberCreateTransactionMapper);
    RegisterTransactionMapper(MemberUpdateNameTransactionMapper);
    RegisterTransactionMapper(MemberUpdateRoleTransactionMapper);
    RegisterTransactionMapper(MemberRemoveTransactionMapper);
    RegisterTransactionMapper(QuorumUpdateTransactionMapper);
    RegisterTransactionMapper(VaultUpdateNamingTransactionMapper);
    RegisterTransactionMapper(VersionUpgradeTransactionMapper);
    RegisterTransactionMapper(PurgeTransactionMapper);
    RegisterTransactionMapper(WalletCreateTransactionMapper);
    RegisterTransactionMapper(WalletUpdateNameTransactionMapper);
    RegisterTransactionMapper(PolicyCreateTransactionMapper);
    RegisterTransactionMapper(PolicyUpdateTransactionMapper);
    RegisterTransactionMapper(PolicyRemoveTransactionMapper);
    RegisterTransactionMapper(TransferTransactionMapper);
    RegisterTransactionMapper(TopUpTransactionMapper);
    RegisterTransactionMapper(TransferQuorumTransactionMapper);
    RegisterTransactionMapper(ControllersUpdateTransactionMapper);
}

export function transactionCandidToTransaction(trs: TransactionCandid): Transaction {
    let variant = Object.keys(trs);
    for (let key of variant) {
        if (hasOwnProperty(trs, key)) {
            let mapper = TransactionMapperRegistry.get(key);
            if (mapper) {
                return mapper.mapTransaction(trs);
            }
        }
    }
    throw Error("No mapper found")
}