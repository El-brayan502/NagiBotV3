import { TeamManager } from './team-system/4v4/teamManager.js';
import { formatTeamList } from './team-system/4v4/formatter.js';
import { showAllLists } from './team-system/4v4/listDisplay.js';

global.teamLists = global.teamLists || {};
global.userButtonState = global.userButtonState || {}; // Rastrear estado de botones por usuario

// Función para generar botones personalizados según el estado del usuario
function generatePersonalizedButtons(listId, userId, usedPrefix, list) {
    const userKey = `${userId}_${listId}`;
    const userState = global.userButtonState[userKey] || {};
    
    const buttons = [];
    
    // Verificar si el usuario ya está en la lista
    const isInMainList = list.main.includes(userId);
    const isInSubList = list.subs.includes(userId);
    const isCreator = list.creator === userId;
    
    // Botón Ver siempre disponible
    if (!userState.hasViewed) {
        buttons.push({
            buttonId: `${usedPrefix}ver ${listId}`,
            buttonText: { displayText: '📋 Ver' },
            type: 1
        });
    }
    
    // Botón Unirse como titular - solo si no está en la lista y hay espacio
    if (!isInMainList && !isInSubList && !userState.hasJoinedMain) {
        const availableMainSlots = list.main.filter(slot => slot === null).length;
        if (availableMainSlots > 0) {
            buttons.push({
                buttonId: `${usedPrefix}unir ${listId}`,
                buttonText: { displayText: '👑 Titular' },
                type: 1
            });
        }
    }
    
    // Botón Suplente - solo si no está en la lista y hay espacio
    if (!isInMainList && !isInSubList && !userState.hasJoinedSub) {
        const availableSubSlots = list.subs.filter(slot => slot === null).length;
        if (availableSubSlots > 0) {
            buttons.push({
                buttonId: `${usedPrefix}sup ${listId}`,
                buttonText: { displayText: '🔄 Suplente' },
                type: 1
            });
        }
    }
    
    // Botón para ver todas las listas
    if (!userState.hasViewedAll) {
        buttons.push({
            buttonId: `${usedPrefix}ver`,
            buttonText: { displayText: '📋 Todas' },
            type: 1
        });
    }
    
    // Botón para salir de la lista si ya está dentro
    if (isInMainList || isInSubList) {
        buttons.push({
            buttonId: `${usedPrefix}leave ${listId}`,
            buttonText: { displayText: '❌ Salir' },
            type: 1
        });
    }
    
    return buttons;
}

// Función para actualizar el estado del botón del usuario
function updateUserButtonState(userId, listId, action) {
    const userKey = `${userId}_${listId}`;
    if (!global.userButtonState[userKey]) {
        global.userButtonState[userKey] = {};
    }
    
    switch (action) {
        case 'viewed':
            global.userButtonState[userKey].hasViewed = true;
            break;
        case 'joinedMain':
            global.userButtonState[userKey].hasJoinedMain = true;
            break;
        case 'joinedSub':
            global.userButtonState[userKey].hasJoinedSub = true;
            break;
        case 'viewedAll':
            global.userButtonState[userKey].hasViewedAll = true;
            break;
        case 'left':
            // Resetear estado cuando sale de la lista
            global.userButtonState[userKey].hasJoinedMain = false;
            global.userButtonState[userKey].hasJoinedSub = false;
            break;
    }
}

// Función para enviar mensaje con botones personalizados a cada usuario
async function sendPersonalizedMessage(conn, chat, listId, baseText, mentions, usedPrefix) {
    const list = global.teamLists[listId];
    if (!list) return;
    
    // Obtener todos los usuarios únicos que podrían interactuar
    const allUsers = new Set([
        ...mentions,
        list.creator,
        ...list.main.filter(jid => jid !== null),
        ...list.subs.filter(jid => jid !== null)
    ]);
    
    // Enviar mensaje base sin botones primero
    await conn.sendMessage(chat, {
        text: baseText,
        mentions: mentions
    });
    
    // Luego enviar botones personalizados (esto es una aproximación, 
    // ya que WhatsApp no permite botones completamente personalizados por usuario)
    const buttons = generatePersonalizedButtons(listId, 'default', usedPrefix, list);
    
    if (buttons.length > 0) {
        const buttonMessage = {
            text: `🎮 *Acciones disponibles:*`,
            footer: `${global.botname} • Sistema CLK`,
            buttons: buttons,
            headerType: 1
        };
        
        await conn.sendMessage(chat, buttonMessage);
    }
}

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
        
        const list = global.teamLists[result.listId];
        const baseText = `✅ *Lista "${listName}" creada!*\n\n🆔 \`${result.listId}\`\n📊 ${teamSize}v${teamSize}\n👤 @${m.sender.split('@')[0]}`;
        
        await sendPersonalizedMessage(conn, m.chat, result.listId, baseText, [m.sender], usedPrefix);
        return;
    }

    if (command === 'unir') {
        const listId = text.trim();
        const result = await teamManager.joinAsMain(listId, m.sender);
        
        if (!result.success) {
            await conn.reply(m.chat, result.message, m);
            return;
        }
        
        // Actualizar estado del usuario
        updateUserButtonState(m.sender, listId, 'joinedMain');
        
        const list = global.teamLists[listId];
        const formattedList = formatTeamList(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        const baseText = `✅ *@${m.sender.split('@')[0]} se unió como titular*\n\n${formattedList}`;
        await sendPersonalizedMessage(conn, m.chat, listId, baseText, [...mentions, m.sender], usedPrefix);
        return;
    }

    if (command === 'sup') {
        const listId = text.trim();
        const result = await teamManager.joinAsSub(listId, m.sender);
        
        if (!result.success) {
            await conn.reply(m.chat, result.message, m);
            return;
        }
        
        // Actualizar estado del usuario
        updateUserButtonState(m.sender, listId, 'joinedSub');
        
        const list = global.teamLists[listId];
        const formattedList = formatTeamList(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        const baseText = `✅ *@${m.sender.split('@')[0]} se unió como suplente*\n\n${formattedList}`;
        await sendPersonalizedMessage(conn, m.chat, listId, baseText, [...mentions, m.sender], usedPrefix);
        return;
    }

    if (command === 'ver') {
        const listId = text.trim();
        if (!listId) {
            updateUserButtonState(m.sender, 'all', 'viewedAll');
            return await showAllLists(conn, m, usedPrefix);
        }
        
        const list = global.teamLists[listId];
        if (!list) {
            await conn.reply(m.chat, '❌ Lista no encontrada', m);
            return;
        }
        
        // Actualizar estado del usuario
        updateUserButtonState(m.sender, listId, 'viewed');
        
        const formattedList = formatTeamList(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        await sendPersonalizedMessage(conn, m.chat, listId, formattedList, mentions, usedPrefix);
        return;
    }

    if (command === 'leave') {
        const listId = text.trim();
        const result = await teamManager.removePlayer(listId, m.sender, m.sender);
        
        if (!result.success) {
            await conn.reply(m.chat, result.message, m);
            return;
        }
        
        // Actualizar estado del usuario
        updateUserButtonState(m.sender, listId, 'left');
        
        const list = global.teamLists[listId];
        const formattedList = formatTeamList(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        const baseText = `✅ *@${m.sender.split('@')[0]} salió de la lista*\n\n${formattedList}`;
        await sendPersonalizedMessage(conn, m.chat, listId, baseText, mentions, usedPrefix);
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
        
        const baseText = `✅ ${result.added} jugador(es) añadidos\n\n${formattedList}`;
        await sendPersonalizedMessage(conn, m.chat, listId, baseText, mentions, usedPrefix);
        return;
    }

    if (command === 'del') {
        const listId = text.trim();
        const result = await teamManager.deleteList(listId, m.sender);
        
        // Limpiar estados de botones para esta lista
        Object.keys(global.userButtonState).forEach(key => {
            if (key.endsWith(`_${listId}`)) {
                delete global.userButtonState[key];
            }
        });
        
        await conn.reply(m.chat, result.message, m);
        return;
    }

    if (command === 'delall') {
        const result = await teamManager.deleteAllLists();
        
        // Limpiar todos los estados de botones
        global.userButtonState = {};
        
        await conn.reply(m.chat, result.message, m);
        return;
    }

    if (command === 'resetbuttons') {
        // Comando para resetear botones (útil para testing)
        global.userButtonState = {};
        await conn.reply(m.chat, '✅ Estados de botones reseteados', m);
        return;
    }
};

handler.help = [
    'clk <nombre> - Crear lista 4v4',
    'clk 6 <nombre> - Crear lista 6v6', 
    'unir <id> - Unirse como titular',
    'sup <id> - Unirse como suplente',
    'ver [id] - Ver lista(s)',
    'leave <id> - Salir de lista',
    'add <id> @jugador - Añadir jugador',
    'del <id> - Eliminar lista',
    'delall - Eliminar todas',
    'resetbuttons - Resetear botones'
];

handler.tags = ['team'];
handler.command = /^(clk|unir|sup|ver|leave|add|del|delall|resetbuttons)$/i;
handler.group = true;

export default handler;