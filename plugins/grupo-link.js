let handler = async (m, { conn, isBotAdmin }) => {
  try {
    
    if (!isBotAdmin) {
      return m.reply('❌ El bot necesita ser *administrador* para obtener el enlace del grupo.')
    }

    let code = await conn.groupInviteCode(m.chat)
    let link = `https://chat.whatsapp.com/${code}`

    await conn.sendMessage(m.chat, {
      text: `🔗 *ENLACE DEL GRUPO*\n\n${link}`
    }, { quoted: m })

  } catch (e) {
    m.reply('❌ No se pudo obtener el enlace del grupo.')
  }
}

handler.command = ['link', 'enlace']
handler.group = true

export default handler