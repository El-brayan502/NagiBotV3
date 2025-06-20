import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/k4cdwk.jpg';

  if (chat.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `┏━〔 *Bienvenido/a* 〕━┓
┃ Usuario: ${taguser}
┃ Grupo: *${groupMetadata.subject}*
┃
┃ ✨ ¡Pásala genial con todos!
┃ 🛠 Usa *#menu* para ver comandos
┗━━━━━━━━━━━━━━━━━━┛`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `┏━〔 *𝙅𝙖𝙢𝙖𝙨 𝙧𝙚𝙜𝙧𝙚𝙨𝙚𝙨* 〕━┓
┃ Usuario: ${taguser}
┃ Grupo: *${groupMetadata.subject}*
┃
┃  ¡𝙊𝙟𝙖𝙡𝙖 𝙩𝙚 𝙢𝙪𝙚𝙧𝙙𝙖 𝙪𝙣 𝙥𝙚𝙧𝙧𝙤!
┃ 🛠 𝙋𝙪𝙩𝙤 𝙨𝙞 𝙫𝙪𝙚𝙡𝙫𝙚𝙨
┗━━━━━━━━━━━━━━━━━━━━━━━━┛`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}