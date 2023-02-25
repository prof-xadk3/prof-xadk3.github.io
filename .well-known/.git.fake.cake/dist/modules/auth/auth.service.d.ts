import { JwtService } from '@nestjs/jwt';
import { Logger } from 'winston';
import { AccountsService } from '../accounts/accounts.service';
export declare class AuthenticationService {
    private readonly jwtService;
    private accountsService;
    private readonly logger;
    constructor(jwtService: JwtService, accountsService: AccountsService, logger: Logger);
    getUserFromAuthToken(token: string): Promise<any>;
}
