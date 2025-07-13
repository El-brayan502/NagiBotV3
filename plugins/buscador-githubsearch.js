import fetch from 'node-fetch'
import MessageType from '@whiskeysockets/baileys'

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `🚩 *Ingrese el nombre de un repositorio de GitHub*\n\nEjemplo: ${usedPrefix + command} Ai-Yaemori`, m, rcanal)

    try {
        await m.react('🍇')
        const res = await fetch(global.API('https://api.github.com', '/search/repositories', { q: text }))
        const json = await res.json()

        if (res.status !== 200) throw json

        let str = json.items.map((repo, index) => {
            return `
• 🍟 Resultado: ${1 + index}
• 📦 Link: ${repo.html_url}
• 👤 Creador: ${repo.owner.login}
• 🐣 Nombre: ${repo.name}
• 📅 Creado: ${formatDate(repo.created_at)}
• ⏰ Actualizado: ${formatDate(repo.updated_at)}
• 👁 Visitas: ${repo.watchers}
• 🍴 Bifurcado: ${repo.forks}
• ⭐ Estrellas: ${repo.stargazers_count}
• 🧩 Issues: ${repo.open_issues}
• 🎐 Descripción: ${repo.description ? `${repo.description}` : 'Sin Descripción'}
• ♻️ Clone: ${repo.clone_url}
            `.trim()
        }).join('\n\n─────────────────\n\n')

        var doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document']
        var document = doc[Math.floor(Math.random() * doc.length)]

        let buttonMessage = {
            document: { url: `https://github.com/El-brayan502` },
            mimetype: `application/${document}`,
            fileName: `DOLPHIN Bot`,
            fileLength: 99999999999999,
            pageCount: 200,
            contextInfo: {
                forwardingScore: 200,
                isForwarded: true,
                externalAdReply: {
                    mediaUrl: 'https://github.com/El-brayan502,
                    mediaType: 2,
                    previewType: 'pdf',
                    title: `• Resultados Encontrados🔎`,
                    body: 'Desarrollado por Brayan330,
                    thumbnail: catalogo,
                    sourceUrl: 'https://wa.me/50231458537'
                }
            },
            caption: str,
            footer: `• 𝚂𝙸 𝙳𝙴𝚂𝙴𝙰 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝚄𝙽\n*𝚁𝙴𝙿𝙾𝚂𝙸𝚃𝙾𝚁𝙸𝙾 𝙳𝙴 𝙶𝙸𝚃𝙷𝚄𝙱*\n*𝙴𝚂𝙲𝚁𝙸𝙱𝙰 ${usedPrefix}gitclone <LINK>*`,
        }

        await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
        await m.react('✅')
    } catch {
        await m.react('❌')
        conn.reply(m.chat, '🚩 *No se encontraron resultados para:* ' + text, m)
    }
}

handler.help = ['githubsearch']
handler.tags = ['buscador']
handler.command = ['githubsearch']
handler.register = true

export default handler 

function formatDate(n, locale = 'es') {
    const d = new Date(n)
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}