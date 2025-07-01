export async function createTeamList(m, { conn, text, usedPrefix, command }) {
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
    
    const buttons = [
        { buttonId: `${usedPrefix}verlista ${listId}`, buttonText: { displayText: '📋 Ver Lista' }, type: 1 },
        { buttonId: `${usedPrefix}unirmemain ${listId}`, buttonText: { displayText: '👑 Unirme' }, type: 1 },
        { buttonId: `${usedPrefix}unirmesub ${listId}`, buttonText: { displayText: '🔄 Suplente' }, type: 1 }
    ];
    
    const buttonMessage = {
        text: `✅ Lista VV2 "${listName}" creada!\n\n🆔 \`${listId}\`\n👤 @${m.sender.split('@')[0]}`,
        footer: `${global.botname} • VV2 System`,
        buttons: buttons,
        headerType: 1,
        mentions: [m.sender]
    };
    
    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
}