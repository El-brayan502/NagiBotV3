import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)
    let whe = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    let perfil = await conn.profilePictureUrl(whe, 'image').catch(_ => 'https://qu.ax/Mvhfa.jpg')

    if (user.registered === true) {
        return m.reply(`💛 𝗬𝗮 𝘁𝗲 𝗲𝗻𝗰𝘂𝗲𝗻𝘁𝗿𝗮𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼.\n\n¿𝗤𝘂𝗶𝗲𝗿𝗲 𝘃𝗼𝗹𝘃𝗲𝗿 𝗮 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘀𝗲?\n\n𝗨𝘀𝗲 𝗲𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝗽𝗮𝗿𝗮 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 𝘀𝘂 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼.\n*${usedPrefix}unreg*`)
    }

    if (!Reg.test(text)) return m.reply(`Eʟ ғᴏʀᴍᴀᴛᴏ ɪɴɢʀᴇsᴀᴅᴏ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴏ\n\nUsᴏ ᴅᴇʟ ᴄᴏᴍᴀɴᴅᴏ: ${usedPrefix + command} 𝗻𝗼𝗺𝗯𝗿𝗲.𝗲𝗱𝗮𝗱\nEᴊᴇᴍᴘʟᴏ : *${usedPrefix + command} ${name2}.14*`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('💛 Eʟ ɴᴏʍ𝗯𝗿𝗲 ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪᴏ.')
    if (!age) return m.reply('💛 Lᴀ ᴇᴅᴀᴅ ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪ́ᴀ.')
    if (name.length >= 100) return m.reply('💛 El nombre es demasiado largo.')

    age = parseInt(age)
    if (age > 1000) return m.reply('*ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*')
    if (age < 5) return m.reply('*ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*')

    user.name = name.trim()
    user.age = age
    user.regTime = +new Date
    user.registered = true
    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].estrellas += 10
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5    

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender;
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    }

    let sn = createHash('md5').update(m.sender).digest('hex')
    let regbot = `┌─⭓ 〘 ʀᴇɢɪsᴛʀᴏ ᴄᴏᴍᴘʟᴇᴛᴏ ‖ 𝘿𝙊𝙇𝙋𝙃𝙄𝙉𝘽𝙊𝙏 〙\n`
regbot += `│\n`
regbot += `│ 𖥔 Nombre: ${name}\n`
regbot += `│ 𖥔 Edad: ${age} años\n`
regbot += `│\n`
regbot += `│ 🎁 Recompensas:\n`
regbot += `│   ├─ ⭐ 15 Estrellas\n`
regbot += `│   ├─ 💰 5 Coins\n`
regbot += `│   ├─ ✨ 245 Exp\n`
regbot += `│   └─ 🧩 12 Tokens\n`
regbot += `│\n`
regbot += `└─➤ Usa *#perfil* para ver tu perfil.`

  await conn.sendMessage(m.chat, {
        text: regbot,
        contextInfo: {
            externalAdReply: {
                title: '𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝘼𝘿𝙊 / 𝘿𝙊𝙇𝙋𝙃𝙄𝙉𝘽𝙊𝙏',
                thumbnailUrl: 'https://qu.ax/UrOqk.jpg',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

/*    await m.react('📪')
  await conn.sendMessage(m.chat, {
           text: regbot, 
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,                      
                containsAutoReply: true,     
                renderLargerThumbnail": true,
                title: '⊱『✅𝆺𝅥 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢(𝗔) 𝆹𝅥✅』⊰',  
                body: dev,  
                containsAutoReply: true,
                showAdAttribution: true,
                mediaType: 1, 
                thumbnailUrl: 'https://qu.ax/YnWMn.jpg' }}}, {quoted: m})
*/

let chtxt = `👤 *𝙪𝙨𝙪𝙖𝙧𝙞𝙤* » ${m.pushName || 'Anónimo'}
🧧 *𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝘾𝙄Ó𝙉* » ${user.name}
🔮 *𝙀𝘿𝘼𝘿* » ${user.age} años
📜 *𝘿𝙀𝙎𝘾𝙍𝙄𝙋𝘾𝙄Ó𝙉* » ${user.descripcion}
📥 *𝘾Ó𝘿𝙄𝙂𝙊 𝘿𝙀 𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝙊* »
⤷ ${sn}`;

    let channelID = '120363312092804854@newsletter';
        await conn.sendMessage(channelID, {
        text: chtxt,
        contextInfo: {
            externalAdReply: {
                title: "【 👑 𝘾Ó𝘿𝙄𝙂𝙊 𝘿𝙀 𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝙊 👑 】",
                body: '𝙽𝚞𝚎𝚟𝚘 𝚌𝚊𝚞𝚜𝚊 𝚎𝚗 𝚖𝚒 𝚋𝚊𝚜𝚎 𝚍𝚎 𝚍𝚊𝚝𝚘𝚜🧸',
                thumbnailUrl: 'perfil',
                sourceUrl: 'redes',
                mediaType: 1,
                showAdAttribution: false,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: null });
};

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler