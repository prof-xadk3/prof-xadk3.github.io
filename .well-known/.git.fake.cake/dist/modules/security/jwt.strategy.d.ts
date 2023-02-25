import { ConfigService } from '@nestjs/config';
import { JwtObjectType, UserId } from './security.types';
import { Logger } from 'winston';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService, logger: Logger);
    validate(payload: JwtObjectType): Promise<UserId>;
}
export {};
