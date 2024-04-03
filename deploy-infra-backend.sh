#!/bin/bash
export AWS_DEFAULT_REGION=us-east-1
export AWS_DEFAULT_PROFILE=assignmentthinkbridge

cd backend

aws s3 cp build/code.zip s3://vinicius-tb-code/

aws cloudformation deploy --template-file template-infra.yaml --stack-name vinicius-tb-backend --capabilities CAPABILITY_NAMED_IAM

cd ..