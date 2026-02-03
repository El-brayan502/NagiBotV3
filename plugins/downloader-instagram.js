import axios from 'axios'
import cheerio from 'cheerio'
import qs from 'qs'

async function instagramScraper(url) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

  const data = qs.stringify({ url, lang: 'en' })

  try {
    const res = await axios.post('https://api.instasave.website/media', data, { headers, timeout: 15000 })

    const html = (res.data.match(/innerHTML\s*=\s*"(.+?)";/s)?.[1] || '').replace(/\\"/g, '"')
    const $ = cheerio.load(html)

    const result = []

    $('.download-items').each((_, el) => {
      const downloadUrl = $(el).find('a[title="Download"]').attr('href')
      const isVideo = $(el).find('.format-icon i').attr('class')?.includes('ivideo')
      if (downloadUrl) result.push({ type: isVideo ? 'video' : 'image', url: downloadUrl })
    })

    if (!result.length) throw new Error('No se encontró contenido')
    return result

  } catch (e) {
    throw new Error(e.response?.data || e.message)
  }
}

let handler = async (m, { conn, text }) => {

  if (!text) {
    await m.react('❌️')
    return conn.reply(m.chat, '*📍 Envia un link primero*', m, rcanal)
  }

  if (!/instagram\.com/.test(text))
    return conn.reply(m.chat, '*🚫 El enlace no es válido*', m, rcanal)

  await m.react('🕒')

  try {
    const medias = await instagramScraper(text)

    for (const media of medias) {

      const res = await axios.get(media.url, {
        responseType: 'arraybuffer',
        timeout: 30000,
        headers: { 'User-Agent': 'Mozilla/5.0' }
      })

      const buffer = Buffer.from(res.data)

      if (media.type === 'video') {
        await conn.sendMessage(
          m.chat,
          { video: buffer, caption: '🎬 *Video descargado*' },
          { quoted: m }
        )
      } else {
        await conn.sendMessage(
          m.chat,
          { image: buffer, caption: '🖼️ *Imagen descargada*' },
          { quoted: m }
        )
      }
    }

    await m.react('✅')

  } catch (e) {
    console.error('IG ERROR:', e.message)
    await m.react('❌')
    conn.reply(m.chat, '❌ Error al obtener el contenido de Instagram.', m, rcanal)
  }
}

handler.help = ['instagram <url>', 'ig', 'igdl']
handler.tags = ['downloader']
handler.command = ['instagram', 'ig', 'igdl']
handler.register = true

export default handler