#!/bin/bash
set -e

#npm install -g typescript-formatter
tsfmt -r
tsc

git status

if git diff --quite; then
    exit 0
fi

exit 1

openssl aes-256-cbc -K $encrypted_d9a5198f385a_key -iv $encrypted_d9a5198f385a_iv -in deploy_key.enc -
out deploy_key -d
