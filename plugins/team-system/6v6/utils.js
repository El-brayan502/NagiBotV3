export function formatTeamListMobile(list, listId) {
    const getPlayerName = (jid) => jid ? `@${jid.split('@')[0]}` : '────';
    const isSoporte = (jid) => jid === list.soporte;
    
    let message = `⚔️ **${list.name}**\n`;
    message += `🆔 \`${listId}\`\n\n`;
    
    message += `**👑 TITULARES**\n`;
    list.main.forEach((jid, i) => {
        const player = getPlayerName(jid);
        const roleIcon = isSoporte(jid) ? '🎯' : jid ? '⚡' : '⭕';
        message += `${roleIcon} ${i + 1}. ${player}\n`;
    });
    
    message += `\n**🔄 SUPLENTES**\n`;
    list.subs.forEach((jid, i) => {
        const player = getPlayerName(jid);
        const icon = jid ? '🔄' : '⭕';
        message += `${icon} S${i + 1}. ${player}\n`;
    });
    
    if (list.soporte) {
        message += `\n🎯 **Soporte:** @${list.soporte.split('@')[0]}`;
    }
    
    const filled = (list.main.filter(p => p).length + list.subs.filter(p => p).length);
    message += `\n\n📊 **${filled}/8 jugadores**`;
    
    return message;
}

export async function showAllListsMobile(conn, m, usedPrefix) {
    const lists = Object.entries(global.teamLists);
    
    if (lists.length === 0) {
        const buttons = [
            { buttonId: `${usedPrefix}vv2 Mi Lista`, buttonText: { displayText: '➕ Crear Lista' }, type: 1 }
        ];
        const buttonMessage = {
            text: `🎮 **SISTEMA VV2**\n\nℹ️ No hay listas creadas\n\n💡 Crea tu primera lista para comenzar`,
            footer: `${global.botname} • VV2 System`,
            buttons: buttons,
            headerType: 1
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }
    
    let message = `🎮 **LISTAS VV2 ACTIVAS**\n\n`;
    
    const buttons = [];
    let buttonCount = 0;
    
    for (const [id, list] of lists) {
        const filled = (list.main.filter(p => p).length + list.subs.filter(p => p).length);
        const percentage = Math.round((filled / 8) * 100);
        
        let statusIcon = '🔴';
        if (percentage === 100) {
            statusIcon = '🟢';
        } else if (percentage >= 50) {
            statusIcon = '🟡';
        } else if (percentage > 0) {
            statusIcon = '🟠';
        }
        
        message += `${statusIcon} **${list.name}**\n`;
        message += `🆔 \`${id}\`\n`;
        message += `👥 ${filled}/8 (${percentage}%)\n`;
        message += `👤 @${list.creator.split('@')[0]}\n\n`;
        
        if (buttonCount < 3) {
            buttons.push({
                buttonId: `${usedPrefix}verlista ${id}`,
                buttonText: { displayText: `📋 ${list.name.substring(0, 12)}${list.name.length > 12 ? '...' : ''}` },
                type: 1
            });
            buttonCount++;
        }
    }
    
    const totalPlayers = lists.reduce((acc, [_, list]) => {
        return acc + list.main.filter(p => p).length + list.subs.filter(p => p).length;
    }, 0);
    
    const completeLists = lists.filter(([_, list]) => {
        const filled = list.main.filter(p => p).length + list.subs.filter(p => p).length;
        return filled === 8; 
    }).length;
    
    message += `📊 **ESTADÍSTICAS**\n`;
    message += `📋 Listas: ${lists.length}\n`;
    message += `✅ Completas: ${completeLists}\n`;
    message += `👥 Total jugadores: ${totalPlayers}`;
    
    if (buttons.length < 3) {
        buttons.push({
            buttonId: `${usedPrefix}vv2 Nueva Lista ${Date.now()}`,
            buttonText: { displayText: '➕ Nueva Lista' },
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
        footer: `🕐 ${new Date().toLocaleTimeString()}`,
        buttons: buttons,
        headerType: 1,
        mentions: [...new Set(mentions)] 
    };
    
    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
}

export function formatTeamList(list, listId) {
    return formatTeamListMobile(list, listId);
}