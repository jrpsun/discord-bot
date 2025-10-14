import { REST, Routes, SlashCommandBuilder } from 'discord.js';

async function registerCommands(clientId, guildId, token) {
  const commands = [
    new SlashCommandBuilder()
      .setName('challenge')
      .setDescription('สุ่ม LoL Daily Challenge'),
    new SlashCommandBuilder()
      .setName('hello')
      .setDescription('ทักบอท'),
    new SlashCommandBuilder()
      .setName('startgame')
      .setDescription('ตรวจสอบว่าผู้เล่นอยู่ในเกมหรือไม่')
      .addStringOption(option => option.setName('summoner').setDescription('ชื่อ Summoner').setRequired(true))
  ].map(cmd => cmd.toJSON());

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log('⌛ Registering slash commands...');
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log('✅ Slash commands registered!');
  } catch (err) {
    console.error(err);
  }
}

export { registerCommands };
