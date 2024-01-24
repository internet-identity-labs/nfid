
export enum TransactionType {
    WalletUpdateName = 'WalletUpdateName',
    MemberCreate = 'MemberCreate',
    PolicyRemove = 'PolicyRemove',
    WalletCreate = 'WalletCreate',
    MemberRemove = 'MemberRemove',
    PolicyCreate = 'PolicyCreate',
    PolicyUpdate = 'PolicyUpdate',
    MemberUpdateName = 'MemberUpdateName',
    MemberUpdateRole = 'MemberUpdateRole',
    QuorumUpdate = 'QuorumUpdate',
    VaultNamingUpdate = 'VaultNamingUpdate',
    Transfer = 'Transfer',
    TopUp = 'TopUp',
    VersionUpgrade = 'VersionUpgrade',
    Purge = 'Purge',
}

export enum Currency {
    ICP = "ICP",
}

export enum Network {
    IC = "IC",
}

export enum TransactionState {
    Approved = "Approved",
    Pending = "Pending",
    Rejected = "Rejected",
    Executed = "Executed",
    Blocked = "Blocked",
    Purged = "Purged",
}

export enum VaultRole {
    ADMIN = "Admin",
    MEMBER = "Member",
}
