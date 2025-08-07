#!/usr/bin/env zsh

# 确保脚本抛出遇到的错误
set -e

echo "开始推送博客源码..."

# 返回到项目根目录
cd "$(dirname "$0")"

# 检查是否有未提交的更改
if ! git diff-index --quiet HEAD -- || [ -n "$(git ls-files --others --exclude-standard)" ]; then
    echo "检测到未提交的更改，先暂存本地更改..."
    git add .
    git stash push -m "Auto stash before pull at $(date)"
    STASHED=true
else
    echo "没有未提交的更改"
    STASHED=false
fi

# 拉取最新更改
echo "拉取最新更改..."
git pull origin master || echo "警告: 无法拉取最新更改"

# 如果之前有暂存的更改，现在恢复
if [ "$STASHED" = true ]; then
    echo "恢复暂存的更改..."
    git stash pop || echo "警告: 无法恢复暂存的更改，请手动解决冲突"
fi

# 添加所有更改
echo "添加所有更改..."
git add .

# 检查是否有更改需要提交
if ! git diff --cached --quiet; then
    # 提交更改
    echo "提交更改..."
    git commit -m "Auto commit at $(date)"
else
    echo "没有需要提交的更改"
fi

# 推送到主分支触发GitHub Actions部署
echo "推送到主分支以触发部署..."
git push origin master

echo "推送完成！GitHub Actions将自动部署您的博客。"