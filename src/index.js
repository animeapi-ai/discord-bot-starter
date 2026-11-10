// AnimeAPI Discord bot starter. Run: npm start
import { Client, Events, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { handleAnime } from './handler.js';
import { config } from './config.js';

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('DISCORD_TOKEN is missing. Copy .env.example to .env and fill it in.');
  process.exit(1);
}
if (!config.apiKey) console.warn('ANIMEAPI_KEY is missing: /anime will tell users the bot is not set up.');

const command = new SlashCommandBuilder()
  .setName('anime')
  .setDescription('Generate an anime image')
  .addStringOption((option) => option.setName('prompt').setDescription('What to draw, in plain words').setRequired(true).setMaxLength(1000))
  .addStringOption((option) => option.setName('orientation').setDescription('Image shape').addChoices(
    { name: 'portrait', value: 'portrait' },
    { name: 'square', value: 'square' },
    { name: 'landscape', value: 'landscape' },
  ));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (ready) => {
  // Register /anime. With GUILD_ID it appears in that server at once; without it,
  // it is registered everywhere the bot is (Discord can take up to an hour).
  const rest = new REST().setToken(token);
  const route = process.env.GUILD_ID
    ? Routes.applicationGuildCommands(ready.user.id, process.env.GUILD_ID)
    : Routes.applicationCommands(ready.user.id);
  await rest.put(route, { body: [command.toJSON()] });
  console.log(`Ready as ${ready.user.tag}. /anime registered${process.env.GUILD_ID ? ' in your server' : ' globally'}.`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.commandName !== 'anime') return;
  try {
    await handleAnime(interaction);
  } catch (error) {
    console.error(error);
  }
});

client.login(token);
