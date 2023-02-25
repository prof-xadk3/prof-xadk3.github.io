import { OnModuleInit } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class ViewService implements OnModuleInit {
    private configService;
    private server;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    handler(req: Request, res: Response): Promise<void>;
}
