import {Transaction} from "./transaction";
import {TransactionMapper} from "./transaction_mapper";
import {TransactionCandid} from "../idl/service_vault";
import {hasOwnProperty} from "../util/helper";
import {PurgeRequestMapper, PurgeTransactionMapper} from "./config/purge";
import {ControllersRequestMapper, ControllersUpdateTransactionMapper} from "./config/controllers_update";
import {QuorumUpdateRequestMapper, QuorumUpdateTransactionMapper} from "./config/quorum_update";
import {MemberUpdateNameRequestMapper, MemberUpdateNameTransactionMapper} from "./member/member_update_name";
import {MemberCreateRequestMapper, MemberCreateTransactionMapper} from "./member/member_create";
import {MemberUpdateRoleRequestMapper, MemberUpdateRoleTransactionMapper} from "./member/member_update_role";
import {MemberRemoveRequestMapper, MemberRemoveTransactionMapper} from "./member/member_remove";
import {VaultUpdateNamingRequestMapper, VaultUpdateNamingTransactionMapper} from "./config/vault_naming";
import {VersionUpgradeTransactionMapper} from "./config/version_upgrade";
import {WalletCreateRequestMapper, WalletCreateTransactionMapper} from "./wallet/wallet_create";
import {PolicyCreateRequestMapper, PolicyCreateTransactionMapper} from "./policy/policy_create";
import {PolicyUpdateRequestMapper, PolicyUpdateTransactionMapper} from "./policy/policy_update";
import {PolicyRemoveRequestMapper, PolicyRemoveTransactionMapper} from "./policy/policy_remove";
import {TransferRequestMapper, TransferTransactionMapper} from "./transfer/transfer";
import {TopUpRequestMapper, TopUpTransactionMapper} from "./transfer/top_up";
import {TransferQuorumRequestMapper, TransferQuorumTransactionMapper} from "./transfer/transfer_quorum";
import {RequestMapper} from "./request_mapper";

export const TransactionMapperRegistry: Map<PropertyKey, TransactionMapper> = new Map();
export const RequestMapperRegistry: Map<string, RequestMapper> = new Map();

type TransactionMapperConstructor<T extends Transaction> = new () => TransactionMapper;
type RequestMapperConstructor<T extends RequestMapper> = new () => RequestMapper;

function RegisterTransactionMapper<T extends Transaction>(
    target: TransactionMapperConstructor<T>
) {
    let instance = new target();
    TransactionMapperRegistry.set(instance.getVariant(), instance);
}

function RegisterRequestMapper<T extends RequestMapper>(
    target: RequestMapperConstructor<T>
) {
    let instance = new target();
    let className = instance.constructor.name
    RequestMapperRegistry.set(className, instance);
}


export function registerTransactionMappers() {
    RegisterTransactionMapper(MemberCreateTransactionMapper);
    RegisterTransactionMapper(MemberUpdateNameTransactionMapper);
    RegisterTransactionMapper(MemberUpdateRoleTransactionMapper);
    RegisterTransactionMapper(MemberRemoveTransactionMapper);
    RegisterTransactionMapper(QuorumUpdateTransactionMapper);
    RegisterTransactionMapper(VaultUpdateNamingTransactionMapper);
    RegisterTransactionMapper(VersionUpgradeTransactionMapper);
    RegisterTransactionMapper(PurgeTransactionMapper);
    RegisterTransactionMapper(WalletCreateTransactionMapper);
    RegisterTransactionMapper(PolicyCreateTransactionMapper);
    RegisterTransactionMapper(PolicyUpdateTransactionMapper);
    RegisterTransactionMapper(PolicyRemoveTransactionMapper);
    RegisterTransactionMapper(TransferTransactionMapper);
    RegisterTransactionMapper(TopUpTransactionMapper);
    RegisterTransactionMapper(TransferQuorumTransactionMapper);
    RegisterTransactionMapper(ControllersUpdateTransactionMapper);
}

export function registerRequestMappers() {
    RegisterRequestMapper(ControllersRequestMapper);
    RegisterRequestMapper(QuorumUpdateRequestMapper);
    RegisterRequestMapper(MemberCreateRequestMapper);
    RegisterRequestMapper(MemberUpdateNameRequestMapper);
    RegisterRequestMapper(MemberUpdateRoleRequestMapper);
    RegisterRequestMapper(MemberRemoveRequestMapper);
    RegisterRequestMapper(VaultUpdateNamingRequestMapper);
    RegisterRequestMapper(VaultUpdateNamingRequestMapper);
    RegisterRequestMapper(PurgeRequestMapper);
    RegisterRequestMapper(WalletCreateRequestMapper);
    RegisterRequestMapper(PolicyCreateRequestMapper);
    RegisterRequestMapper(PolicyUpdateRequestMapper);
    RegisterRequestMapper(PolicyRemoveRequestMapper);
    RegisterRequestMapper(TransferRequestMapper);
    RegisterRequestMapper(TopUpRequestMapper);
    RegisterRequestMapper(TransferQuorumRequestMapper);
}