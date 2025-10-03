import { championRoles } from '../data/champions.js';
import { roleChallenges } from '../data/challenges.js';

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function playChallenge(interaction) {
  const championNames = Object.keys(championRoles);
  const randomChampion = getRandomItem(championNames);

  const roles = championRoles[randomChampion];
  const randomRole = getRandomItem(roles);

  const type = Math.random() < 0.5 ? 'serious' : 'funny';
  const challenges = roleChallenges[randomRole][type];
  const randomChallenge = getRandomItem(challenges);

  const message = `> **ลุงต๋อยคิดว่า** 🤔 \n  🎭 **Role:** *${randomRole}*  \n  🛡️ **Champion:** *${randomChampion}*  \n  🔥 **Mission:** *${randomChallenge}*`;
  await interaction.reply(message);
}

export { playChallenge };
