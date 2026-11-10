# AnimeAPI Discord 机器人模板

一个只有一条斜杠命令 `/anime prompt` 的小型 Discord 机器人，回复一张动漫插画。由 [AnimeAPI](https://animeapi.ai) 驱动，它是最便宜的动漫图片 API 之一：**每张 $0.003**，预付余额 $5 起、永不过期，无订阅。新账号免费 3 张，无需绑卡。

[English](README.md) · **简体中文** · [日本語](README.ja.md)

点击页面顶部的 **Use this template** 创建你自己的副本。

## 运行

需要 [Node.js](https://nodejs.org) 20.6 或更高版本。

```sh
git clone https://github.com/animeapi-ai/discord-bot-starter
cd discord-bot-starter
cp .env.example .env    # 然后填写下面两个值
npm install && npm start
```

填写 `.env`：

| 值 | 获取方式 |
| --- | --- |
| `DISCORD_TOKEN` | [Discord 开发者后台](https://discord.com/developers/applications) → New Application → **Bot** → Reset Token |
| `ANIMEAPI_KEY` | <https://animeapi.ai/dashboard/api-keys>（以 `ank_` 开头） |

邀请机器人进服务器：开发者后台 → **OAuth2 → URL Generator**，勾选 `bot` 和 `applications.commands`，授予 **Send Messages** 与 **Attach Files** 权限，打开生成的链接。

然后在服务器里输入 `/anime 雨天公交站打着红伞的女孩`。

在 `.env` 中设置 `GUILD_ID`（服务器 ID）可让命令立即出现；否则全局命令最长可能需要一小时生效。

## 功能

- `/anime prompt:<文字> orientation:<portrait|square|landscape>`
- AnimeAPI 不生成成人内容。露骨的提示词会被拒绝，且不收费。
- **每用户冷却**：每位用户两张图之间间隔 30 秒（`COOLDOWN_SECONDS`，`0` 为关闭）。
- **余额不足**：机器人会明确提示，并给出充值链接。
- 提示词被拒绝时显示原因；繁忙或失败会自动重试一次，仍失败则退款。
- 图片会下载后作为文件上传到 Discord，可长期保留在频道里。

## 配置

均为可选，写在 `.env`：

| 配置 | 默认 | 说明 |
| --- | --- | --- |
| `ANIMEAPI_MODEL` | `anime` | 每张 `anime` $0.003、`ultra` $0.01、`ultra-max` $0.02 |
| `ANIMEAPI_ORIENTATION` | `portrait` | 用户未选择时使用 |
| `COOLDOWN_SECONDS` | `30` | 每位用户 |
| `GUILD_ID` | 空 | 立即在指定服务器注册命令 |

## 链接

- AnimeAPI：<https://animeapi.ai> · [文档](https://animeapi.ai/docs) · [API 参考](https://animeapi.ai/docs/api-reference)
- 许可证：[MIT](LICENSE)
