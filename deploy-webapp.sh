#!/bin/bash
export AWS_DEFAULT_REGION=us-east-1
export AWS_DEFAULT_PROFILE=assignmentthinkbridge

cd webapp
npm run build
aws s3 cp out s3://vinicius-tb-website/ --recursive
cd ..