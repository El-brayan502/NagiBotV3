let handler = async (m, { conn, usedPrefix, command, participants, isAdmin, isBotAdmin }) => {
  const normalize = (jid) => String(jid || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
  const toUserJid = (jid) => {
    const n = normalize(jid)
    return n ? `${n}@s.whatsapp.net` : ''
  }

  if (!m.isGroup) return m.reply('🔱 ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴇs sᴏʟᴏ ᴘᴀʀᴀ ɢʀᴜᴘᴏs.\n> ɴᴀɢɪ ʙᴏᴛ 🔱')
  if (!isAdmin && !m.key.fromMe) return m.reply('🔱 ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴇs sᴏʟᴏ ᴘᴀʀᴀ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs.\n> ɴᴀɢɪ ʙᴏᴛ 🔱')
  if (!isBotAdmin) return m.reply('🔱 ɴᴇᴄᴇsɪᴛᴏ sᴇʀ ᴀᴅᴍɪɴ ᴘᴀʀᴀ ʜᴀᴄᴇʀ ᴇsᴏ.\n> ������� ʙᴏᴛ 🔱')

  let target = (m.mentionedJid && m.mentionedJid[0]) || (m.quoted?.sender) || null
  if (!target) return m.reply('⚜️ ᴅᴇʙᴇs ᴍᴇɴᴄɪᴏɴᴀʀ ᴜɴ ᴜsᴜᴀʀɪᴏ ᴏ ʀᴇsᴘᴏɴᴅᴇʀ ᴀ ᴜɴ ᴍᴇɴsᴀᴊᴇ.\n> ɴᴀɢɪ ʙᴏᴛ 🔱')

  const groupMetadata = await conn.groupMetadata(m.chat)
  const participantsData = groupMetadata.participants || []
  const botId = conn.user?.id || conn.user?.jid || ''
  const botNum = normalize(botId)
  const targetNum = normalize(target)
  const owner = participantsData.find(p => p.admin === 'superadmin')
  const adminNums = new Set(participantsData.filter(p => ['admin', 'superadmin'].includes(p.admin)).map(p => normalize(p.id)))

  if (targetNum && targetNum === botNum) return m.reply('⚠️ ɴᴏ ᴘᴜᴇᴅᴏ ᴇxᴘᴜʟsᴀʀᴍᴇ ᴀ ᴍɪ ᴍɪsᴍᴏ.\n> ɴᴀɢɪ ʙᴏᴛ 🔱')
  if (adminNums.has(targetNum) || (owner && normalize(owner.id) === targetNum)) {
    return m.reply('🚫 ɴᴏ ᴘᴜᴇᴅᴏ ᴇxᴘᴜʟsᴀʀ ᴀ ᴏᴛʀᴏ ᴀᴅᴍɪɴ ɴɪ ᴀʟ ᴄʀᴇᴀᴅᴏʀ.\n> ɴᴀɢɪ ʙᴏᴛ 🔱')
  }

  try {
    
    await conn.groupParticipantsUpdate(m.chat, [toUserJid(target)], 'remove')
  await conn.reply(m.chat, `✅ ᴜsᴜᴀʀɪᴏ @${targetNum} ᴇxᴘᴜʟsᴀᴅᴏ.\n> ɴᴀɢɪ ʙᴏᴛ 🔱`, m, { mentions: [toUserJid(target)] })
  } catch (e) {
  return m.reply(`❌ ᴇʀʀᴏʀ ᴀʟ ᴇxᴘᴜʟsᴀʀ: ${e?.message || e}\n> ɴᴀɢɪ ʙᴏᴛ 🔱`)
  }
}

handler.help = ['kick @usuario', 'kick (responde a un mensaje)']
handler.tags = ['group']
handler.command = ['kick', 'ban', 'hechar']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler