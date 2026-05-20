#! /usr/bin/env bash

lerna version $1 --yes
pnpm publish -r

npm run build:ssr:cabloyBasicBatch
