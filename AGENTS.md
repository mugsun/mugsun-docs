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

推 main 前用 `gh run list --commit <sha>` 核对检查结果。

Docs CI、Security scan、repo-checks 三项都成功后才能推。

把 main 合进分支产生的 merge commit 是新 SHA，同样要先在分支上跑绿。

用 workflow_dispatch 补跑后，要核对补跑的是不是要快进的那个 SHA。

核对命令是 `gh run list --workflow repo-checks --json headSha`。

不 force-push，不加 `--no-verify`，不 rebase 已推送的分支。

改动 `.gitleaks*` 和 `.github/workflows/` 下的文件，必须经安全官审。

### gitleaks allowlist 的规矩

allowlist 写在 `.gitleaks.toml`，只用 `[[allowlists]]`，`condition` 设为 `"AND"`。

每个条目必须写 `targetRules`，只放行指定的规则。

`paths` 写精确路径，用 `^…$` 锚定，不用通配目录。

`regexTarget` 设为 `"secret"`，`regexes` 对整串锚定，只匹配那一个值。

不允许只按路径放行，也不允许按 commit 放行。

合入后当即看 main 上这个 SHA 的 CI，作者自己删除远端分支。

新增或修改 workflow 时，concurrency 按 3.17 写：

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}${{ github.ref == 'refs/heads/main' && format('-{0}', github.sha) || '' }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}
```

依赖基线的检查拿不到基线时，要输出 `::error` 并判失败。

CHANGELOG.md 每行不超过 80 个字符。

CLAUDE.md 是指向 AGENTS.md 的软链，不要改成普通文件。
