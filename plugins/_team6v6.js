import { createTeamList } from './team-system/6v6/createList.js';
import { joinTeam } from './team-system/6v6/joinTeam.js';
import { viewList } from './team-system/6v6/viewList.js';
import { manageTeam } from './team-system/6v6/manageTeam.js';
import { formatTeamList } from './team-system/6v6/utils.js';

global.teamLists = global.teamLists || {};
global.userButtonStateVV2 = global.userButtonStateVV2 || {}; // Rastrear estado de botones por usuario VV2

// Función para generar botones personalizados según el estado del usuario
function generatePersonalizedButtonsVV2(listId, userId, usedPrefix, list) {
    const userKey = `${userId}_${listId}`;
    const userState = global.userButtonStateVV2[userKey] || {};
    
    const buttons = [];
    
    // Verificar si el usuario ya está en la lista
    const isInMainList = list.main.includes(userId);
    const isInSubList = list.subs.includes(userId);
    const isCreator = list.creator === userId;
    
    // Botón Ver Lista siempre disponible
    if (!userState.hasViewed) {
        buttons.push({
            buttonId: `${usedPrefix}verlista ${listId}`,
            buttonText: { displayText: '📋 Ver Lista' },
            type: 1
        });
    }
    
    // Botón Unirse como titular - solo si no está en la lista y hay espacio
    if (!isInMainList && !isInSubList && !userState.hasJoinedMain) {
        const availableMainSlots = list.main.filter(slot => slot === null).length;
        if (availableMainSlots > 0) {
            buttons.push({
                buttonId: `${usedPrefix}unirmemain ${listId}`,
                buttonText: { displayText: '👑 Unirme' },
                type: 1
            });
        }
    }
    
    // Botón Suplente - solo si no está en la lista y hay espacio
    if (!isInMainList && !isInSubList && !userState.hasJoinedSub) {
        const availableSubSlots = list.subs.filter(slot => slot === null).length;
        if (availableSubSlots > 0) {
            buttons.push({
                buttonId: `${usedPrefix}unirmesub ${listId}`,
                buttonText: { displayText: '🔄 Suplente' },
                type: 1
            });
        }
    }
    
    // Botón para ver todas las listas
    if (!userState.hasViewedAll) {
        buttons.push({
            buttonId: `${usedPrefix}listas`,
            buttonText: { displayText: '📋 Todas' },
            type: 1
        });
    }
    
    // Botón para salir de la lista si ya está dentro
    if (isInMainList || isInSubList) {
        buttons.push({
            buttonId: `${usedPrefix}salir ${listId}`,
            buttonText: { displayText: '❌ Salir' },
            type: 1
        });
    }
    
    // Botón para ser soporte si ya está en la lista
    if ((isInMainList || isInSubList) && list.soporte !== userId) {
        buttons.push({
            buttonId: `${usedPrefix}soporte ${listId} @${userId.split('@')[0]}`,
            buttonText: { displayText: '🎯 Soporte' },
            type: 1
        });
    }
    
    return buttons;
}

// Función para actualizar el estado del botón del usuario
function updateUserButtonStateVV2(userId, listId, action) {
    const userKey = `${userId}_${listId}`;
    if (!global.userButtonStateVV2[userKey]) {
        global.userButtonStateVV2[userKey] = {};
    }
    
    switch (action) {
        case 'viewed':
            global.userButtonStateVV2[userKey].hasViewed = true;
            break;
        case 'joinedMain':
            global.userButtonStateVV2[userKey].hasJoinedMain = true;
            break;
        case 'joinedSub':
            global.userButtonStateVV2[userKey].hasJoinedSub = true;
            break;
        case 'viewedAll':
            global.userButtonStateVV2[userKey].hasViewedAll = true;
            break;
        case 'left':
            // Resetear estado cuando sale de la lista
            global.userButtonStateVV2[userKey].hasJoinedMain = false;
            global.userButtonStateVV2[userKey].hasJoinedSub = false;
            break;
    }
}

// Función para enviar mensaje con botones personalizados a cada usuario
async function sendPersonalizedMessageVV2(conn, chat, listId, baseText, mentions, usedPrefix) {
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
    
    // Luego enviar botones personalizados
    const buttons = generatePersonalizedButtonsVV2(listId, 'default', usedPrefix, list);
    
    if (buttons.length > 0) {
        const buttonMessage = {
            text: `🎮 *Acciones disponibles:*`,
            footer: `${global.botname} • VV2 System`,
            buttons: buttons,
            headerType: 1
        };
        
        await conn.sendMessage(chat, buttonMessage);
    }
}

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
    try {
        switch (command) {
            case 'vv2':
            case 'crearlista':
                const listName = text.trim();
                if (!listName) {
                    await conn.reply(m.chat, `⚠️ Proporciona un nombre\nEjemplo: ${usedPrefix}vv2 KTS VS LS`, m);
                    return;
                }
                
                const listId = listName.toLowerCase().replace(/\s+/g, '-');
                if (global.teamLists[listId]) {
                    await conn.reply(m.chat, `⚠️ Ya existe una lista con este nombre`, m);
                    return;
                }
                
                global.teamLists[listId] = {
                    name: listName,
                    main: Array(6).fill(null),
                    subs: Array(2).fill(null),
                    creator: m.sender,
                    createdAt: new Date(),
                    soporte: null
                };
                
                const baseText = `✅ Lista VV2 "${listName}" creada!\n\n🆔 \`${listId}\`\n👤 @${m.sender.split('@')[0]}`;
                await sendPersonalizedMessageVV2(conn, m.chat, listId, baseText, [m.sender], usedPrefix);
                return;

            case 'unirmemain':
                const listIdMain = text.trim();
                const listMain = global.teamLists[listIdMain];
                
                if (!listMain) {
                    await conn.reply(m.chat, '❌ Lista no encontrada', m);
                    return;
                }
                
                if (listMain.main.includes(m.sender) || listMain.subs.includes(m.sender)) {
                    await conn.reply(m.chat, '⚠️ Ya estás en esta lista', m);
                    return;
                }
                
                if (listMain.main.includes(null)) {
                    const emptyIndex = listMain.main.indexOf(null);
                    listMain.main[emptyIndex] = m.sender;
                    
                    // Actualizar estado del usuario
                    updateUserButtonStateVV2(m.sender, listIdMain, 'joinedMain');
                    
                    const updatedList = formatTeamList(listMain, listIdMain);
                    const mentions = [...listMain.main, ...listMain.subs].filter(jid => jid !== null);
                    
                    const baseText = `✅ *@${m.sender.split('@')[0]} se unió como TITULAR*\n\n${updatedList}`;
                    await sendPersonalizedMessageVV2(conn, m.chat, listIdMain, baseText, [...mentions, m.sender], usedPrefix);
                } else {
                    await conn.reply(m.chat, '❌ No hay espacios como titular. ¿Quieres ser suplente?', m);
                }
                return;

            case 'unirmesub':
                const listIdSub = text.trim();
                const listSub = global.teamLists[listIdSub];
                
                if (!listSub) {
                    await conn.reply(m.chat, '❌ Lista no encontrada', m);
                    return;
                }
                
                if (listSub.main.includes(m.sender) || listSub.subs.includes(m.sender)) {
                    await conn.reply(m.chat, '⚠️ Ya estás en esta lista', m);
                    return;
                }
                
                if (listSub.subs.includes(null)) {
                    const emptyIndex = listSub.subs.indexOf(null);
                    listSub.subs[emptyIndex] = m.sender;
                    
                    // Actualizar estado del usuario
                    updateUserButtonStateVV2(m.sender, listIdSub, 'joinedSub');
                    
                    const updatedList = formatTeamList(listSub, listIdSub);
                    const mentions = [...listSub.main, ...listSub.subs].filter(jid => jid !== null);
                    
                    const baseText = `✅ *@${m.sender.split('@')[0]} se unió como SUPLENTE*\n\n${updatedList}`;
                    await sendPersonalizedMessageVV2(conn, m.chat, listIdSub, baseText, [...mentions, m.sender], usedPrefix);
                } else {
                    await conn.reply(m.chat, '❌ No hay espacios como suplente', m);
                }
                return;

            case 'verlista':
            case 'lista':
                const listIdView = text.trim();
                if (!listIdView) {
                    updateUserButtonStateVV2(m.sender, 'all', 'viewedAll');
                    return await viewList(m, { conn, text, usedPrefix, command, action: 'all' });
                }
                
                const listView = global.teamLists[listIdView];
                if (!listView) {
                    await conn.reply(m.chat, '❌ Lista no encontrada', m);
                    return;
                }
                
                // Actualizar estado del usuario
                updateUserButtonStateVV2(m.sender, listIdView, 'viewed');
                
                const formattedList = formatTeamList(listView, listIdView);
                const mentions = [...listView.main, ...listView.subs].filter(jid => jid !== null);
                
                await sendPersonalizedMessageVV2(conn, m.chat, listIdView, formattedList, mentions, usedPrefix);
                return;

            case 'listas':
                updateUserButtonStateVV2(m.sender, 'all', 'viewedAll');
                return await viewList(m, { conn, text, usedPrefix, command, action: 'all' });

            case 'salir':
                const listIdLeave = text.trim();
                const listLeave = global.teamLists[listIdLeave];
                
                if (!listLeave) {
                    await conn.reply(m.chat, '❌ Lista no encontrada', m);
                    return;
                }
                
                let removed = false;
                
                // Remover de main
                const mainIndex = listLeave.main.indexOf(m.sender);
                if (mainIndex !== -1) {
                    listLeave.main[mainIndex] = null;
                    removed = true;
                }
                
                // Remover de subs
                const subIndex = listLeave.subs.indexOf(m.sender);
                if (subIndex !== -1) {
                    listLeave.subs[subIndex] = null;
                    removed = true;
                }
                
                // Remover de soporte si lo era
                if (listLeave.soporte === m.sender) {
                    listLeave.soporte = null;
                }
                
                if (!removed) {
                    await conn.reply(m.chat, '⚠️ No estás en esta lista', m);
                    return;
                }
                
                // Actualizar estado del usuario
                updateUserButtonStateVV2(m.sender, listIdLeave, 'left');
                
                const updatedListLeave = formatTeamList(listLeave, listIdLeave);
                const mentionsLeave = [...listLeave.main, ...listLeave.subs].filter(jid => jid !== null);
                
                const baseTextLeave = `✅ *@${m.sender.split('@')[0]} salió de la lista*\n\n${updatedListLeave}`;
                await sendPersonalizedMessageVV2(conn, m.chat, listIdLeave, baseTextLeave, mentionsLeave, usedPrefix);
                return;

            case 'addplayer':
                return await manageTeam(m, { conn, text, usedPrefix, command, action: 'add' });

            case 'soporte':
                return await manageTeam(m, { conn, text, usedPrefix, command, action: 'support' });

            case 'eliminarlista':
                const listIdDelete = text.trim();
                const result = await manageTeam(m, { conn, text, usedPrefix, command, action: 'delete' });
                
                // Limpiar estados de botones para esta lista
                Object.keys(global.userButtonStateVV2).forEach(key => {
                    if (key.endsWith(`_${listIdDelete}`)) {
                        delete global.userButtonStateVV2[key];
                    }
                });
                return;

            case 'eliminartodas':
                await manageTeam(m, { conn, text, usedPrefix, command, action: 'deleteAll' });
                
                // Limpiar todos los estados de botones
                global.userButtonStateVV2 = {};
                return;

            case 'resetbuttonsvv2':
                // Comando para resetear botones VV2 (útil para testing)
                global.userButtonStateVV2 = {};
                await conn.reply(m.chat, '✅ Estados de botones VV2 reseteados', m);
                return;

            default:
                await conn.reply(m.chat, '❌ Comando no reconocido', m);
        }
    } catch (error) {
        console.error('Error en team6v6 handler:', error);
        await conn.reply(m.chat, '❌ Ocurrió un error inesperado', m);
    }
};

handler.help = [
    'vv2 <nombre> - Crear lista VV2',
    'addplayer <lista> @jugador - Añadir jugador',
    'verlista [lista] - Ver lista(s)',
    'soporte <lista> @jugador - Asignar soporte',
    'unirmemain <lista> - Unirse como titular',
    'unirmesub <lista> - Unirse como suplente',
    'salir <lista> - Salir de lista',
    'eliminarlista <lista> - Eliminar lista',
    'eliminartodas - Eliminar todas',
    'resetbuttonsvv2 - Resetear botones'
];

handler.tags = ['team'];
handler.command = /^(vv2|crearlista|addplayer|verlista|lista|listas|soporte|unirmemain|unirmesub|salir|eliminarlista|eliminartodas|resetbuttonsvv2)$/i;
handler.group = true;

export default handler;