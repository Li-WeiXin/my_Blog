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

# 添加 GitHub SSH 密钥到 SSH agent
# 启动 ssh-agent 并添加 GitHub SSH 密钥
eval "$(ssh-agent -s)"
if [ -f ~/.ssh/id_rsa_github ]; then
    ssh-add ~/.ssh/id_rsa_github
else
    echo "警告: 找不到 GitHub SSH 密钥 (~/.ssh/id_rsa_github)"
    echo "尝试使用默认 SSH 密钥..."
    ssh-add -l >/dev/null || ssh-add
fi

# 添加并提交更改到博客仓库
git add -A
git commit -m "Auto commit at $(date)" || echo "没有需要提交的更改"

# 推送到远程仓库以触发 GitHub Actions
git push origin master

echo "提交完成: $(date)"
echo "GitHub Actions 将自动触发部署"