global.teamLists4v4 = global.teamLists4v4 || {};

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
    if (command === '4v4-clk' || command === 'crearlista4v4') {
        const listName = text.trim();
        if (!listName) {
            await conn.reply(m.chat, `⚠️ Debes proporcionar un nombre para la lista.\nEjemplo: *${usedPrefix}4v4-clk KTS VS LS CLK*`, m);
            return;
        }
        
        const listId = listName.toLowerCase().replace(/\s+/g, '-');
        
        if (global.teamLists4v4[listId]) {
            await conn.reply(m.chat, `⚠️ Ya existe una lista 4v4 con este nombre. Usa un nombre único.`, m);
            return;
        }
        
        global.teamLists4v4[listId] = {
            name: listName,
            main: Array(4).fill(null), 
            subs: Array(2).fill(null),  
            creator: m.sender,
            createdAt: new Date()
        };
        
        const buttons = [
            { buttonId: `${usedPrefix}verlista4v4 ${listId}`, buttonText: { displayText: '📋 Ver Lista' }, type: 1 },
            { buttonId: `${usedPrefix}unirme4v4main ${listId}`, buttonText: { displayText: '👑 Unirme (Titular)' }, type: 1 },
            { buttonId: `${usedPrefix}unirme4v4sub ${listId}`, buttonText: { displayText: '🔄 Unirme (Suplente)' }, type: 1 }
        ];

        const buttonMessage = {
            text: `✅ *Lista 4v4 "${listName}" creada exitosamente!*\n\n🆔 ID: \`${listId}\`\n📅 Fecha: ${new Date().toLocaleDateString()}\n👤 Creador: @${m.sender.split('@')[0]}\n\n🎮 *Acciones rápidas:*`,
            footer: `${global.botname} • Sistema de Equipos 4v4`,
            buttons: buttons,
            headerType: 1,
            mentions: [m.sender]
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }

    if (command === 'unirme4v4main') {
        const listId = text.trim();
        const list = global.teamLists4v4[listId];
        
        if (!list) {
            await conn.reply(m.chat, '❌ Lista 4v4 no encontrada', m);
            return;
        }
        
        if (list.main.includes(m.sender) || list.subs.includes(m.sender)) {
            await conn.reply(m.chat, '⚠️ Ya estás registrado en esta lista 4v4', m);
            return;
        }
        
        if (list.main.includes(null)) {
            const emptyIndex = list.main.indexOf(null);
            list.main[emptyIndex] = m.sender;
            
            const updatedList = formatTeamList4v4(list, listId);
            const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
            
            await conn.sendMessage(m.chat, {
                text: `✅ *Te has unido como TITULAR 4v4*\n\n${updatedList}`,
                mentions: mentions
            }, { quoted: m });
        } else {
            await conn.reply(m.chat, '❌ No hay espacios disponibles como titular. ¿Quieres unirte como suplente?', m);
        }
        return;
    }

    if (command === 'unirme4v4sub') {
        const listId = text.trim();
        const list = global.teamLists4v4[listId];
        
        if (!list) {
            await conn.reply(m.chat, '❌ Lista 4v4 no encontrada', m);
            return;
        }
        
        if (list.main.includes(m.sender) || list.subs.includes(m.sender)) {
            await conn.reply(m.chat, '⚠️ Ya estás registrado en esta lista 4v4', m);
            return;
        }
        
        if (list.subs.includes(null)) {
            const emptyIndex = list.subs.indexOf(null);
            list.subs[emptyIndex] = m.sender;
            
            const updatedList = formatTeamList4v4(list, listId);
            const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
            
            await conn.sendMessage(m.chat, {
                text: `✅ *Te has unido como SUPLENTE 4v4*\n\n${updatedList}`,
                mentions: mentions
            }, { quoted: m });
        } else {
            await conn.reply(m.chat, '❌ No hay espacios disponibles como suplente', m);
        }
        return;
    }

    if (command === 'addplayer4v4') {
        const [listId, ...players] = text.split(' ');
        const list = global.teamLists4v4[listId];
        
        if (!list) {
            await conn.reply(m.chat, '❌ Lista 4v4 no encontrada. Usa *' + usedPrefix + 'listas4v4* para ver las disponibles', m);
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
            const updatedList = formatTeamList4v4(list, listId);
            const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
            
            await conn.sendMessage(m.chat, {
                text: `✅ ${addedCount} jugador(es) añadidos a *${list.name}*\n\n${updatedList}`,
                mentions: mentions
            }, { quoted: m });
        }
        return;
    }

    if (command === 'verlista4v4' || command === 'lista4v4') {
        const listId = text.trim();
        if (!listId) {
            return await showAllLists4v4(conn, m, usedPrefix);
        }
        
        const list = global.teamLists4v4[listId];
        if (!list) {
            await conn.reply(m.chat, '❌ Lista 4v4 no encontrada', m);
            return;
        }
        
        const formattedList = formatTeamList4v4(list, listId);
        const mentions = [...list.main, ...list.subs].filter(jid => jid !== null);
        
        const buttons = [
            { buttonId: `${usedPrefix}unirme4v4main ${listId}`, buttonText: { displayText: '👑 Unirme (Titular)' }, type: 1 },
            { buttonId: `${usedPrefix}unirme4v4sub ${listId}`, buttonText: { displayText: '🔄 Unirme (Suplente)' }, type: 1 },
            { buttonId: `${usedPrefix}listas4v4`, buttonText: { displayText: '📋 Ver Todas' }, type: 1 }
        ];

        const buttonMessage = {
            text: formattedList,
            footer: `${global.botname} • Sistema de Equipos 4v4`,
            buttons: buttons,
            headerType: 1,
            mentions: mentions
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }

    if (command === 'listas4v4') {
        return await showAllLists4v4(conn, m, usedPrefix);
    }

    if (command === 'eliminarlista4v4') {
        const listId = text.trim();
        if (!listId) {
            await conn.reply(m.chat, `❌ Debes especificar el ID de la lista 4v4.\nEjemplo: *${usedPrefix}eliminarlista4v4 kts-vs-ls*`, m);
            return;
        }
        
        const list = global.teamLists4v4[listId];
        if (!list) {
            await conn.reply(m.chat, '❌ Lista 4v4 no encontrada', m);
            return;
        }
        
        if (list.creator !== m.sender) {
            await conn.reply(m.chat, '❌ Solo el creador de la lista 4v4 puede eliminarla', m);
            return;
        }
        
        delete global.teamLists4v4[listId];
        await conn.reply(m.chat, `✅ Lista 4v4 *"${list.name}"* eliminada exitosamente`, m);
        return;
    }

    if (command === 'eliminartodas4v4') {
        const listCount = Object.keys(global.teamLists4v4).length;
        if (listCount === 0) {
            await conn.reply(m.chat, 'ℹ️ No hay listas 4v4 para eliminar', m);
            return;
        }
        
        global.teamLists4v4 = {};
        await conn.reply(m.chat, `✅ Se eliminaron *${listCount}* lista(s) 4v4 exitosamente`, m);
        return;
    }
};

async function showAllLists4v4(conn, m, usedPrefix) {
    const lists = Object.entries(global.teamLists4v4);
    
    if (lists.length === 0) {
        const buttons = [
            { buttonId: `${usedPrefix}4v4-clk Mi Lista CLK`, buttonText: { displayText: '➕ Crear Lista 4v4' }, type: 1 }
        ];

        const buttonMessage = {
            text: `╭─「 🎮 *SISTEMA DE EQUIPOS 4v4* 🎮 」\n│\n│ ℹ️ No hay listas 4v4 creadas\n│\n│ 💡 Crea tu primera lista 4v4 para\n│    comenzar a organizar equipos CLK\n│\n╰─「 📋 Total: 0 listas 4v4 」`,
            footer: `${global.botname} • Sistema de Equipos 4v4`,
            buttons: buttons,
            headerType: 1
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }
    
    let message = `╭─「 🎮 *LISTAS 4V4 ACTIVAS* 🎮 」\n`;
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
                buttonId: `${usedPrefix}verlista4v4 ${id}`,
                buttonText: { displayText: `📋 ${list.name.substring(0, 15)}${list.name.length > 15 ? '...' : ''}` },
                type: 1
            });
            buttonCount++;
        }
    }
    
    message += `├─「 📊 *ESTADÍSTICAS 4V4* 」\n`;
    message += `│\n`;
    
    const totalPlayers = lists.reduce((acc, [_, list]) => {
        return acc + list.main.filter(p => p).length + list.subs.filter(p => p).length;
    }, 0);
    
    const completeLists = lists.filter(([_, list]) => {
        const filled = list.main.filter(p => p).length + list.subs.filter(p => p).length;
        return filled === 6; 
    }).length;
    
    message += `│ 📋 Total de listas 4v4: ${lists.length}\n`;
    message += `│ ✅ Listas completas: ${completeLists}\n`;
    message += `│ 👥 Total jugadores: ${totalPlayers}\n`;
    message += `│ 🎯 Promedio por lista: ${lists.length > 0 ? Math.round(totalPlayers / lists.length) : 0}/6\n`;
    message += `│\n`;
    message += `╰─「 🎮 ${global.botname || 'Bot'} • Sistema de Equipos 4v4 」\n\n`;
    
    message += `💡 *Comandos útiles 4v4:*\n`;
    message += `• \`${usedPrefix}verlista4v4 <id>\` - Ver detalles específicos\n`;
    message += `• \`${usedPrefix}4v4-clk <nombre>\` - Crear nueva lista 4v4\n`;
    message += `• \`${usedPrefix}unirme4v4main <id>\` - Unirse como titular\n`;
    message += `• \`${usedPrefix}unirme4v4sub <id>\` - Unirse como suplente`;
    
    if (buttons.length < 3) {
        buttons.push({
            buttonId: `${usedPrefix}4v4-clk Nueva Lista CLK ${Date.now()}`,
            buttonText: { displayText: '➕ Crear Nueva Lista 4v4' },
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

function formatTeamList4v4(list, listId) {
    const getPlayerName = (jid) => jid ? `@${jid.split('@')[0]}` : '────';
    
    let message = `╭─「 ⚔️ *${list.name.toUpperCase()}* ⚔️ 」\n`;
    message += `│\n`;
    message += `│ 🆔 ID: \`${listId}\`\n`;
    message += `│ 📅 Creada: ${list.createdAt.toLocaleDateString()}\n`;
    message += `│ 👤 Por: @${list.creator.split('@')[0]}\n`;
    message += `│ 🎮 Modalidad: *4v4 CLK*\n`;
    message += `│\n`;
    message += `├─「 🟢 *TITULARES* (4/4) 」\n`;
    
    list.main.forEach((jid, i) => {
        const num = String(i + 1).padStart(2, '0');
        const player = getPlayerName(jid);
        
        if (jid) {
            message += `│ ⚡ ${num}. ${player}\n`;
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
    message += `├─「 ⚡ *INFORMACIÓN DEL EQUIPO* 」\n`;
    
    const filledMain = list.main.filter(p => p).length;
    const filledSubs = list.subs.filter(p => p).length;
    const totalFilled = filledMain + filledSubs;
    
    message += `│ 👑 Titulares: ${filledMain}/4\n`;
    message += `│ 🔄 Suplentes: ${filledSubs}/2\n`;
    message += `│ 📊 Completitud: ${Math.round((totalFilled / 6) * 100)}%\n`;
    message += `│ ⚡ Todos los jugadores tienen el mismo rol\n`;
    message += `│\n`;
    message += `╰─「 🎮 ${global.botname || 'Bot'} • Sistema 4v4 CLK 」`;
    
    return message;
}

handler.help = [
    '4v4-clk <nombre>', 
    'addplayer4v4 <lista> @jugador', 
    'verlista4v4 [lista]',
    'unirme4v4main <lista>',
    'unirme4v4sub <lista>',
    'eliminarlista4v4 <lista>',
    'eliminartodas4v4'
].map(v => v + ' - Sistema de equipos 4v4');

handler.tags = ['team'];
handler.command = /^(4v4\-clk|crearlista4v4|addplayer4v4|verlista4v4|lista4v4|listas4v4|unirme4v4main|unirme4v4sub|eliminarlista4v4|eliminartodas4v4)$/i;
handler.group = true;

export default handler;