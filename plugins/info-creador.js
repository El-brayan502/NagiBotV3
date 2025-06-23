let handler = async (m, { conn }) => {
  // Tu información personalizada
  const ownerNumber = '529516526675';
  const ownerName = 'CARLOS G';
  const ownerLabel = '👑 CREADOR DEL BOT';
  const chatLink = 'https://wa.me/529516526675';
  
  // Creación de la vCard
  let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${ownerName};;;
FN:${ownerName}
ORG:KTS-Bot;
TITLE:${ownerLabel}
item1.TEL;waid=${ownerNumber}:${ownerNumber}
item1.X-ABLabel:${ownerLabel}
X-WA-BIZ-DESCRIPTION:${global.packname || 'Bot de WhatsApp'}
X-WA-BIZ-NAME:${global.namebot || 'KTS-Bot'}
URL:${chatLink}
END:VCARD
`.trim();

  let message = `
*¡Hola ${m.name}!* 👋

Este es mi contacto personal:
📌 *Nombre:* ${ownerName}
📞 *Número:* ${ownerNumber.split('@')[0]}
🔗 *Chat directo:* ${chatLink}

*No dudes en contactarme para cualquier duda o sugerencia sobre el bot.*
`.trim();

  await conn.sendMessage(m.chat, { 
    text: message,
    contacts: {
      displayName: ownerName,
      contacts: [{ vcard }]
    }
  }, { quoted: m });
}

handler.help = ['owner', 'creador', 'dueño'];
handler.tags = ['main'];
handler.command = /^(owner|creador|dueño|propietario)$/i;

export default handler;