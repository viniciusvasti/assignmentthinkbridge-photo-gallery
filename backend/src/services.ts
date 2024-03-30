import AWS from 'aws-sdk';
import { pictureCreateSchema, pictureDeleteSchema } from './schemas';
import { type PictureRequest } from './types';

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

export default {
    deletePicture,
    createPicture,
};
