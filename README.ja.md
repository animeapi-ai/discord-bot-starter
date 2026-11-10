# AnimeAPI Discord ボット スターター

スラッシュコマンド `/anime prompt` ひとつでアニメイラストを返す、小さな Discord ボットです。[AnimeAPI](https://animeapi.ai) を利用します。AnimeAPI は最安クラスのアニメ画像 API です：**1 枚 $0.003**、プリペイド残高は $5 から・無期限、サブスクリプションなし。新規アカウントは無料 3 枚、カード不要。

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

ページ上部の **Use this template** から自分用のコピーを作成できます。

## 実行

[Node.js](https://nodejs.org) 20.6 以降が必要です。

```sh
git clone https://github.com/animeapi-ai/discord-bot-starter
cd discord-bot-starter
cp .env.example .env    # 下の 2 つの値を記入
npm install && npm start
```

`.env` に記入：

| 値 | 取得場所 |
| --- | --- |
| `DISCORD_TOKEN` | [Discord Developer Portal](https://discord.com/developers/applications) → New Application → **Bot** → Reset Token |
| `ANIMEAPI_KEY` | <https://animeapi.ai/dashboard/api-keys>（`ank_` で始まる） |

ボットをサーバーに招待：Developer Portal → **OAuth2 → URL Generator** で `bot` と `applications.commands` を選び、**Send Messages** と **Attach Files** を付与して、生成されたリンクを開きます。

サーバーで `/anime 雨のバス停で赤い傘をさす少女` と入力します。

`.env` に `GUILD_ID`（サーバー ID）を設定するとコマンドがすぐに表示されます。未設定の場合、グローバルコマンドの反映に最大 1 時間かかることがあります。

## 機能

- `/anime prompt:<テキスト> orientation:<portrait|square|landscape>`
- AnimeAPI は成人向けコンテンツを生成しません。露骨なプロンプトは拒否され、課金されません。
- **ユーザーごとのクールダウン**：30 秒（`COOLDOWN_SECONDS`、`0` で無効）。
- **残高なし**：ボットがその旨を伝え、チャージ用リンクを案内します。
- 拒否されたプロンプトは理由を表示。混雑・失敗時は 1 回再試行し、それでも失敗した場合は返金されます。
- 画像はダウンロードして Discord にファイルとしてアップロードするため、チャンネルに残ります。

## 設定

すべて任意、`.env` に記入：

| 設定 | 既定 | 説明 |
| --- | --- | --- |
| `ANIMEAPI_MODEL` | `anime` | 1 枚 `anime` $0.003、`ultra` $0.01、`ultra-max` $0.02 |
| `ANIMEAPI_ORIENTATION` | `portrait` | ユーザーが選ばなかった場合に使用 |
| `COOLDOWN_SECONDS` | `30` | ユーザーごと |
| `GUILD_ID` | 空 | 指定サーバーにコマンドを即時登録 |

## リンク

- AnimeAPI：<https://animeapi.ai> · [ドキュメント](https://animeapi.ai/docs) · [API リファレンス](https://animeapi.ai/docs/api-reference)
- ライセンス：[MIT](LICENSE)
