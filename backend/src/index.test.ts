import type AWS from 'aws-sdk';
import { handler } from './index';
import { type APIGatewayProxyEventV2 } from 'aws-lambda';

const items = [
    {
        id: '1',
        name: 'Test 1',
        description: 'Test 1',
        imageUrl: 'https://test.com/test1.jpg',
    },
    {
        id: '2',
        name: 'Test 2',
        description: 'Test 2',
        imageUrl: 'https://test.com/test2.jpg',
    },
];

const createEvent: APIGatewayProxyEventV2 = {
    version: '2.0',
    routeKey: 'POST /',
    rawPath: '/',
    rawQueryString: '',
    headers: {
        accept: '*/*',
        'content-length': '0',
        host: 'vkdcla28i9.execute-api.us-east-1.amazonaws.com',
        'user-agent': 'curl/8.4.0',
        'x-amzn-trace-id': 'Root=1-660c0100-0ed7826160bd8b316277b944',
        'x-forwarded-for': '179.187.47.71',
        'x-forwarded-port': '443',
        'x-forwarded-proto': 'https',
    },
    requestContext: {
        accountId: '535726746963',
        apiId: 'vkdcla28i9',
        domainName: 'vkdcla28i9.execute-api.us-east-1.amazonaws.com',
        domainPrefix: 'vkdcla28i9',
        http: {
            method: 'POST',
            path: '/',
            protocol: 'HTTP/1.1',
            sourceIp: '179.187.47.71',
            userAgent: 'curl/8.4.0',
        },
        requestId: 'VmUYJhsGoAMEaJg=',
        routeKey: 'POST /',
        stage: '$default',
        time: '02/Apr/2024:12:58:40 +0000',
        timeEpoch: 1712062720668,
    },
    body: JSON.stringify({
        name: 'Test',
        description: 'Test description',
        imageUrl: 'https://test.com/test.jpg',
    }),
    isBase64Encoded: false,
};

const listEvent: APIGatewayProxyEventV2 = {
    ...createEvent,
    routeKey: 'GET /',
    requestContext: {
        ...createEvent.requestContext,
        http: {
            ...createEvent.requestContext.http,
            method: 'GET',
        },
    },
};

const deleteEvent: APIGatewayProxyEventV2 = {
    ...createEvent,
    routeKey: 'DELETE /',
    requestContext: {
        ...createEvent.requestContext,
        http: {
            ...createEvent.requestContext.http,
            method: 'DELETE',
        },
    },
    body: JSON.stringify({
        id: '123',
    }),
};

const mockPut = jest.fn();
const mockScan = jest.fn((x) => ({
    Items: items,
}));
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
            scan: (x: AWS.DynamoDB.DocumentClient.ScanInput) => ({
                promise: () => mockScan(x),
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
                name: 'Test',
                description: 'Test description',
                imageUrl: 'https://test.com/test.jpg',
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
            Key: { id: '123' },
        });

        expect(response).toEqual({
            statusCode: 204,
            body: JSON.stringify({ message: 'Success' }),
        });
    });

    it('should list all items', async() => {
        // Act
        const response = await handler(listEvent);

        // Assert
        expect(mockScan).toHaveBeenCalledWith({
            TableName: tableName,
            Limit: 20,
            ExclusiveStartKey: undefined,
        });

        expect(response).toEqual({
            statusCode: 200,
            body: JSON.stringify(items),
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
