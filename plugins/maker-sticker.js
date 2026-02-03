import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import fluent from 'fluent-ffmpeg'
import { fileTypeFromBuffer as fromBuffer } from 'file-type'
import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, args }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  let buffer

  try {
    if (/image|video/g.test(mime) && q.download) {
      if (/video/.test(mime) && (q.msg || q).seconds > 11)
        return conn.reply(m.chat, '*ⓘ* El video no puede durar más de *10 segundos*', m, rcanalx)
      buffer = await q.download()
    } else if (args[0] && isUrl(args[0])) {
      const res = await fetch(args[0])
      buffer = await res.buffer()
    } else {
      return conn.reply(m.chat,'*📍 Responde a una imagen o video*', m, rcanal)
    }
    await m.react('🕓')

    const stickers = await toWebp(buffer) 
    let dl_url = await addExif(stickers, global.sticker, global.dev)
    
    await conn.sendFile(m.chat, dl_url, 'sticker.webp', '', m)
    await m.react('✅')
    return
  } catch (e) {
    console.error(e)
    await m.react('✖️')
    return conn.reply(m.chat, '⚠️ Ocurrió un error al crear el sticker.', m)
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']
handler.register = true 

export default handler

async function toWebp(buffer) {
  const { ext } = await fromBuffer(buffer)
  if (!/(png|jpg|jpeg|mp4|mkv|m4p|gif|webp)/i.test(ext)) throw 'Media no compatible.'

  const input = path.join(global.tempDir || './tmp', `${Date.now()}.${ext}`)
  const output = path.join(global.tempDir || './tmp', `${Date.now()}.webp`)
  fs.writeFileSync(input, buffer)

  const scale = `scale='if(gt(iw,ih),512,-1):if(gt(iw,ih),-1,512)'`

  const options = [
    '-vcodec', 'libwebp',
    '-vf', `${scale},fps=15`,
    ...(ext.match(/(mp4|mkv|m4p|gif)/)
      ? ['-loop', '0', '-ss', '00:00:00', '-t', '00:00:10', '-preset', 'default', '-an', '-vsync', '0']
      : [])
  ]

  return new Promise((resolve, reject) => {
    fluent(input)
      .addOutputOptions(options)
      .toFormat('webp')
      .save(output)
      .on('end', () => {
        const result = fs.readFileSync(output)
        fs.unlinkSync(input)
        fs.unlinkSync(output)
        resolve(result)
      })
      .on('error', (err) => {
        fs.unlinkSync(input)
        reject(err)
      })
  })
}

function isUrl(text) {
  return text.match(
    new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi')
  )
}