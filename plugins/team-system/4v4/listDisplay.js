import { formatListSummary } from './formatter.js';

export async function showAllLists(conn, m, usedPrefix) {
    const lists = Object.entries(global.teamLists);
    
    if (lists.length === 0) {
        const buttons = [
            { buttonId: `${usedPrefix}clk Mi Lista`, buttonText: { displayText: '➕ Crear Lista' }, type: 1 }
        ];

        const buttonMessage = {
            text: `╭─「 🎮 *SISTEMA CLK* 」\n│ ℹ️ No hay listas\n│ 💡 Crea tu primera lista\n╰─「 📋 Total: 0 」`,
            footer: `${global.botname} • Sistema CLK`,
            buttons: buttons,
            headerType: 1
        };
        
        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }
    
    let message = `╭─「 🎮 *LISTAS CLK* 」\n`;
    
    const buttons = [];
    let buttonCount = 0;
    
    for (const [id, list] of lists.slice(0, 10)) { 
        const summary = formatListSummary(list, id);
        
        message += `│ ${summary.icon} *${list.name}*\n`;
        message += `│ 📊 ${list.teamSize}v${list.teamSize} • ${summary.filled}/${summary.total} (${summary.percentage}%)\n`;
        message += `│ 🆔 \`${id}\`\n`;
        
        const mainPlayers = list.main.filter(p => p);
        if (mainPlayers.length > 0) {
            const playerNames = mainPlayers.slice(0, 2).map(jid => `@${jid.split('@')[0]}`).join(', ');
            const extraCount = mainPlayers.length > 2 ? ` +${mainPlayers.length - 2}` : '';
            message += `│ 👥 ${playerNames}${extraCount}\n`;
        }
        
        message += `│\n`;
        
        if (buttonCount < 3 && summary.percentage > 0) {
            const buttonText = `${summary.icon} ${list.name.substring(0, 12)}${list.name.length > 12 ? '...' : ''}`;
            buttons.push({
                buttonId: `${usedPrefix}ver ${id}`,
                buttonText: { displayText: buttonText },
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
        const total = list.main.length + list.subs.length;
        return filled === total;
    }).length;
    
    message += `├─「 📊 *STATS* 」\n`;
    message += `│ 📋 ${lists.length} listas\n`;
    message += `│ ✅ ${completeLists} completas\n`;
    message += `│ 👥 ${totalPlayers} jugadores\n`;
    message += `╰─「 🎮 CLK 」\n\n`;
    
    message += `💡 *Comandos:*\n`;
    message += `• \`.clk nombre\` - Crear 4v4\n`;
    message += `• \`.clk 6 nombre\` - Crear 6v6\n`;
    message += `• \`.ver id\` - Ver lista\n`;
    message += `• \`.unir id\` - Unirse`;
    
    if (buttons.length < 3) {
        buttons.push({
            buttonId: `${usedPrefix}clk Nueva Lista ${Date.now()}`,
            buttonText: { displayText: '➕ Crear Lista' },
            type: 1
        });
    }
    
    const mentions = [];
    lists.forEach(([_, list]) => {
        mentions.push(list.creator);
        list.main.forEach(jid => { if (jid) mentions.push(jid); });
        list.subs.slice(0, 1).forEach(jid => { if (jid) mentions.push(jid); });
    });
    
    const buttonMessage = {
        text: message,
        footer: `📱 Vista móvil optimizada`,
        buttons: buttons,
        headerType: 1,
        mentions: [...new Set(mentions)]
    };
    
    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
}