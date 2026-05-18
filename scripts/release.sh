#! /usr/bin/env bash

lerna version $1
pnpm publish -r

npm run build:ssr:cabloyBasicBatch
