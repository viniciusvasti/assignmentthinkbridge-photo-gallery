#!/bin/bash
export AWS_DEFAULT_REGION=us-east-1
export AWS_DEFAULT_PROFILE=assignmentthinkbridge

aws cloudformation deploy --template-file template-infra.yaml --stack-name vinicius-tb --capabilities CAPABILITY_NAMED_IAM