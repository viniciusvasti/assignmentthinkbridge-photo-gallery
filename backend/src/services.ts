import AWS from 'aws-sdk';
import { pictureCreateSchema, pictureDeleteSchema, pictureListSchema } from './schemas';
import { type Picture, type PictureRequest } from './types';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE_NAME ?? '';
const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: 'us-east-1',
});
const bucketName = process.env.S3_BUCKET_NAME ?? '';

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
): Promise<{
        id: string
        signedUrl: string
    }> {
    const { name, description, imageFileName } = pictureCreateSchema.parse(picture);
    const signedUrl = s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: imageFileName,
        Expires: 300, // The URL expires in 5 minutes
    });
    const id = Date.now().toString();
    await dynamodb
        .put({
            TableName: tableName,
            Item: {
                id,
                name,
                description,
                imageFileName,
            },
        })
        .promise();
    return { id, signedUrl };
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
