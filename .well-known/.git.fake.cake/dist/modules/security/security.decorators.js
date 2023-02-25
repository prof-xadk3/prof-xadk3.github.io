"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentIp = exports.CurrentUser = exports.Public = exports.IS_PUBLIC_KEY = exports.Roles = exports.ROLES_KEY = exports.Role = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const request_1 = require("../../utils/request");
var Role;
(function (Role) {
    Role["Owner"] = "owner";
    Role["Admin"] = "admin";
    Role["Premium"] = "premium";
})(Role = exports.Role || (exports.Role = {}));
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.CurrentUser = (0, common_1.createParamDecorator)((_, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
exports.CurrentIp = (0, common_1.createParamDecorator)((_, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return (0, request_1.getIp)(req);
});
//# sourceMappingURL=security.decorators.js.map