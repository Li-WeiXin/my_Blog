#!/usr/bin/env zsh

# 自动部署脚本 (适用于 zsh)
# 确保脚本抛出遇到的错误
set -e

# 获取脚本所在目录
local script_dir="${0:a:h}"
cd "$script_dir"

# 输出当前时间
echo "开始提交博客更改: $(date)"

# 确保使用正确的 Node.js 和 yarn
export PATH="/usr/local/bin:$PATH"

# 添加并提交更改到博客仓库
git add -A
git commit -m "Auto commit at $(date)" || echo "没有需要提交的更改"

# 推送到远程仓库以触发 GitHub Actions
git push origin master

echo "提交完成: $(date)"
echo "GitHub Actions 将自动触发部署"