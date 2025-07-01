import { formatTeamListMobile } from './utils.js';

export async function manageTeam(m, { conn, text, usedPrefix, command, action }) {
    switch (action) {
        case 'add':
            return await addPlayer(m, { conn, text, usedPrefix });
        case 'support':
            return await setSoporte(m, { conn, text, usedPrefix });
        case 'delete':
            return await deleteList(m, { conn, text, usedPrefix });
        case 'deleteAll':
            return await deleteAllLists(m, { conn, text, usedPrefix });
        default:
            await conn.reply(m.chat, '❌ Acción no válida', m);
    }
}

async function addPlayer(m, { conn, text, usedPrefix }) {
    const [listId, ...players] = text.split(' ');
    const list = global.teamLists[listId];
    
    if (!list) {
        await conn.reply(m.chat, '❌ Lista no encontrada', m);
        return;
    }
    
    const mentionedJids = m.mentionedJid || [];
    if (mentionedJids.length === 0) {
        await conn.reply(m.chat, '❌ Menciona al menos un jugador', m);
        return;
    }
    
    let addedCount = 0;
    for (const jid of mentionedJids) {
        if (list.main.includes(jid) || list.subs.includes(jid)) continue;
        
        if (list.main.includes(null)) {
            const emptyIndex = list.main.indexOf(null);
            list.main[emptyIndex] = jid;
            addedCount++;
        } else if (list.subs.includes(null)) {
            const emptyIndex = list.subs.indexOf(null);
            list.subs[emptyIndex] = jid;
            addedCount++;
        }
    }
    
    if (addedCount === 0) {
        await conn.reply(m.chat, '❌ No se pudo añadir. Lista llena o jugadores ya añadidos.', m);
    } else {
        const updatedList = formatTeamListMobile(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        await conn.sendMessage(m.chat, {
            text: `✅ ${addedCount} jugador(es) añadidos\n\n${updatedList}`,
            mentions: mentions
        }, { quoted: m });
    }
}

async function setSoporte(m, { conn, text, usedPrefix }) {
    const [listId] = text.split(' ');
    const list = global.teamLists[listId];
    
    if (!list) {
        await conn.reply(m.chat, '❌ Lista no encontrada', m);
        return;
    }
    
    const mentionedJid = m.mentionedJid[0];
    if (!mentionedJid) {
        await conn.reply(m.chat, '❌ Menciona al jugador soporte', m);
        return;
    }
    
    if (!list.main.includes(mentionedJid) && !list.subs.includes(mentionedJid)) {
        await conn.reply(m.chat, '❌ Este jugador no está en la lista', m);
        return;
    }
    
    list.soporte = mentionedJid;
    await conn.reply(m.chat, `✅ Soporte: @${mentionedJid.split('@')[0]} en ${list.name}`, m, {
        mentions: [mentionedJid]
    });
}

async function deleteList(m, { conn, text, usedPrefix }) {
    const listId = text.trim();
    if (!listId) {
        await conn.reply(m.chat, `❌ Especifica el ID de la lista`, m);
        return;
    }
    
    const list = global.teamLists[listId];
    if (!list) {
        await conn.reply(m.chat, '❌ Lista no encontrada', m);
        return;
    }
    
    if (list.creator !== m.sender) {
        await conn.reply(m.chat, '❌ Solo el creador puede eliminar la lista', m);
        return;
    }
    
    delete global.teamLists[listId];
    await conn.reply(m.chat, `✅ Lista "${list.name}" eliminada`, m);
}

async function deleteAllLists(m, { conn, text, usedPrefix }) {
    const listCount = Object.keys(global.teamLists).length;
    if (listCount === 0) {
        await conn.reply(m.chat, 'ℹ️ No hay listas para eliminar', m);
        return;
    }
    
    global.teamLists = {};
    await conn.reply(m.chat, `✅ ${listCount} lista(s) eliminadas`, m);
}