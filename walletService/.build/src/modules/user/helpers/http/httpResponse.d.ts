import { HttpResponseInterface } from '../../protocols/http/httpResponse.interface';
export declare const httpResponse: ({ message, user }: HttpResponseInterface) => Promise<{
    statusCode: number;
    body: string;
}>;
//# sourceMappingURL=httpResponse.d.ts.map