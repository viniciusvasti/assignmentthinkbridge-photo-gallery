#!/bin/bash

# Build TypeScript app
npm run build

# Copy package.json into build folder
cp package.json build/

# Move into build folder
cd build/

# Run npm install --omit=dev
npm install --omit=dev

# Zip the content recursively
zip -r code.zip ./

# Move back to the original directory
cd ..
