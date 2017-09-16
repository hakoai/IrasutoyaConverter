#!/bin/bash
set -e

# フォーマット & ビルド
tsfmt -r
tsc

# ファイル差分がなければ正常終了
if git diff --quiet; then
    exit 0
fi

# ファイル差分がある場合は変更をpushする
git config user.name "hakoai"
git config user.email "hk--76@qa2.so-net.ne.jp"
SHA=`git rev-parse --verify HEAD`

REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}

git checkout -b $TRAVIS_PULL_REQUEST_BRANCH
git add -A .
git commit -m "Auto bluild: ${SHA}"

openssl aes-256-cbc -K $encrypted_d9a5198f385a_key -iv $encrypted_d9a5198f385a_iv -in deploy_key.enc -out deploy_key -d
chmod 600 ./deploy_key
eval `ssh-agent -s`
ssh-add deploy_key
git push $SSH_REPO $TRAVIS_PULL_REQUEST_BRANCH

exit 1
