import { formatTeamListMobile, showAllListsMobile } from './utils.js';

export async function viewList(m, { conn, text, usedPrefix, command, action }) {
    if (action === 'all') {
        return await showAllListsMobile(conn, m, usedPrefix);
    }
    
    if (action === 'single') {
        const listId = text.trim();
        
        if (!listId) {
            return await showAllListsMobile(conn, m, usedPrefix);
        }
        
        const list = global.teamLists[listId];
        if (!list) {
            await conn.reply(m.chat, '❌ Lista no encontrada', m);
            return;
        }
        
        const formattedList = formatTeamListMobile(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        const buttons = [
            { buttonId: `${usedPrefix}unirmemain ${listId}`, buttonText: { displayText: '👑 Unirme' }, type: 1 },
            { buttonId: `${usedPrefix}unirmesub ${listId}`, buttonText: { displayText: '🔄 Suplente' }, type: 1 },
            { buttonId: `${usedPrefix}listas`, buttonText: { displayText: '📋 Todas' }, type: 1 }
        ];
        
        const buttonMessage = {
            text: formattedList,
            footer: `${global.botname} • VV2 System`,
            buttons: buttons,
            headerType: 1,
            mentions: mentions
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
    }
}