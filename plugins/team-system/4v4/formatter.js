export function formatTeamList(list, listId) {
    const getPlayerName = (jid) => jid ? `@${jid.split('@')[0]}` : '────';
    
    let message = `╭─「 ⚔️ *${list.name.toUpperCase()}* 」\n`;
    message += `│ 🆔 \`${listId}\`\n`;
    message += `│ 📊 ${list.teamSize}v${list.teamSize}\n`;
    message += `│ 👤 @${list.creator.split('@')[0]}\n`;
    message += `├─「 👑 *TITULARES* 」\n`;
    
    list.main.forEach((jid, i) => {
        const num = String(i + 1).padStart(2, '0');
        const player = getPlayerName(jid);
        const icon = jid ? '⚡' : '⭕';
        message += `│ ${icon} ${num}. ${player}\n`;
    });
    
    message += `├─「 🔄 *SUPLENTES* 」\n`;
    
    list.subs.forEach((jid, i) => {
        const num = String(i + 1).padStart(2, '0');
        const player = getPlayerName(jid);
        const icon = jid ? '🔄' : '⭕';
        message += `│ ${icon} S${num}. ${player}\n`;
    });
    
    const filledMain = list.main.filter(p => p).length;
    const filledSubs = list.subs.filter(p => p).length;
    const totalSlots = list.main.length + list.subs.length;
    const totalFilled = filledMain + filledSubs;
    const percentage = Math.round((totalFilled / totalSlots) * 100);
    
    message += `├─「 📊 *ESTADO* 」\n`;
    message += `│ 👑 ${filledMain}/${list.main.length}\n`;
    message += `│ 🔄 ${filledSubs}/${list.subs.length}\n`;
    message += `│ 📈 ${percentage}%\n`;
    message += `╰─「 🎮 CLK 」`;
    
    return message;
}

export function formatListSummary(list, listId) {
    const filled = list.main.filter(p => p).length + list.subs.filter(p => p).length;
    const total = list.main.length + list.subs.length;
    const percentage = Math.round((filled / total) * 100);
    
    let statusIcon = '🔴';
    if (percentage === 100) statusIcon = '🟢';
    else if (percentage >= 50) statusIcon = '🟡';
    else if (percentage > 0) statusIcon = '🟠';
    
    return {
        icon: statusIcon,
        percentage: percentage,
        filled: filled,
        total: total
    };
}