export declare enum ConfigFields {
    BACKUPS = "BACKUPS",
    HEALTHCHECKS = "HEALTHCHECKS",
    ONCHAIN_PUSH = "ONCHAIN_PUSH",
    CHANNELS_PUSH = "CHANNELS_PUSH",
    PRIVATE_CHANNELS_PUSH = "PRIVATE_CHANNELS_PUSH"
}
export declare class ConfigState {
    backup_state: boolean;
    healthcheck_ping_state: boolean;
    onchain_push_enabled: boolean;
    channels_push_enabled: boolean;
    private_channels_push_enabled: boolean;
}
