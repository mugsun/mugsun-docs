# AGENTS.md

本文件是 mugsun 自己的提交规则，不约束外部贡献者，外部贡献者请看 CONTRIBUTING.md。

## 提交身份

新提交的作者和提交者为 `mugsun <bydongxin@gmail.com>`，不再要求使用 noreply 邮箱。

提交时用下面的命令，或在自己的 worktree 里设仓库级 config，不要改全局配置。

```bash
git -c user.name=mugsun -c user.email=bydongxin@gmail.com commit
```

已经推送的历史一律不改写。

## 合入流程

本仓不走 PR。流程是本地提交，经过审查，推到分支，检查全绿后快进 main。

还没审过的提交，不要放在跟踪 main 的分支上，也就是 upstream 为 origin/main 的分支。新开 worktree 时不设跟踪。

推送一律写全 refspec，不用裸 `git push`，也不依赖 upstream：

```bash
git push origin <sha>:refs/heads/<分支>
```

### 推 main 之前

推 main 前要核对完整 SHA 已经审过，审查结论里写的就是这个 SHA。

再用 `gh run list --commit <完整 SHA>` 核对检查结果。短 SHA 可能查不到结果，不算核对。

Docs CI、Security scan、repo-checks 三项都成功后才能推。

把 main 合进分支产生的 merge commit 是新 SHA，同样要先在分支上跑绿。

用 workflow_dispatch 补跑后，要核对补跑的是不是要快进的那个 SHA。

核对命令是 `gh run list --workflow repo-checks --json headSha`。

改动 `.github/` 下任何文件的提交，必须先有安全官签字，才能进 main。改动 `.gitleaks*` 也要经安全官审。

一个 worktree 只给一条工作线用，另开的工作线一律新建自己的 worktree。

推送前用 `git rev-parse HEAD` 对照审过的 SHA，一致才推。

push 被打断时，先用 `git ls-remote` 和 `ps` 确认它没有在后台跑完，再做下一步。

不 force-push，不加 `--no-verify`，不 rebase 已推送的分支。

### 合入之后

合入后当即看 main 上这个 SHA 的 CI，作者自己删除远端分支。

### workflow 与文件约定

新增或修改 workflow 时，concurrency 按 3.17 写：

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}${{ github.ref == 'refs/heads/main' && format('-{0}', github.sha) || '' }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}
```

依赖基线的检查拿不到基线时，要输出 `::error` 并判失败。

CHANGELOG.md 每行不超过 80 个字符。

CLAUDE.md 是指向 AGENTS.md 的软链，不要改成普通文件。

### gitleaks allowlist 的规矩

allowlist 写在 `.gitleaks.toml`，只用 `[[allowlists]]`，`condition` 设为 `"AND"`。

每个条目必须写 `targetRules`，只放行指定的规则。

`paths` 写精确路径，用 `^…$` 锚定，不用通配目录。

`regexTarget` 设为 `"secret"`，`regexes` 对整串锚定，只匹配那一个值。

不允许只按路径放行，也不允许按 commit 放行。
