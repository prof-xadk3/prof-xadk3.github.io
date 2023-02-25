import { Logger } from 'winston';
import { NodeService } from '../../node/node.service';
import { UserId } from '../../security/security.types';
export declare class HealthResolver {
    private nodeService;
    private readonly logger;
    constructor(nodeService: NodeService, logger: Logger);
    getFeeHealth(user: UserId): Promise<{
        score: number;
        channels: {
            id: string;
            partnerSide: {
                score: number;
                rate: number;
                base: number;
                rateScore: number;
                baseScore: number;
                rateOver: boolean;
                baseOver: boolean;
            };
            mySide: {
                score: number;
                rate: number;
                base: number;
                rateScore: number;
                baseScore: number;
                rateOver: boolean;
                baseOver: boolean;
            };
            partner: {
                publicKey: string;
            };
        }[];
    }>;
    getTimeHealth(user: UserId): Promise<{
        score: number;
        channels: {
            id: string;
            significant: boolean;
            monitoredTime: number;
            monitoredUptime: number;
            monitoredDowntime: number;
            partner: {
                publicKey: string;
            };
            score: number;
        }[];
    }>;
    getVolumeHealth(user: UserId): Promise<{
        score: number;
        channels: {
            id: string;
            score: number;
            volumeNormalized: number;
            averageVolumeNormalized: number;
            partner: {
                publicKey: string;
            };
        }[];
    }>;
}
