import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command }) => {
  let grupos = `*¡Hola! Te invito a unirte a los grupos oficiales del bot para convivir con la comunidad...*

   ╭─━━───╼◈◉◈╾───━━─╮
   │ *『 1. Grupo Oficial 』*
   ├─ ❏ ⚽️ https://chat.whatsapp.com/EdND7QAHE9w0XPYGx2ZfQw
   ╰─━━────────────━━─╯

   ╭─━━───╼◈◉◈╾───━━─╮
   │ *『 Canal Oficial 』*
   ├─ ❏ ⚽️ https://whatsapp.com/channel/0029VbAfBzIKGGGKJWp5tT3L
   ╰─━━────────────━━─╯`

  const catalogo1 = fs.readFileSync('../Dolphin.png')

  await conn.sendFile(m.chat, catalogo1, 'Dolphin.png', grupos, m, rcanal)
  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler