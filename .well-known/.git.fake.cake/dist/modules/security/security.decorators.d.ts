export declare enum Role {
    Owner = "owner",
    Admin = "admin",
    Premium = "premium"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const CurrentIp: (...dataOrPipes: unknown[]) => ParameterDecorator;
