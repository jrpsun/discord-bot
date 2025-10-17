import fetch from 'node-fetch';
import 'dotenv/config';

const RIOT_API_KEY = process.env.RIOT_API_KEY;

// Debugging logs for API key issues
// console.log('🔑 API Key loaded:', RIOT_API_KEY ? `${RIOT_API_KEY.substring(0, 10)}...` : 'NOT FOUND');
// console.log('🔑 API Key length:', RIOT_API_KEY?.length);

// console.log('========== API KEY DEBUG ==========');
// console.log('Raw key from env:', process.env.RIOT_API_KEY);
// console.log('Key exists:', !!RIOT_API_KEY);
// console.log('Key length:', RIOT_API_KEY?.length);
// console.log('Key starts with RGAPI:', RIOT_API_KEY?.startsWith('RGAPI-'));
// console.log('First 15 chars:', RIOT_API_KEY?.substring(0, 15));
// console.log('Last 4 chars:', RIOT_API_KEY?.slice(-4));
// console.log('Has spaces:', RIOT_API_KEY?.includes(' '));
// console.log('Has quotes:', RIOT_API_KEY?.includes('"') || RIOT_API_KEY?.includes("'"));
// console.log('===================================');

async function testApiKey() {
  try {
    const res = await fetch('https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Faker/KR1', {
      headers: { 'X-Riot-Token': RIOT_API_KEY }
    });
    console.log('✅ API Key test:', res.status, res.statusText);
    return res.ok;
  } catch (error) {
    console.log('❌ API Key test failed:', error.message);
    return false;
  }
}

testApiKey();

// ใช้ Riot ID (Game Name + Tag) แทน Summoner Name
async function getAccountByRiotId(gameName, tagLine) {
  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
  console.log('🔍 Fetching account:', url);
  const res = await fetch(url, {
    headers: { 'X-Riot-Token': RIOT_API_KEY }
  });
  console.log('📡 Account API response:', res.status, res.statusText);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Riot API error: ${res.status} - ${res.statusText}`);
  }
  return await res.json();
}

async function getSummonerByPuuid(puuid) {
  const url = `https://sg2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
  const res = await fetch(url, {
    headers: { 'X-Riot-Token': RIOT_API_KEY }
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ Summoner API Error:', errorText);
    
    if (res.status === 403) {
      throw new Error('API Key ไม่มีสิทธิ์เข้าถึง SEA region - กรุณาสร้าง API Key จาก Account ที่เล่นใน SEA server');
    }
    if (res.status === 404) return null;
    throw new Error(`Riot API error: ${res.status} - ${res.statusText}`);
  }
  return await res.json();
}

// ตรวจสอบว่าอยู่ในเกมหรือไม่ (ใช้ PUUID แทน summonerId)
async function getActiveGame(puuid) {
  const url = `https://sg2.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`;
  const res = await fetch(url, {
    headers: { 'X-Riot-Token': RIOT_API_KEY }
  });
  if (res.status === 404) return null; // ยังไม่อยู่ในเกม
  if (!res.ok) throw new Error(`Riot API error: ${res.status} - ${res.statusText}`);
  return await res.json();
}


// ตรวจสอบข้อมูล Summoner โดยใช้ PUUID
async function getSummonerData(puuid) {
  const url = `https://sg2.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`;
  const res = await fetch(url, {
    headers: { 'X-Riot-Token': RIOT_API_KEY }
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Riot API error: ${res.status} - ${res.statusText}`);
  }
  return await res.json();
}

export { getAccountByRiotId, getSummonerByPuuid, getActiveGame, getSummonerData };