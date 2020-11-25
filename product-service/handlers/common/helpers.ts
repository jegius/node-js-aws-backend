export function buildResponse(data: any, statusCode: number = 200): Response {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(data)
    }
}

interface Response {
    headers: {
        "Access-Control-Allow-Origin": string;
        "Access-Control-Allow-Credentials": boolean
    };
    body: string;
    statusCode: number
}

export enum ErrorCode {
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500
}