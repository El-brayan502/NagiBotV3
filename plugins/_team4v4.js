import { TeamManager } from './team-system/4v4/teamManager.js';
import { formatTeamList } from './team-system/4v4/formatter.js';
import { showAllLists } from './team-system/4v4/listDisplay.js';

global.teamLists = global.teamLists || {};

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
    const teamManager = new TeamManager();
    
    if (command === 'clk') {
        const args = text.trim().split(' ');
        let teamSize = 4;
        let listName = text.trim();
        
        if (args[0] === '6') {
            teamSize = 6;
            listName = args.slice(1).join(' ');
        }
        
        if (!listName) {
            await conn.reply(m.chat, `⚠️ Uso: *${usedPrefix}clk nombre* o *${usedPrefix}clk 6 nombre*`, m);
            return;
        }
        
        const result = await teamManager.createList(listName, teamSize, m.sender);
        if (!result.success) {
            await conn.reply(m.chat, result.message, m);
            return;
        }
        
        const buttons = [
            { buttonId: `${usedPrefix}ver ${result.listId}`, buttonText: { displayText: '📋 Ver' }, type: 1 },
            { buttonId: `${usedPrefix}unir ${result.listId}`, buttonText: { displayText: '👑 Unirme' }, type: 1 },
            { buttonId: `${usedPrefix}sup ${result.listId}`, buttonText: { displayText: '🔄 Suplente' }, type: 1 }
        ];

        const buttonMessage = {
            text: `✅ *Lista "${listName}" creada!*\n\n🆔 \`${result.listId}\`\n📊 ${teamSize}v${teamSize}\n👤 @${m.sender.split('@')[0]}`,
            footer: `${global.botname} • Sistema CLK`,
            buttons: buttons,
            headerType: 1,
            mentions: [m.sender]
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }

    if (command === 'unir') {
        const listId = text.trim();
        const result = await teamManager.joinAsMain(listId, m.sender);
        
        if (!result.success) {
            await conn.reply(m.chat, result.message, m);
            return;
        }
        
        const list = global.teamLists[listId];
        const formattedList = formatTeamList(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        await conn.sendMessage(m.chat, {
            text: `✅ *Unido como titular*\n\n${formattedList}`,
            mentions: mentions
        }, { quoted: m });
        return;
    }

    if (command === 'sup') {
        const listId = text.trim();
        const result = await teamManager.joinAsSub(listId, m.sender);
        
        if (!result.success) {
            await conn.reply(m.chat, result.message, m);
            return;
        }
        
        const list = global.teamLists[listId];
        const formattedList = formatTeamList(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        await conn.sendMessage(m.chat, {
            text: `✅ *Unido como suplente*\n\n${formattedList}`,
            mentions: mentions
        }, { quoted: m });
        return;
    }

    if (command === 'ver') {
        const listId = text.trim();
        if (!listId) {
            return await showAllLists(conn, m, usedPrefix);
        }
        
        const list = global.teamLists[listId];
        if (!list) {
            await conn.reply(m.chat, '❌ Lista no encontrada', m);
            return;
        }
        
        const formattedList = formatTeamList(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        const buttons = [
            { buttonId: `${usedPrefix}unir ${listId}`, buttonText: { displayText: '👑 Titular' }, type: 1 },
            { buttonId: `${usedPrefix}sup ${listId}`, buttonText: { displayText: '🔄 Suplente' }, type: 1 },
            { buttonId: `${usedPrefix}ver`, buttonText: { displayText: '📋 Todas' }, type: 1 }
        ];

        const buttonMessage = {
            text: formattedList,
            footer: `${global.botname} • Sistema CLK`,
            buttons: buttons,
            headerType: 1,
            mentions: mentions
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }

    if (command === 'add') {
        const [listId, ...players] = text.split(' ');
        const result = await teamManager.addPlayers(listId, m.mentionedJid || [], m.sender);
        
        if (!result.success) {
            await conn.reply(m.chat, result.message, m);
            return;
        }
        
        const list = global.teamLists[listId];
        const formattedList = formatTeamList(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        await conn.sendMessage(m.chat, {
            text: `✅ ${result.added} jugador(es) añadidos\n\n${formattedList}`,
            mentions: mentions
        }, { quoted: m });
        return;
    }

    if (command === 'del') {
        const listId = text.trim();
        const result = await teamManager.deleteList(listId, m.sender);
        
        await conn.reply(m.chat, result.message, m);
        return;
    }

    if (command === 'delall') {
        const result = await teamManager.deleteAllLists();
        await conn.reply(m.chat, result.message, m);
        return;
    }
};

handler.help = [
    'clk <nombre> - Crear lista 4v4',
    'clk 6 <nombre> - Crear lista 6v6', 
    'unir <id> - Unirse como titular',
    'sup <id> - Unirse como suplente',
    'ver [id] - Ver lista(s)',
    'add <id> @jugador - Añadir jugador',
    'del <id> - Eliminar lista',
    'delall - Eliminar todas'
];

handler.tags = ['team'];
handler.command = /^(clk|unir|sup|ver|add|del|delall)$/i;
handler.group = true;

export default handler;