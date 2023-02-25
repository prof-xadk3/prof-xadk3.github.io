/// <reference types="node" />
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { Agent } from 'https';
import { DocumentNode, GraphQLError } from 'graphql';
type Variables = {
    [key: string]: string | number | string[] | boolean | any[] | Variables;
};
export declare class FetchService {
    private configService;
    private readonly logger;
    agent: Agent | null;
    constructor(configService: ConfigService, logger: Logger);
    fetchWithProxy(url: string, options?: any): Promise<Response>;
    graphqlFetchWithProxy(url: string, query: DocumentNode, variables?: Variables, headers?: {
        [key: string]: string | number | string[] | boolean;
    }): Promise<{
        data: any;
        error: undefined | GraphQLError;
    }>;
}
export {};
