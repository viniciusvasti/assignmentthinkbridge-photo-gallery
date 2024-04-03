#!/bin/bash
export AWS_DEFAULT_REGION=us-east-1
export AWS_DEFAULT_PROFILE=assignmentthinkbridge

cd backend

aws s3 cp build/code.zip s3://vinicius-tb-code/
aws lambda update-function-code --function-name vinicius-tb-photo-gallery --s3-bucket vinicius-tb-code --s3-key code.zip

cd ..