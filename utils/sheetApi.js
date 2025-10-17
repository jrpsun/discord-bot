import 'dotenv/config';

const SHEET_ID = process.env.SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME;

async function getSheetData() {
  const url = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching sheet data:', err);
    throw err;
  }
}

export { getSheetData };    