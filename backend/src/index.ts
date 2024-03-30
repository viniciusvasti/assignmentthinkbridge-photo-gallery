import { type APIGatewayProxyResult } from 'aws-lambda';
import { type PictureRequest } from './types';
import services from './services';

export async function handler(
    event: PictureRequest,
): Promise<APIGatewayProxyResult> {
    console.log('Received event:', JSON.stringify(event, null, 2));
    try {
        let statusCode = 200;
        switch (event.action) {
            case 'create':
                statusCode = 201;
                await services.createPicture(event);
                break;
            case 'delete':
                statusCode = 204;
                await services.deletePicture(event);
                break;
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Invalid action' }),
                };
        }

        return {
            statusCode,
            body: JSON.stringify({ message: 'Success' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}
