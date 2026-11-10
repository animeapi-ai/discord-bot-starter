import { AttachmentBuilder, MessageFlags } from 'discord.js';
import { generateImage, downloadImage, describeError } from './animeapi.js';
import { config, ORIENTATIONS } from './config.js';
import * as cooldown from './cooldown.js';

/** Handles one /anime interaction. */
export async function handleAnime(interaction) {
  const prompt = interaction.options.getString('prompt', true).trim().slice(0, 1000);
  const chosen = interaction.options.getString('orientation');
  const orientation = ORIENTATIONS.includes(chosen) ? chosen : config.orientation;
  const userId = interaction.user.id;

  if (!config.apiKey) {
    return interaction.reply({ content: 'This bot has no AnimeAPI key yet. Bot owner: set ANIMEAPI_KEY (get one at https://animeapi.ai/dashboard/api-keys).', flags: MessageFlags.Ephemeral });
  }
  if (cooldown.isBusy(userId)) {
    return interaction.reply({ content: 'Your previous image is still being drawn.', flags: MessageFlags.Ephemeral });
  }
  const wait = cooldown.secondsLeft(userId, config.cooldownSeconds);
  if (wait > 0) {
    return interaction.reply({ content: `Please wait ${wait}s before generating another image.`, flags: MessageFlags.Ephemeral });
  }

  cooldown.start(userId);
  let succeeded = false;
  try {
    await interaction.deferReply(); // generation takes a few seconds
    const result = await generateImage({
      apiKey: config.apiKey,
      prompt,
      model: config.model,
      orientation,
      allowNSFW: config.allowNSFW,
    });
    const image = await downloadImage(result.image_url);
    const file = new AttachmentBuilder(image.buffer, { name: `anime.${image.extension}`, description: prompt.slice(0, 1000) });
    await interaction.editReply({ content: `**${prompt.slice(0, 200)}**`, files: [file] });
    succeeded = true;
    console.log(`image for ${userId} in ${result.generation_time_ms}ms, balance $${Number(result.balance_usd).toFixed(3)}`);
  } catch (error) {
    console.warn('generation failed:', error.status ?? '', error.code ?? '', error.message);
    const content = describeError(error);
    if (interaction.deferred || interaction.replied) await interaction.editReply({ content });
    else await interaction.reply({ content, flags: MessageFlags.Ephemeral });
  } finally {
    cooldown.finish(userId, succeeded);
  }
}
