import axios from 'axios'

const CLIENT_ID = 'bOhNcaq9F32sB3eS8zWLywAyh4OdDXbC'
const BASE_API_URL = 'https://api-v2.soundcloud.com'
const HEADERS = {
  Origin: 'https://soundcloud.com',
  Referer: 'https://soundcloud.com/',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

async function searchTracks(query) {
  try {
    const url = `${BASE_API_URL}/search/tracks`
    const params = {
      q: query,
      client_id: CLIENT_ID,
      limit: 10,
      app_version: '1695286762',
      app_locale: 'en'
    }

    const response = await axios.get(url, { headers: HEADERS, params })
    return response.data.collection
  } catch (error) {
    return []
  }
}

async function resolveStreamUrl(transcodingUrl, trackAuthorization) {
  try {
    const params = {
      client_id: CLIENT_ID,
      track_authorization: trackAuthorization
    }
    const response = await axios.get(transcodingUrl, { headers: HEADERS, params })
    return response.data.url
  } catch (error) {
    return null
  }
}

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  const query = (text?.trim() || args?.join(' ') || '').trim()
  if (!query) return m.reply(`Uso: ${usedPrefix + command} <búsqueda soundcloud>`)

  await conn.sendMessage(m.chat, {
    react: { text: "🕘", key: m.key }
  }).catch(() => {})

  try {
    const tracks = await searchTracks(query)
    const results = []

    for (const track of tracks) {
      if (track.kind !== 'track') continue

      let transcoding = null
      if (track.media && track.media.transcodings) {
        transcoding = track.media.transcodings.find(
          (t) =>
            t.format.protocol === 'progressive' &&
            (t.format.mime_type === 'audio/mpeg' || t.format.mime_type === 'audio/mp3')
        )
      }

      if (transcoding) {
        const streamUrl = await resolveStreamUrl(
          transcoding.url,
          track.track_authorization
        )
        if (streamUrl) {
          results.push({
            title: track.title,
            artwork: track.artwork_url
              ? track.artwork_url.replace('-large', '-t500x500')
              : '',
            url: streamUrl,
            permalink: track.permalink_url
          })
        }
      }

      if (results.length > 0) break
    }

    if (results.length === 0) {
      await conn.sendMessage(m.chat, {
        react: { text: "✖️", key: m.key }
      }).catch(() => {})
      return m.reply('No encontré resultados reproducibles para esa búsqueda.')
    }

    const track = results[0]

    const contextInfo = {
      externalAdReply: {
        title: track.title,
        body: 'SoundCloud Downloader',
        thumbnailUrl: track.artwork || undefined,
        sourceUrl: track.permalink,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: track.url },
        mimetype: 'audio/mpeg',
        contextInfo
      },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, {
      react: { text: "✅", key: m.key }
    }).catch(() => {})
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      react: { text: "✖️", key: m.key }
    }).catch(() => {})
    m.reply(`Error: ${e.message || e}`)
  }
}

handler.help = ['soundcloud <query>']
handler.tags = ['downloader']
handler.command = ['soundcloud', 'sc']

export default handler