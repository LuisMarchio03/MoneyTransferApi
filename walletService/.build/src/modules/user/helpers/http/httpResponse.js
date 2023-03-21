"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpResponse = void 0;
const httpResponse = ({ message, user }) => Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({
        message,
        user,
    }),
});
exports.httpResponse = httpResponse;
//# sourceMappingURL=httpResponse.js.map