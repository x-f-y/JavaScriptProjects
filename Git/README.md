### `Git`教程（仅供参考）

#### 基础`Linux`命令（前置知识）

1. `#`表示注释 
2. `-`后面一般接缩写（字母），`--`后面一般接全拼（单词）
3. 有空格的字符串要加上引号
4. 常用`Linux`命令：
   - `cd`   改变目录
   - `pwd`    显示当前所在的目录路径
   - `ls/ll`    列出当前目录的所有文件（`ll`更详细）
   - `touch`    新建一个文件`touch index.js`
   - `rm`    删除一个文件`rm index.js`
   - `mkdir`    新建一个目录`mkdir test`
   - `rm -r`    删除一个目录`rm -r test`    注意：`rm -rf /`命令表示删除全部文件，切勿尝试
   - `mv`    移动文件`mv index.html test`
   - `reset`    重新初始化终端
   - `clear`    清屏（或者`ctrl+l`）
   - `history`    查看命令历史
   - `exit`    退出
   - `echo <message> > <file>`    创建`file`文件并写入`message`信息
   - `vim <file>`    创建`file`文件并使用`vim`编辑器打开
   - `cat <file>`    查看`file`文件中的内容
   - `rm -rf .git`    彻底删除git仓库，不再进行版本控制
5. 常用`Vim`命令
   - `yy`    复制一行
   - `p`   粘贴一行
   - `dd`    删除一行
   - `ctrl+insert`    复制
   - `shift+insert`    粘贴

#### `Git`和`SVN`的主要区别

* `SVN`是集中式版本控制系统，版本库是集中存放在中央服务器的，而干活的时候，用的都是自己的电脑，所以要先从中央服务器取得最新的版本，然后开始干活，干完活了，再把自己的活推送给中央服务器。主要缺点是必须联网才能工作而且存在单点故障问题，即中央服务器故障
* `Git`是免费且开源的分布式版本控制系统，没有“中央服务器”，每个人的电脑上都是一个完整的版本库，不需要联网也能工作而且没有单点故障问题
* 和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人电脑里都有完整的版本库，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。而集中式版本控制系统的中央服务器要是出了问题，所有人都没法干活了
* `Git`有暂存区这个概念，而`SVN`没有

#### `Git`配置常用命令

- `git version`    查看`git`版本信息
- `git config -l`或`git config --list`	查看`git`配置信息
- `git config --system --list`    查看`git`本地配置信息
- `git config --global --list`    查看`git`全局配置信息
- `git config --global user.name "xxx"`    配置`git`的用户名
- `git config --global user.email "yyy"`    配置`git`的用户邮箱
- `git config --global user.name`    查看`git`的用户名
- `git config --global user.email`    查看`git`的用户邮箱

#### `Git`理论

`Git`本地有三个区域：工作区、暂存区、本地仓库。如果再加上远程的`git`仓库，就可以分为四个区域。文件在这四个区域之间的转换关系如下：

![img_1](./images/img_1.png)

- 工作区：就是存放项目代码的文件夹
- 暂存区：用于临时存放文件的改动，事实上它只是一个文件，保存即将提交（`commit`）的文件列表信息
- 本地仓库：就是安全存放数据的位置，这里面有已经提交（`commit`）的所有版本的数据。其中`HEAD`是一个指针，它始终指向分支中的最新提交。无论何时进行提交，`HEAD`都会使用最新提交进行更新。分支的头部存储在 `.git / refs / heads /` 目录中
- 远程仓库：托管代码的服务器，如`github`和`gitee`

`Git`的工作流程如下：

1. 在工作区中添加、修改文件
2. 将需要进行版本管理的文件放入暂存区
3. 将暂存区域的文件提交到本地仓库

#### 本地仓库搭建

创建本地仓库的方法有两种：

```shell
  # 1. 将尚未进行版本控制的本地目录转换为 Git 仓库，进入项目目录中，运行如下命令：
  $ git init
  # 2. 从其它服务器（一般是 github 或者 gitee）克隆（clone）一个已存在的 Git 仓库，可以使用 HTTPS 协议或者 SSH 协议
  $ git clone <url>
```

> tips：和`https`相比，`ssh`协议传输速度更快，并且每次推送时不需要输入口令

#### 工作区和暂存区

- `git status`    查看工作区和暂存区的状态
- `git add <file1> <file2> ...`    添加一个或多个文件到暂存区
- `git add <dir>`    添加指定目录到暂存区（包括子目录）
- `git add .`    添加当前目录下的所有文件到暂存区
- `git commit -m "<message>"`   提交暂存区到本地仓库中（`message`是一些备注信息）
- `git commit <file1> <file2> ... -m "<message>"`    提交暂存区的指定文件到本地仓库中（`message`是一些备注信息）
- `git commit -a -m "[messaage]"`或`git commit -am "[message]"`    添加到暂存区并提交到本地库（只要在`git commit`时加上`-a`选项，`git`就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过`git add`步骤）

>tips：`git commit`命令将所有通过`git add`暂存的文件内容在数据库中创建一个持久的快照，然后将当前分支上的分支指针移到其之上

#### 版本穿梭

- `git log`    查看版本信息（穿梭到之前的版本后，新的版本将不会显示在`git log`列表中）
- `git reflog`    此命令可以弥补git log穿梭到旧版本后不能查看新版本的缺点，它可以列出所有的版本记录（即使穿梭到了旧版本，也依然可以找到新版本的版本号，从而使用`git reset --hard <commit-id>`穿梭到新版本）
- `git reset --hard <commit-id>`    指定穿梭到版本号对应的版本（可以向前穿梭，也可以向后穿梭，版本号不用写全，写前几位即可）
- 注意：使用此命令穿梭到旧版本后，可以使用`git reflog`找到新版本的版本号，从而再穿梭到新版本
- `git reset --hard HEAD^`    回退到上一个版本
- 注意：在`Git`中，用`HEAD`表示当前版本，上一个版本是`HEAD^`，上上个版本是`HEAD^^`，以此类推......

#### 撤销修改

- `git commit --amend`    用这一次的提交覆盖上一次的提交（如果提交完后发现漏掉了几个文件没有添加，或者提交信息写错了，可以使用此命令）
- `git reset HEAD <file>`(新版用`git restore --staged <file>`)    把暂存区的修改撤销掉（`unstage`），重新放回工作区
- `git checkout -- <file>`(新版用`git restore <file>`)    将文件在工作区的修改全部撤销，这里有两种情况：
  - 第一种是文件自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态
  - 第二种是文件已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态
  - 总之，是让这个文件回到最近一次`git commit`或`git add`时的状态
- 总结：
  - 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- <file>`（旧版）或`git restore <file>`（新版）
  - 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`（旧版）或者`git restore --staged <file>`（新版），就回到了场景1，第二步按场景1操作
  - 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交时，使用`git reset --hard <commit-id>`命令进行版本回退

#### 删除文件

​	一般情况下，通常是直接在文件资源管理器中把没用的文件删了，或者使用`rm`命令进行删除。这个时候，`Git`知道你删除了文件，因此，工作区和版本库就不一致了，`git status`命令会立刻告诉你哪些文件被删除了，现在，有两个选择：

1. 一是确定要从版本库中删除该文件，可以使用`git rm <file>`命令，并且使用`git commit`提交到版本库
2. 另一种情况是删错了，因为版本库中还有呢，因此可以使用`git checkout -- <file>`(旧版)或`git restore <file>`(新版)命令将误删的文件恢复到最新版本

注意：`git checkout -- <file>`(新版用`git restore <file>`)其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以一键还原。但是要小心，只能恢复文件到最新版本，这会丢失最近一次提交后你修改的内容

注意：从来没有被添加到版本库就被删除的文件，是无法恢复的！

> tips：`git rm <file>`命令相当于在工作区中删除文件，并将此次删除操作添加到了暂存区。因此，在`Git`中删除文件只需要两步：`git rm <file>` 和 `git commit -m "<message>"`

补充：

1. 如果要删除之前修改过或已经放到暂存区的文件，则必须使用强制删除选项 `-f`（或`--force`），即`git rm -f <file>`
2. 如何想删除暂存区的文件，但不改变工作区的文件，可以使用命令`git rm --cached <file>`
3. 如果要删除文件夹，则需要使用`-r`参数进行递归删除，即`git rm -r <directory>`。例如`git rm -r src/views/jlbgweb/new/`

#### 远程仓库

1. 要关联一个远程仓库，使用命令`git remote add origin <url>`（例如：`git remote add origin git@github.com:x-f-y/learngit.git`）（注意：关联一个远程仓库时必须给该远程仓库指定一个名字，`origin`是默认习惯命名）
2. 关联后，可以使用命令`git push -u origin master`第一次推送`master`分支的所有内容（第一次推送`master`分支时，加上了`-u`参数，`Git`不但会把本地的`master`分支的内容推送到远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令）
3. 此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改
4. 其他常用命令：
   - `git remote`    列出已关联的每一个远程仓库的名字
   - `git remote -v`    列出已关联的每一个远程仓库的名字以及其对应的`url`
   - `git remote show <remote>`    查看某一个远程仓库的更多信息（`remote`可以是`url`，也可以是通过`git remote add <name> <url>`指定的名字）
   - `git remote rename <oldname> <newname>`    修改一个远程仓库的名字
   - `git remote rm <name>`    解除本地仓库与`name`所对应远程仓库的关联
   - `git fetch <name> <branch>`    拉取，将`name`所指向远程仓库的`branch`分支下的代码下载到本地仓库
   - `git pull <name> <branch>`    拉取合并，拉取`name`所指向远程仓库的`branch`分支下的代码并合并到当前分支

> tips：
>
> 1. `git pull`就是`fetch`和`merge`的简写，`git pull --rebase`就是`fetch`和`rebase`的简写
> 2. 在`Github`或者`Gitee`上创建仓库时，仓库名最好和本地仓库保持一致
> 3. 每次在提交代码之前最好先pull一下，将远程代码合并到本地（这一步若出现冲突则要先解决冲突）。即提交的正确顺序应该是`pull、add、commit、push`

#### 分支管理

##### 常用命令

- `git branch`    获取一个包含当前所有本地分支的列表，当前分支前面会标有一个`*`号
- `git branch --remotes`或`git branch -r`    查看远程所有分支
- `git branch --all`或`git branch -a`    查看本地和远程所有分支
- `git branch -v`    查看每一个分支的最后一次提交
- `git branch <branch>`    创建分支`branch`
- `git branch <branch> <start-point>`    创建分支`branch`，并且该分支的起点是`start-point`所指向的位置，`start-point`可以是一个分支名，一个提交记录的哈希值，或者一个标签
- `git checkout <branch>`(旧版)或者`git switch <branch>`(新版)    切换到分支`branch`
- `git checkout -b <branch>`(旧版)或者`git switch -c <branch>`(新版)    创建分支`branch`并切换到该分支
- `git checkout -b feature C2`(旧版)或者`git switch -c feature C2`(新版)   创建feature分支并切换到该分支，并且该分支的起点是`C2`，注：不指定起点时，默认起点是HEAD所指向的位置
- `git merge <branch>`    把`branch`分支合并到当前分支
- `git branch -d <branch>`    删除分支`branch`（若该分支还包含未合并的内容，则会报错`error: The branch 'xxx' is not fully merged.`）
- `git branch -D <branch>`    强制删除分支`branch`
- `git branch --merged`    列出已合并到当前分支的分支，在这个列表中分支名字前面没有`*`号的分支通常可以使用`git branch -d`删除掉
- `git branch --no-merged`    列出未合并到当前分支的分支
- `git branch --merged <branch>`    列出已合并到`branch`分支的分支
- `git branch --no-merged <branch>`    列出未合并到`branch`分支的分支

> tips：当`Git`无法自动合并分支时，就必须首先解决冲突——把`Git`合并失败的文件手动编辑成我们希望的内容，然后再添加到暂存区、提交到版本库（注意：此时`commit`不能再带有文件名）

##### 分支管理策略

通常，使用命令`git merge <branch>`合并分支时，如果可能，`Git`会用`Fast-forward`模式，但这种模式下，删除分支后，会丢掉分支信息。如果要强制禁用`Fast-forward`模式，`Git`就会在`merge`时生成一个新的`commit`，这样，从分支历史上就可以看出分支信息

```shell
# 使用 Fast-forward 模式
Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (master)
$ git switch -c dev
Switched to a new branch 'dev'

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (dev)
$ vim hello.txt

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (dev)
$ git add hello.txt
warning: in the working copy of 'hello.txt', LF will be replaced by CRLF the next time Git touches it

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (dev)
$ git commit -m "add merge"
[dev 7377975] add merge
 1 file changed, 1 insertion(+)

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (dev)
$ git switch master
Switched to branch 'master'

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (master)
$ git merge dev
Updating a412e2b..7377975
Fast-forward
 hello.txt | 1 +
 1 file changed, 1 insertion(+)
 
Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (master)
$ git branch -d dev
Deleted branch dev (was 7377975).

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (master)
$ git log --graph --pretty=oneline --abbrev-commit
* 7377975 (HEAD -> master, dev) add merge
...

# 禁用 Fast-forward 模式
Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (master)
$ git switch -c dev
Switched to a new branch 'dev'

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (dev)
$ vim hello.txt

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (dev)
$ git add hello.txt

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (dev)
$ git commit -m "add merge"
[dev 34402c2] add merge
 1 file changed, 1 insertion(+)

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (dev)
$ git switch master
Switched to branch 'master'

# --no-ff 参数表示禁用 Fast-forward，因为本次合并要创建一个新的 commit，所以加上 -m 参数，并把 commit 描述写进去
Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (master)
$ git merge --no-ff -m "merge with no-ff" dev
Merge made by the 'ort' strategy.
 hello.txt | 1 +
 1 file changed, 1 insertion(+)

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (master)
$ git branch -d dev
Deleted branch dev (was 34402c2).

Lenovo@DESKTOP-BINDGT9 MINGW64 ~/Desktop/git-test (master)
$ git log --graph --pretty=oneline --abbrev-commit
*   2cc0781 (HEAD -> master) merge with no-ff
|\
| * 34402c2 add merge
|/
* 7377975 add merge
...
```

图形化理解：

使用`Fast-forward`模式合并分支：

![img_2](./images/img_2.png)

禁用`Fast-forward`模式合并分支：

![img_3](./images/img_3.png)

总结：合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`Fast-forward`合并就看不出来曾经做过合并

#### 忽略文件

在`Git`工作区的根目录下创建一个特殊的`.gitignore`文件，然后把要忽略的文件名填进去，`Git`就会自动忽略这些文件，忽略文件的原则是：

1. 忽略操作系统或开发环境（例如`idea`）自动生成的文件，比如缩略图等
2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如`Java`编译产生的`.class`文件
3. 忽略带有敏感信息的配置文件，比如存放口令的配置文件和数据库密码的配置文件等

#### 其他

1. `git log`的常用参数：
   - `--graph`：在日志旁以`ASCII`图形显示分支与合并历史
   - `--pretty=oneline`：一行显示，只显示哈希值和提交说明
   - `--abbrev-commit`：仅显示`SHA-1`校验和的前几个字符，而非所有的`40`个字符
2. 在`Git`中对文件进行改名：
   - `git mv <file_from> <file_to>`
3. `git diff`:
   - `git diff`    若工作区有改动，暂存区不为空，则比较的是工作区与暂存区的共同文件；若工作区有改动，暂存区为空，则比较的是工作区与最后一次提交的本地仓库的共同文件
   - `git diff --staged`或者`git diff --cached`    对比已暂存文件与最后一次提交文件的差异（`--staged`和`--cached`是同义词）
   - 请注意，`git diff`本身只显示尚未暂存的改动，而不是自上次提交以来所做的所有改动。 所以有时候你一下子暂存了所有更新过的文件，`运行 git diff`后却什么也没有，就是这个原因

#### 更多详细教程[点这里](https://www.liaoxuefeng.com/wiki/896043488029600)