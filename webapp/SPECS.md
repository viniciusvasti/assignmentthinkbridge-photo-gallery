# Assignment

Develop a photo gallery application where users can upload, view, and delete
images.

The application should have the following features:
1. Users should be able to upload multiple images at once. (  )
2. Only .jpg and .png files should be allowed for upload. (  )
3. There should be an option to capture and upload a description of an image. (  )
4. This should be validated on both the backend and frontend. (  )
5. The UI should be simple, yet robust and responsive, displaying the image, the
name of the image, description and the date it was uploaded. ( X )
6. Display 20 images at once, with pagination support. (  )
7. Users should be able to delete images. (  )

The following technologies must be used when building this project:
- CloudFormation, so there should not be any manually created resources. (  )
- Amazon S3, for storing the actual images and hosting. (  )
- Amazon Lambda, for back end. (  )
- DynamoDB, to store metadata, with necessary indexes. (  )
- Next.js for the front end. (  )
- TypeScript for the entire frontend and backend. ( X )
- Test cases. (  )
- Your codebase must be consistent with proper typing, semi-colons (use
ESLint!), etc. The UI should be simple, but robust. ( X )

DynamoDB: You are expected to create an efficient table structure where only a
single table is for object metadata. Avoid using the Scan operation and design your
table to avoid hot partitions.

Authentication: There is no need for authentication logic so anyone can see each
other’s uploaded content.

You will get an AWS account access in another document.
Duration: 4 days with a document for estimations of modules.

---
[] Handle route errors
[] Review DynamoDB table structure and indexes
[] Pages metadata
[] Allow edit image name and description
[] Design review
[] Dark mode