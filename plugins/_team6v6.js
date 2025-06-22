global.teamLists = global.teamLists || {};

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
    if (command === '6v6-320' || command === 'crearlista') {
        const listName = text.trim();
        if (!listName) {
            await conn.reply(m.chat, `⚠️ Debes proporcionar un nombre para la lista.\nEjemplo: *${usedPrefix}6v6-320 KTS VS LS VV2*`, m);
            return;
        }
        
        const listId = listName.toLowerCase().replace(/\s+/g, '-');
        
        if (global.teamLists[listId]) {
            await conn.reply(m.chat, `⚠️ Ya existe una lista con este nombre. Usa un nombre único.`, m);
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
        
        const buttons = [
            { buttonId: `${usedPrefix}verlista ${listId}`, buttonText: { displayText: '📋 Ver Lista' }, type: 1 },
            { buttonId: `${usedPrefix}unirmemain ${listId}`, buttonText: { displayText: '👑 Unirme (Titular)' }, type: 1 },
            { buttonId: `${usedPrefix}unirmesub ${listId}`, buttonText: { displayText: '🔄 Unirme (Suplente)' }, type: 1 }
        ];

        const buttonMessage = {
            text: `✅ *Lista "${listName}" creada exitosamente!*\n\n🆔 ID: \`${listId}\`\n📅 Fecha: ${new Date().toLocaleDateString()}\n👤 Creador: @${m.sender.split('@')[0]}\n\n🎮 *Acciones rápidas:*`,
            footer: `${global.botname} • Sistema de Equipos`,
            buttons: buttons,
            headerType: 1,
            mentions: [m.sender]
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }

    if (command === 'unirmemain') {
        const listId = text.trim();
        const list = global.teamLists[listId];
        
        if (!list) {
            await conn.reply(m.chat, '❌ Lista no encontrada', m);
            return;
        }
        
        if (list.main.includes(m.sender) || list.subs.includes(m.sender)) {
            await conn.reply(m.chat, '⚠️ Ya estás registrado en esta lista', m);
            return;
        }
        
        if (list.main.includes(null)) {
            const emptyIndex = list.main.indexOf(null);
            list.main[emptyIndex] = m.sender;
            
            const updatedList = formatTeamList(list, listId);
            const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
            
            await conn.sendMessage(m.chat, {
                text: `✅ *Te has unido como TITULAR*\n\n${updatedList}`,
                mentions: mentions
            }, { quoted: m });
        } else {
            await conn.reply(m.chat, '❌ No hay espacios disponibles como titular. ¿Quieres unirte como suplente?', m);
        }
        return;
    }

    if (command === 'unirmesub') {
        const listId = text.trim();
        const list = global.teamLists[listId];
        
        if (!list) {
            await conn.reply(m.chat, '❌ Lista no encontrada', m);
            return;
        }
        
        if (list.main.includes(m.sender) || list.subs.includes(m.sender)) {
            await conn.reply(m.chat, '⚠️ Ya estás registrado en esta lista', m);
            return;
        }
        
        if (list.subs.includes(null)) {
            const emptyIndex = list.subs.indexOf(null);
            list.subs[emptyIndex] = m.sender;
            
            const updatedList = formatTeamList(list, listId);
            const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
            
            await conn.sendMessage(m.chat, {
                text: `✅ *Te has unido como SUPLENTE*\n\n${updatedList}`,
                mentions: mentions
            }, { quoted: m });
        } else {
            await conn.reply(m.chat, '❌ No hay espacios disponibles como suplente', m);
        }
        return;
    }

    if (command === 'addplayer') {
        const [listId, ...players] = text.split(' ');
        const list = global.teamLists[listId];
        
        if (!list) {
            await conn.reply(m.chat, '❌ Lista no encontrada. Usa *' + usedPrefix + 'listas* para ver las disponibles', m);
            return;
        }
        
        const mentionedJids = m.mentionedJid || [];
        if (mentionedJids.length === 0) {
            await conn.reply(m.chat, '❌ Debes mencionar al menos un jugador', m);
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
            await conn.reply(m.chat, '❌ No se pudo añadir jugadores. La lista está llena o los jugadores ya están añadidos.', m);
        } else {
            const updatedList = formatTeamList(list, listId);
            const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
            
            await conn.sendMessage(m.chat, {
                text: `✅ ${addedCount} jugador(es) añadidos a *${list.name}*\n\n${updatedList}`,
                mentions: mentions
            }, { quoted: m });
        }
        return;
    }

    if (command === 'verlista' || command === 'lista') {
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
            { buttonId: `${usedPrefix}unirmemain ${listId}`, buttonText: { displayText: '👑 Unirme (Titular)' }, type: 1 },
            { buttonId: `${usedPrefix}unirmesub ${listId}`, buttonText: { displayText: '🔄 Unirme (Suplente)' }, type: 1 },
            { buttonId: `${usedPrefix}listas`, buttonText: { displayText: '📋 Ver Todas' }, type: 1 }
        ];

        const buttonMessage = {
            text: formattedList,
            footer: `${global.botname} • Sistema de Equipos`,
            buttons: buttons,
            headerType: 1,
            mentions: mentions
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }

    if (command === 'listas') {
        return await showAllLists(conn, m, usedPrefix);
    }
    
    if (command === 'soporte') {
        const [listId] = text.split(' ');
        const list = global.teamLists[listId];
        
        if (!list) {
            await conn.reply(m.chat, '❌ Lista no encontrada', m);
            return;
        }
        
        const mentionedJid = m.mentionedJid[0];
        if (!mentionedJid) {
            await conn.reply(m.chat, '❌ Menciona al jugador que será soporte', m);
            return;
        }
        
        if (!list.main.includes(mentionedJid) && !list.subs.includes(mentionedJid)) {
            await conn.reply(m.chat, '❌ Este jugador no está en la lista', m);
            return;
        }
        
        list.soporte = mentionedJid;
        await conn.reply(m.chat, `✅ Rol de soporte asignado a @${mentionedJid.split('@')[0]} en *${list.name}*`, m, {
            mentions: [mentionedJid]
        });
        return;
    }

    if (command === 'eliminarlista') {
        const listId = text.trim();
        if (!listId) {
            await conn.reply(m.chat, `❌ Debes especificar el ID de la lista.\nEjemplo: *${usedPrefix}eliminarlista kts-vs-ls*`, m);
            return;
        }
        
        const list = global.teamLists[listId];
        if (!list) {
            await conn.reply(m.chat, '❌ Lista no encontrada', m);
            return;
        }
        
        if (list.creator !== m.sender) {
            await conn.reply(m.chat, '❌ Solo el creador de la lista puede eliminarla', m);
            return;
        }
        
        delete global.teamLists[listId];
        await conn.reply(m.chat, `✅ Lista *"${list.name}"* eliminada exitosamente`, m);
        return;
    }

    if (command === 'eliminartodas') {
        const listCount = Object.keys(global.teamLists).length;
        if (listCount === 0) {
            await conn.reply(m.chat, 'ℹ️ No hay listas para eliminar', m);
            return;
        }
        
        global.teamLists = {};
        await conn.reply(m.chat, `✅ Se eliminaron *${listCount}* lista(s) exitosamente`, m);
        return;
    }
};

async function showAllLists(conn, m, usedPrefix) {
    const lists = Object.entries(global.teamLists);
    
    if (lists.length === 0) {
        const buttons = [
            { buttonId: `${usedPrefix}6v6-320 Mi Lista`, buttonText: { displayText: '➕ Crear Lista' }, type: 1 }
        ];

        const buttonMessage = {
            text: `╭─「 🎮 *SISTEMA DE EQUIPOS* 🎮 」\n│\n│ ℹ️ No hay listas creadas\n│\n│ 💡 Crea tu primera lista para\n│    comenzar a organizar equipos\n│\n╰─「 📋 Total: 0 listas 」`,
            footer: `${global.botname} • Sistema de Equipos`,
            buttons: buttons,
            headerType: 1
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }
    
    let message = `╭─「 🎮 *LISTAS ACTIVAS* 🎮 」\n`;
    message += `│\n`;
    
    const buttons = [];
    let buttonCount = 0;
    
    for (const [id, list] of lists) {
        const filled = (list.main.filter(p => p).length + list.subs.filter(p => p).length);
        const total = list.main.length + list.subs.length;
        const percentage = Math.round((filled / total) * 100);
        
        let statusIcon = '🔴';
        let statusText = 'Vacía';
        
        if (percentage === 100) {
            statusIcon = '🟢';
            statusText = 'Completa';
        } else if (percentage >= 50) {
            statusIcon = '🟡';
            statusText = 'En progreso';
        } else if (percentage > 0) {
            statusIcon = '🟠';
            statusText = 'Iniciando';
        }
        
        message += `│ ${statusIcon} *${list.name}*\n`;
        message += `│ 🆔 \`${id}\`\n`;
        message += `│ 👥 ${filled}/${total} jugadores (${percentage}%)\n`;
        message += `│ 📅 ${list.createdAt.toLocaleDateString()}\n`;
        message += `│ 👤 @${list.creator.split('@')[0]}\n`;
        
        const mainPlayers = list.main.filter(p => p);
        if (mainPlayers.length > 0) {
            message += `│ 🎮 Titulares: `;
            message += mainPlayers.slice(0, 3).map(jid => `@${jid.split('@')[0]}`).join(', ');
            if (mainPlayers.length > 3) message += `... +${mainPlayers.length - 3}`;
            message += `\n`;
        }
        
        message += `│\n`;
        
        if (buttonCount < 3) {
            buttons.push({
                buttonId: `${usedPrefix}verlista ${id}`,
                buttonText: { displayText: `📋 ${list.name.substring(0, 15)}${list.name.length > 15 ? '...' : ''}` },
                type: 1
            });
            buttonCount++;
        }
    }
    
    message += `├─「 📊 *ESTADÍSTICAS GENERALES* 」\n`;
    message += `│\n`;
    
    const totalPlayers = lists.reduce((acc, [_, list]) => {
        return acc + list.main.filter(p => p).length + list.subs.filter(p => p).length;
    }, 0);
    
    const completeLists = lists.filter(([_, list]) => {
        const filled = list.main.filter(p => p).length + list.subs.filter(p => p).length;
        return filled === 8; 
    }).length;
    
    message += `│ 📋 Total de listas: ${lists.length}\n`;
    message += `│ ✅ Listas completas: ${completeLists}\n`;
    message += `│ 👥 Total jugadores: ${totalPlayers}\n`;
    message += `│ 🎯 Promedio por lista: ${lists.length > 0 ? Math.round(totalPlayers / lists.length) : 0}/8\n`;
    message += `│\n`;
    message += `╰─「 🎮 ${global.botname || 'Bot'} • Sistema de Equipos 」\n\n`;
    
    message += `💡 *Comandos útiles:*\n`;
    message += `• \`${usedPrefix}verlista <id>\` - Ver detalles específicos\n`;
    message += `• \`${usedPrefix}6v6-320 <nombre>\` - Crear nueva lista\n`;
    message += `• \`${usedPrefix}unirmemain <id>\` - Unirse como titular\n`;
    message += `• \`${usedPrefix}unirmesub <id>\` - Unirse como suplente`;
    
    if (buttons.length < 3) {
        buttons.push({
            buttonId: `${usedPrefix}6v6-320 Nueva Lista ${Date.now()}`,
            buttonText: { displayText: '➕ Crear Nueva Lista' },
            type: 1
        });
    }
    
    const mentions = lists.map(([_, list]) => list.creator);
    lists.forEach(([_, list]) => {
        list.main.forEach(jid => { if (jid) mentions.push(jid); });
        list.subs.forEach(jid => { if (jid) mentions.push(jid); });
    });
    
    const buttonMessage = {
        text: message,
        footer: `📊 Actualizado: ${new Date().toLocaleTimeString()}`,
        buttons: buttons,
        headerType: 1,
        mentions: [...new Set(mentions)] 
    };
    
    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
}

function formatTeamList(list, listId) {
    const getPlayerName = (jid) => jid ? `@${jid.split('@')[0]}` : '────';
    const isSoporte = (jid) => jid === list.soporte;
    
    let message = `╭─「 ⚔️ *${list.name.toUpperCase()}* ⚔️ 」\n`;
    message += `│\n`;
    message += `│ 🆔 ID: \`${listId}\`\n`;
    message += `│ 📅 Creada: ${list.createdAt.toLocaleDateString()}\n`;
    message += `│ 👤 Por: @${list.creator.split('@')[0]}\n`;
    message += `│\n`;
    message += `├─「 🟢 *TITULARES* (6/6) 」\n`;
    
    list.main.forEach((jid, i) => {
        const num = String(i + 1).padStart(2, '0');
        const player = getPlayerName(jid);
        const roleIcon = isSoporte(jid) ? '🎯' : '⚡';
        const roleText = isSoporte(jid) ? '(Soporte)' : '';
        
        if (jid) {
            message += `│ ${roleIcon} ${num}. ${player} ${roleText}\n`;
        } else {
            message += `│ ⭕ ${num}. ${player}\n`;
        }
    });
    
    message += `│\n`;
    message += `├─「 🟠 *SUPLENTES* (2/2) 」\n`;
    
    list.subs.forEach((jid, i) => {
        const num = String(i + 1).padStart(2, '0');
        const player = getPlayerName(jid);
        
        if (jid) {
            message += `│ 🔄 S${num}. ${player}\n`;
        } else {
            message += `│ ⭕ S${num}. ${player}\n`;
        }
    });
    
    message += `│\n`;
    message += `├─「 ⚡ *ROLES ESPECIALES* 」\n`;
    
    if (list.soporte) {
        message += `│ 🎯 *Soporte (AWM):* @${list.soporte.split('@')[0]}\n`;
    } else {
        message += `│ 🎯 *Soporte:* Por asignar\n`;
    }
    
    const rushers = list.main.filter(jid => jid && jid !== list.soporte).length;
    message += `│ ⚡ *Rushers:* ${rushers} jugador(es)\n`;
    
    message += `│\n`;
    message += `╰─「 🎮 ${global.botname || 'Bot'} • Sistema de Equipos 」`;
    
    return message;
}

handler.help = [
    '6v6-320 <nombre>', 
    'addplayer <lista> @jugador', 
    'verlista [lista]',
    'soporte <lista> @jugador',
    'unirmemain <lista>',
    'unirmesub <lista>',
    'eliminarlista <lista>',
    'eliminartodas'
].map(v => v + ' - Sistema de equipos');

handler.tags = ['team'];
handler.command = /^(6v6\-320|crearlista|addplayer|verlista|lista|listas|soporte|unirmemain|unirmesub|eliminarlista|eliminartodas)$/i;
handler.group = true;

export default handler;