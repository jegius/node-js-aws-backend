import 'source-map-support/register';

export const basicAuthorizerHandler: any = async (event, _, callback) => {
    if (event['type'] !== 'REQUEST') {
        callback('Unauthorized');
    }

    try {
        const {queryStringParameters: {token}} = event;
        const buffer = Buffer.from(token, 'base64');
        const [username, password] = buffer.toString('utf-8').split(':');

        console.log(`username: ${username} and password: ${password}`);

        const storedUserPassword = process.env[username];
        const effect = !storedUserPassword || storedUserPassword !== password
            ? 'Deny'
            : 'Allow';

        const policy = generatePolicy(token, event.methodArn, effect);

        callback(null, policy)
    } catch (e) {
        callback(`Unauthorized: ${e.message}`)
    }
};

function generatePolicy(principalId, resource, effect = 'Allow') {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        }
    }
}