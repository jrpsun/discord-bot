


function randomSong(interaction) {
    const sheetId = "1u1O-XR3FG5EugZIcmrQWoPiApnucnlOZrFJ4RbHR5gQ";
    const sheetName = "mv";
    const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

    const randomIndex = Math.floor(Math.random() * data.length);
    const song = data[randomIndex];
    interaction.reply(`🎵 เพลงที่สุ่มได้: ${song.title} - ${song.artist}\n🔗 ลิงก์: ${song.link}`);
}

export { randomSong };