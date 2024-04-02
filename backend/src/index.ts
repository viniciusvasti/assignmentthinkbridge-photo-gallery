import { type APIGatewayProxyResult, type APIGatewayProxyEventV2 } from 'aws-lambda';
import { type PictureRequest } from './types';
import services from './services';

export async function handler(
    event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const pictureRequest: PictureRequest = {
        method: event.requestContext.http.method || '',
        lastEvaluatedKey: event.queryStringParameters?.lastEvaluatedKey,
        id: event.queryStringParameters?.id,
    };
    console.log('event.requestContext:', JSON.stringify(event.requestContext));
    console.log('Received picture request:', JSON.stringify(pictureRequest, null, 2));

    try {
        let statusCode = 200;
        switch (pictureRequest.method) {
            case 'POST':
                statusCode = 201;
                await services.createPicture(pictureRequest);
                break;
            case 'GET':
                return {
                    statusCode,
                    body: JSON.stringify(await services.listAllPictures(pictureRequest)),
                };
            case 'DELETE':
                statusCode = 204;
                await services.deletePicture(pictureRequest);
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
