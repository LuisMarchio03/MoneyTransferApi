"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequest = void 0;
const badRequest = (error) => Promise.resolve({
    statusCode: 400,
    body: JSON.stringify(error),
});
exports.badRequest = badRequest;
//# sourceMappingURL=badRequest.js.map