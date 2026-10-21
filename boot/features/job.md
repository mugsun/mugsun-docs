# 定时任务

定时任务基于 PowerJob。管理台负责维护任务，任务由 PowerJob Server 调度，在后端进程里执行。

## 能干什么

- 在「定时任务」页新建任务，选择处理器，设置 CRON 表达式或手动触发，填写任务参数。
- 启用、停用、立即执行一次和删除任务。
- 查看最近的执行实例和状态。
- 在「任务服务」页登记多套 PowerJob Server 地址。

后端自带三个处理器：

- 示例任务 `DemoProcessor`
- 日志清理 `LogCleanProcessor`
- 缓存清理 `CacheEvictProcessor`

埋点模块另带统计和维护任务。

## 怎么开

PowerJob Server 不在默认的 Docker 编排里，需要自己部署。部署后在后端设置以下环境变量：

```bash
POWERJOB_ENABLED=true
POWERJOB_SERVER=127.0.0.1:7700
POWERJOB_APP_NAME=mugsun
POWERJOB_OPENAPI_PASSWORD=你的应用密码
```

`application.yml` 里 `powerjob.worker.enabled` 默认为 false，本地开发时按需改成 true。

## 怎么用

1. 写处理器：实现 PowerJob 的 `BasicProcessor`，注册为 Spring Bean。
2. 重启后端，处理器会出现在「定时任务」页的下拉框里。
3. 新建任务，选择处理器和时间表达式，保存后启用。

只在一个进程里执行、不需要管理台维护的简单任务，可以直接用 Spring 的 `@Scheduled`，见[第一个定时任务](/boot/tutorial/first-job)。

## 注意点

- 保存任务时会检查处理器是否已注册，不能指向不存在的类。
- 定时任务和任务服务页只有平台超管能访问。

## 看效果

PowerJob Server 没有启动时，打开「定时任务」页会提示「定时任务服务暂时连不上」。启动 Server 并登记地址后，列表正常显示。

点某个任务的「执行」后，执行记录里出现一条新实例，状态 5 表示成功，4 表示失败，3 表示运行中。PowerJob Server 的库里也能查到这条实例：

```sql
SELECT instance_id, job_id, status, actual_trigger_time
FROM instance_info
ORDER BY id DESC
LIMIT 5;
```

表名和字段对照 PowerJob 5.1.2 的 `InstanceInfoDO` 核实过，这个版本就是 boot 依赖的版本。

`instance_id` 是执行记录里显示的实例号。`actual_trigger_time` 是毫秒时间戳。

Server 配置了 `oms.table-prefix` 时，表名要加上这个前缀。

上一节：[规则编排](./rule) · 下一节：[报表](./report)
