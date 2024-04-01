import AWS from 'aws-sdk';
import { pictureCreateSchema, pictureDeleteSchema, pictureListSchema } from './schemas';
import { type Picture, type PictureRequest } from './types';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE_NAME ?? '';

async function deletePicture(picture: PictureRequest): Promise<void> {
    const { id } = pictureDeleteSchema.parse(picture);
    await dynamodb
        .delete({
            TableName: tableName,
            Key: { id },
        })
        .promise();
}

async function createPicture(
    picture: PictureRequest,
): Promise<void> {
    const { name, description, imageUrl } = pictureCreateSchema.parse(picture);
    await dynamodb
        .put({
            TableName: tableName,
            Item: {
                id: Date.now().toString(),
                name,
                description,
                imageUrl,
            },
        })
        .promise();
}

/**
 * List all pictures from the database paginated by 20 items.
 */
async function listAllPictures(event: PictureRequest): Promise<Picture[]> {
    const { lastEvaluatedKey } = pictureListSchema.parse(event);
    const result = await dynamodb
        .scan({
            TableName: tableName,
            Limit: 20,
            ExclusiveStartKey: lastEvaluatedKey !== undefined ? { id: lastEvaluatedKey } : undefined,
        })
        .promise();

    return (result.Items ?? []) as Picture[];
}

export default {
    deletePicture,
    createPicture,
    listAllPictures,
};
