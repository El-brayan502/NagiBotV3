import { formatTeamListMobile } from './utils.js';

export async function joinTeam(m, { conn, text, usedPrefix, command, type }) {
    const listId = text.trim();
    const list = global.teamLists[listId];
    
    if (!list) {
        await conn.reply(m.chat, '❌ Lista no encontrada', m);
        return;
    }
    
    if (list.main.includes(m.sender) || list.subs.includes(m.sender)) {
        await conn.reply(m.chat, '⚠️ Ya estás en esta lista', m);
        return;
    }
    
    if (type === 'main') {
        if (list.main.includes(null)) {
            const emptyIndex = list.main.indexOf(null);
            list.main[emptyIndex] = m.sender;
            
            const updatedList = formatTeamListMobile(list, listId);
            const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
            
            await conn.sendMessage(m.chat, {
                text: `✅ Te uniste como TITULAR\n\n${updatedList}`,
                mentions: mentions
            }, { quoted: m });
        } else {
            await conn.reply(m.chat, '❌ No hay espacios como titular. ¿Quieres ser suplente?', m);
        }
    } else if (type === 'sub') {
        if (list.subs.includes(null)) {
            const emptyIndex = list.subs.indexOf(null);
            list.subs[emptyIndex] = m.sender;
            
            const updatedList = formatTeamListMobile(list, listId);
            const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
            
            await conn.sendMessage(m.chat, {
                text: `✅ Te uniste como SUPLENTE\n\n${updatedList}`,
                mentions: mentions
            }, { quoted: m });
        } else {
            await conn.reply(m.chat, '❌ No hay espacios como suplente', m);
        }
    }
}