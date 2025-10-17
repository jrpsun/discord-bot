import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { registerCommands } from './commands/registerCommands.js';
import { playChallenge } from './commands/lolChallenge.js';
import { startGameCommand } from './commands/startGame.js';
import 'dotenv/config';


const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;


// สร้าง Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// ประกาศ Slash Commands
registerCommands(CLIENT_ID, GUILD_ID, TOKEN);

// ลงทะเบียนคำสั่งกับ Discord API
const rest = new REST({ version: '10' }).setToken(TOKEN);

// เมื่อบอทออนไลน์
client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

// ตอบกลับ Slash Command
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'challenge') {
  await playChallenge(interaction);
  }

  if (interaction.commandName === 'startgame') {
    await startGameCommand(interaction);
  }

  if (interaction.commandName === 'hello') {
    await interaction.reply("สวัสดี! ฉันคือ ลุงต๋อย จะมาแจกเปาะเปี๋ยะนะ 👋");
  }
});

client.login(TOKEN);

