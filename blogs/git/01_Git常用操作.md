---
title: github的pull request操作
date: 2022-08-28
categories:
 - git
tags:
 - git
sidebar: 'auto'
---

### github的pull request操作
我们在看别人开源代码时，有时候想着要是能参与其中，那岂不是美滋滋。这时候就可以学一下pull request(以下简称pr)，当然你提了request之后， 不过最后还是看项目作者是否采纳你的提交并合并。现在我们来尝试一下pr操作。

## 1.Fork 源项目
找到开源项目，在克隆前，点击右上角的Fork，如图
成功后你就会发现clone的地址会变成你自己仓库的地址，这时候说明你fork成功。
我这里简单使用github上随便搜的一个开源项目来试试。
fork前：下载地址是项目作者的仓库地址，这时你还是在该项目作者的仓库中

fork后，你会发现，你自己的仓库中多了该项目

## 2.提交修改
这里是你在修改代码 并push到自己的仓库中，提交之后你才可以进行pr操作。
不然你pr会提醒你There isn’t anything to compare.说明你没做任何修改


## 3.pr操作
在你仓库fork下来的项目有个pull request，点击它。

然后可以写一些你该次提交的一些解释或者备注 便于作者理解你这次提交。最后点击下图的Create pull request。


当你到这，就已经完成了一次开源pr，很简单吧。然后也可以在开源作者仓库的pull request的tab中看见你这次pr。


## 4.git更新源项目代码
git remote -v 查看源地址
git remote add upstream 'url' 把你想更新的远程库地址设置成其中一个流
git fetch upstream 这就是拉取该流分支最新代码
git merge upstream/master 合并你想更新的分支 这里比如是master
git push origin/master 提交最新代码到你自己项目的对应分支
提交成功的话 你本地的master分支就成功更新了源仓库的master分支

## 5.git一些踩坑记录
#### 1. ssh-add -K ~/.ssh/id_rsa_github
`报错`
git@github.com: Permission denied (publickey).
致命错误：无法读取远程仓库。
请确认您有正确的访问权限并且仓库存在。

`解决方案：`
这个命令会将 ~/.ssh/id_rsa_github 私钥添加到 SSH 代理和 macOS 的钥匙串中，以便你在使用 SSH 连接到 GitHub 时不需要每次都输入密码短语。

#### 2. 如何查看git分支
git tag --sort=-creatordate | head -n 1
git describe --tags --abbrev=0

#### 结语

光看不如实操。
