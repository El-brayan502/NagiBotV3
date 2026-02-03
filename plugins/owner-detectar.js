import fs from 'fs'
import path from 'path'

let handler = async (m) => {
  try {
    await m.react('🕒')

    const pluginsDir = './plugins'
    const files = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'))

    let text = `🛠️ *DETECTOR DE ERRORES*\n\n`
    let errorFound = false

    for (let file of files) {
      try {
        await import(path.resolve(pluginsDir, file))
      } catch (e) {
        errorFound = true
        let line = e.stack?.match(/:(\d+):\d+/)?.[1] || '¿?'

        text += `❌ *${file}*\n`
        text += `• ${e.message}\n`
        text += `• Línea: ${line}\n\n`
      }
    }

    if (!errorFound) {
      text += '✅ Sin errores de sintaxis'
    }

    await m.reply(text.trim())
    await m.react('✅')

  } catch (e) {
    await m.react('❌')
    await m.reply(`⚠️ Error: ${e.message}`)
  }
}

handler.command = ['detectarsyntax', 'detectar']
handler.tags = ['tools']
handler.help = ['detectar']
handler.rowner = true

export default handler