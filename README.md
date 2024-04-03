# The Project
Webapp URL: http://vinicius-tb-website.s3-website-us-east-1.amazonaws.com/

## Infrastructure
- Build with AWS CloudFormation

## Frontend
- Build with Next.js and TypeScript
- Styled with Tailwindcss
- Leveraged [Shadcn](https://ui.shadcn.com) UI components
- [React-Hook-Form](https://react-hook-form.com) takes care of forms
- Along with [Zod](https://zod.dev) for schema/form validations

## Backend
- Build with Node.js and TypeScript
- Along with [Zod](https://zod.dev) for schema validations

### Deployment
1. Run `./deploy-infra.sh` to deploy the general CloudFormation stack
2. Run `./package-lambda.sh` to package the Lambda code and upload it to the S3 bucket
3. Run `./deploy-infra-backend.sh` to deploy the Lambda CloudFormation stack
4. Run `./deploy-webapp.sh` to deploy the webapp to the S3 bucket

## Known Issues
The feature of uploading multiple images at once is missing for this MVP. Since I had to prioritize other tasks (my actual job, even during the weekend because of a new production release), I figured that this feature would be the least important for the MVP. I'm sorry for that.

## Evolving the Project / Architecture
Here are the next steps I'd take to evolve/improve the project:

- Improve logging
- Make pagination work through query params instead of local state
- Better use of variables for the CloudFormation stacks
- Improve error handling and cover more error cases
- Review types and schemas
- Refactor the API Gateway to better reflect a RESTful API
- Cleanup the lambda package for deploying it with only necessary dependencies
- Fix the refresh when the route is not the root (it redirects to the root)
- Implement CI/CD for:
  - Building, Checking, and Deploying the Next.js app
  - Building, Checking, and Deploying the Lambda
  - Deploying the CloudFormation stack automatically

\*Maybe some those should be already in place but I did my best to deliver a MVP in the time I had