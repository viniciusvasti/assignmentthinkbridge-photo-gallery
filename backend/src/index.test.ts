import type AWS from 'aws-sdk';
import { handler } from './index';
import { type PictureRequest } from './types';

const createEvent: PictureRequest = {
    action: 'create',
    name: 'Test',
    description: 'Test',
    imageUrl: 'https://test.com/test.jpg',
};

const deleteEvent: PictureRequest = {
    action: 'delete',
    id: '123',
};

const mockPut = jest.fn();
const mockDelete = jest.fn();

jest.mock('aws-sdk', () => ({
    ...jest.requireActual('aws-sdk'),
    DynamoDB: {
        DocumentClient: jest.fn(() => ({
            put: (x: AWS.DynamoDB.DocumentClient.PutItemInput) => ({
                promise: () => mockPut(x),
            }),
            delete: (x: AWS.DynamoDB.DocumentClient.DeleteItemInput) => ({
                promise: () => mockDelete(x),
            }),
        })),
    },
}));

const tableName = 'test-table';

describe('handler', () => {
    it('should create a new item', async() => {
        // Act
        const response = await handler(createEvent);

        // Assert
        expect(mockPut).toHaveBeenCalledWith({
            TableName: tableName,
            Item: {
                id: expect.any(String),
                name: createEvent.name,
                description: createEvent.description,
                imageUrl: createEvent.imageUrl,
            },
        });

        expect(response).toEqual({
            statusCode: 201,
            body: JSON.stringify({ message: 'Success' }),
        });
    });

    it('should delete an item', async() => {
        // Arrange
        const tableName = 'test-table';

        // Act
        const response = await handler(deleteEvent);

        // Assert
        expect(mockDelete).toHaveBeenCalledWith({
            TableName: tableName,
            Key: { id: deleteEvent.id },
        });

        expect(response).toEqual({
            statusCode: 204,
            body: JSON.stringify({ message: 'Success' }),
        });
    });

    it('should return an error for invalid action', async() => {
        // Arrange
        const invalidEvent = {
            action: 'invalid',
        };

        // Act
        const result = await handler(invalidEvent);

        // Assert
        expect(result).toEqual({
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid action' }),
        });
    });

    it('should return an error when an exception is thrown', async() => {
        // Arrange
        const error = new Error('Test error');
        mockPut.mockRejectedValue(error);

        // Act
        const result = await handler(createEvent);

        // Assert
        expect(result).toEqual({
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        });
    });
});
