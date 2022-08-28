#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build
rm -rf ../my_BlogDist/public/*

# 将build生成的dist目录拷贝至上一层目录中
cp -rf public ../my_BlogDist/

# 进入生成的文件夹
cd ../my_BlogDist/public

# git init
git init
git add -A
git commit -m 'deploy try'
git branch -M main

# 如果发布到 https://<USERNAME>.github.io  填写你刚刚创建的仓库地址
git remote add origin git@github.com:Li-WeiXin/Li-WeiXin.github.io.git

git push -f origin  git@github.com:Li-WeiXin/Li-WeiXin.github.io.git main

cd ..

tcb hosting:deploy public -e blog-9g8lgnuke4603ff9
