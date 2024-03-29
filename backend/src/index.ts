import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function handler(
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
    console.log("Received event:", JSON.stringify(event, null, 2));
    try {
        // Process the incoming event (e.g., extract parameters, perform logic)

        // Return a successful response with "Hello World" message
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Hello World" }),
        };
    } catch (error) {
        // Return an error response if something goes wrong
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
}
