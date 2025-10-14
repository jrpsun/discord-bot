import { getAccountByRiotId, getSummonerByPuuid, getActiveGame } from '../utils/riotApi.js';
import { getSheetData } from '../utils/sheetApi.js';

export async function startGameCommand(interaction) {
  try {
    const summonerInput = interaction.options.getString('summoner');
    
    // แยก Game Name และ Tag (เช่น "Vorpoll#SEA")
    const [gameName, tagLine] = summonerInput.split('#');
    
    if (!gameName || !tagLine) {
      await interaction.reply('❌ กรุณาใส่ชื่อในรูปแบบ: `GameName#TAG` (เช่น Vorpoll#SEA)');
      return;
    }

    await interaction.deferReply();

    // ค้นหา Account ด้วย Riot ID
    const account = await getAccountByRiotId(gameName, tagLine);
    console.log('Account data:', account);
    if (!account) {
      await interaction.editReply(`❌ ไม่พบผู้เล่น: ${summonerInput}`);
      return;
    }

    // ดึงข้อมูล Summoner
    const summoner = await getSummonerByPuuid(account.puuid);
    console.log('summoner data:', summoner);
    if (!summoner) {
      await interaction.editReply(`❌ ไม่พบข้อมูล Summoner สำหรับ: ${summonerInput}`);
      return;
    }

    // ตรวจสอบว่าอยู่ในเกมหรือไม่
    const activeGame = await getActiveGame(account.puuid);
    
    if (activeGame) {
      var gameParticipants = [];
      for (const i of (activeGame?.participants || [])) {
        if (i.riotId === summonerInput) continue;
        console.log(i.riotId);
        gameParticipants.push(i.riotId);
      }

      await interaction.editReply(`✅ ** คนที่อยู่ในเกมกับ ${summonerInput}** \n ${gameParticipants.join('\n')}`);
    } else {
      await interaction.editReply(`⏳ **${summonerInput}** ยังไม่ได้เข้าเกม รอสักครู่...`);
    }

  } catch (error) {
    console.error('Error in startGameCommand:', error);
    await interaction.editReply('❌ เกิดข้อผิดพลาด: ' + error.message);
  }
}