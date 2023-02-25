export declare class AmbossSubscription {
    end_date: string;
    subscribed: boolean;
    upgradable: boolean;
}
export declare class UserBackupInfo {
    last_update: string;
    last_update_size: string;
    total_size_saved: string;
    available_size: string;
    remaining_size: string;
}
export declare class AmbossUser {
    subscription: AmbossSubscription;
    backups: UserBackupInfo;
}
export declare class LightningAddress {
    pubkey: string;
    lightning_address: string;
}
export declare class NodeSocialInfo {
    private: boolean;
    telegram: string;
    twitter: string;
    twitter_verified: boolean;
    website: string;
    email: string;
}
export declare class NodeSocial {
    info: NodeSocialInfo;
}
export declare class LightningNodeSocialInfo {
    socials: NodeSocial;
}
