# AnimeAPI Discord bot starter

A small Discord bot with one slash command, `/anime prompt`, that replies with an anime illustration. It runs on [AnimeAPI](https://animeapi.ai), one of the cheapest anime image APIs: **$0.003 per image**, prepaid balance from $5 that never expires, no subscription. New accounts get 3 free images, no card needed.

**English** · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

Click **Use this template** at the top of the page to get your own copy.

## Run it

You need [Node.js](https://nodejs.org) 20.6 or newer.

```sh
git clone https://github.com/animeapi-ai/discord-bot-starter
cd discord-bot-starter
cp .env.example .env    # then fill in the two values below
npm install && npm start
```

Fill in `.env`:

| Value | Where to get it |
| --- | --- |
| `DISCORD_TOKEN` | [Discord Developer Portal](https://discord.com/developers/applications) → New Application → **Bot** → Reset Token |
| `ANIMEAPI_KEY` | <https://animeapi.ai/dashboard/api-keys> (starts with `ank_`) |

Invite the bot to your server: Developer Portal → **OAuth2 → URL Generator**, tick `bot` and `applications.commands`, give it **Send Messages** and **Attach Files**, and open the generated link.

Then type `/anime a girl with a red umbrella at a rainy bus stop` in your server.

Set `GUILD_ID` (your server's ID) in `.env` to make the command appear at once; without it Discord can take up to an hour to show a new global command.

## What it does

- `/anime prompt:<text> orientation:<portrait|square|landscape>`
- **Safe by default**: NSFW output is off (`ALLOW_NSFW=false`). Flagged images are refused and refunded, not posted.
- **Per-user cooldown**: 30 seconds between images per user (`COOLDOWN_SECONDS`, `0` turns it off).
- **Balance empty**: the bot says so and gives the owner the add-funds link instead of failing silently.
- Rejected prompts show the reason; busy or failed generations are retried once and refunded if they still fail.
- The image is downloaded and uploaded to Discord as a file, so it stays in the channel.

## Settings

All optional, in `.env`:

| Setting | Default | Notes |
| --- | --- | --- |
| `ANIMEAPI_MODEL` | `anime` | `anime` $0.003, `ultra` $0.01, `ultra-max` $0.02 per image |
| `ANIMEAPI_ORIENTATION` | `portrait` | Used when the user does not pick one |
| `ALLOW_NSFW` | `false` | Set `true` only for age-restricted channels you control |
| `COOLDOWN_SECONDS` | `30` | Per user |
| `GUILD_ID` | empty | Register the command in one server immediately |

## Files

```
src/index.js      starts the bot and registers /anime
src/handler.js    what happens when someone runs /anime
src/animeapi.js   the AnimeAPI call, retry and error messages
src/cooldown.js   per-user cooldown
src/config.js     reads .env
```

## Links

- AnimeAPI: <https://animeapi.ai> · [Docs](https://animeapi.ai/docs) · [Discord bot guide](https://animeapi.ai/docs/discord-bot) · [API reference](https://animeapi.ai/docs/api-reference)
- Licence: [MIT](LICENSE)
