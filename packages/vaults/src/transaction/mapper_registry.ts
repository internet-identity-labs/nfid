import { TransactionMapper } from "./transaction_mapper"
import { PurgeRequestMapper, PurgeTransactionMapper } from "./config/purge"
import {
  ControllersRequestMapper,
  ControllersUpdateTransactionMapper,
} from "./config/controllers_update"
import { QuorumUpdateRequestMapper, QuorumUpdateTransactionMapper } from "./config/quorum_update"
import {
  MemberUpdateNameRequestMapper,
  MemberUpdateNameTransactionMapper,
} from "./member/member_update_name"
import { MemberCreateRequestMapper, MemberCreateTransactionMapper } from "./member/member_create"
import {
  MemberUpdateRoleRequestMapper,
  MemberUpdateRoleTransactionMapper,
} from "./member/member_update_role"
import { MemberRemoveRequestMapper, MemberRemoveTransactionMapper } from "./member/member_remove"
import {
  VaultUpdateNamingRequestMapper,
  VaultUpdateNamingTransactionMapper,
} from "./config/vault_naming"
import {
  VersionUpgradeRequestMapper,
  VersionUpgradeTransactionMapper,
} from "./config/version_upgrade"
import { WalletCreateRequestMapper, WalletCreateTransactionMapper } from "./wallet/wallet_create"
import { PolicyCreateRequestMapper, PolicyCreateTransactionMapper } from "./policy/policy_create"
import { PolicyUpdateRequestMapper, PolicyUpdateTransactionMapper } from "./policy/policy_update"
import { PolicyRemoveRequestMapper, PolicyRemoveTransactionMapper } from "./policy/policy_remove"
import { TransferRequestMapper, TransferTransactionMapper } from "./transfer/transfer"
import { TopUpRequestMapper, TopUpTransactionMapper } from "./transfer/top_up"
import {
  TransferQuorumRequestMapper,
  TransferQuorumTransactionMapper,
} from "./transfer/transfer_quorum"
import { RequestMapper } from "./request_mapper"
import {
  WalletUpdateNameRequestMapper,
  WalletUpdateNameTransactionMapper,
} from "./wallet/wallet_update_name"
import {
  TransferICRC1QuorumRequestMapper,
  TransferICRC1QuorumTransactionMapper,
} from "./transfer/transfer_icrc1_quorum"
import { TopUpQuorumRequestMapper, TopUpQuorumTransactionMapper } from "./transfer/top_up_quorum"
import {
  MemberCreateRequestMapperV2,
  MemberCreateTransactionMapperV2,
} from "./member/member_createV2"
import {
  MemberExtendAccountTransactionMapper,
  MemberExtendICRC1AccountRequestMapper,
} from "./member/member_extend_account"
import {ICRC1CanistersAddTransactionMapper, ICRC1CanistersAddTransactionRequestMapper} from "./config/icrc1_add";
import {
    ICRC1CanistersRemoveTransactionMapper,
    ICRC1CanistersRemoveTransactionRequestMapper
} from "./config/icrc1_remove";

export const TransactionMapperRegistry: Map<PropertyKey, TransactionMapper> = new Map()
export const RequestMapperRegistry: Map<string, RequestMapper> = new Map()

type TransactionMapperConstructor = new () => TransactionMapper
type RequestMapperConstructor = new () => RequestMapper

function RegisterTransactionMapper(target: TransactionMapperConstructor) {
  const instance = new target()
  TransactionMapperRegistry.set(instance.getVariant(), instance)
}

function RegisterRequestMapper(target: RequestMapperConstructor) {
  const instance = new target()
  RequestMapperRegistry.set(instance.getMappedRequestType(), instance)
}

export function registerTransactionMappers() {
  RegisterTransactionMapper(MemberCreateTransactionMapper)
  RegisterTransactionMapper(MemberCreateTransactionMapperV2)
  RegisterTransactionMapper(MemberExtendAccountTransactionMapper)
  RegisterTransactionMapper(MemberUpdateNameTransactionMapper)
  RegisterTransactionMapper(MemberUpdateRoleTransactionMapper)
  RegisterTransactionMapper(MemberRemoveTransactionMapper)
  RegisterTransactionMapper(QuorumUpdateTransactionMapper)
  RegisterTransactionMapper(VaultUpdateNamingTransactionMapper)
  RegisterTransactionMapper(VersionUpgradeTransactionMapper)
  RegisterTransactionMapper(PurgeTransactionMapper)
  RegisterTransactionMapper(WalletCreateTransactionMapper)
  RegisterTransactionMapper(WalletUpdateNameTransactionMapper)
  RegisterTransactionMapper(PolicyCreateTransactionMapper)
  RegisterTransactionMapper(PolicyUpdateTransactionMapper)
  RegisterTransactionMapper(PolicyRemoveTransactionMapper)
  RegisterTransactionMapper(TransferTransactionMapper)
  RegisterTransactionMapper(TopUpTransactionMapper)
  RegisterTransactionMapper(TopUpQuorumTransactionMapper)
  RegisterTransactionMapper(TransferQuorumTransactionMapper)
  RegisterTransactionMapper(ControllersUpdateTransactionMapper)
  RegisterTransactionMapper(TransferICRC1QuorumTransactionMapper)
  RegisterTransactionMapper(ICRC1CanistersAddTransactionMapper)
  RegisterTransactionMapper(ICRC1CanistersRemoveTransactionMapper)
}

export function registerRequestMappers() {
  RegisterRequestMapper(ControllersRequestMapper)
  RegisterRequestMapper(QuorumUpdateRequestMapper)
  RegisterRequestMapper(MemberCreateRequestMapper)
  RegisterRequestMapper(MemberCreateRequestMapperV2)
  RegisterRequestMapper(MemberExtendICRC1AccountRequestMapper)
  RegisterRequestMapper(MemberUpdateNameRequestMapper)
  RegisterRequestMapper(MemberUpdateRoleRequestMapper)
  RegisterRequestMapper(MemberRemoveRequestMapper)
  RegisterRequestMapper(VaultUpdateNamingRequestMapper)
  RegisterRequestMapper(VersionUpgradeRequestMapper)
  RegisterRequestMapper(PurgeRequestMapper)
  RegisterRequestMapper(WalletCreateRequestMapper)
  RegisterRequestMapper(WalletUpdateNameRequestMapper)
  RegisterRequestMapper(PolicyCreateRequestMapper)
  RegisterRequestMapper(PolicyUpdateRequestMapper)
  RegisterRequestMapper(PolicyRemoveRequestMapper)
  RegisterRequestMapper(TransferRequestMapper)
  RegisterRequestMapper(TopUpRequestMapper)
  RegisterRequestMapper(TopUpQuorumRequestMapper)
  RegisterRequestMapper(TransferQuorumRequestMapper)
  RegisterRequestMapper(TransferICRC1QuorumRequestMapper)
  RegisterRequestMapper(ICRC1CanistersAddTransactionRequestMapper)
  RegisterRequestMapper(ICRC1CanistersRemoveTransactionRequestMapper)
}
