import { createTeamList } from './team-system/6v6/createList.js';
import { joinTeam } from './team-system/6v6/joinTeam.js';
import { viewList } from './team-system/6v6/viewList.js';
import { manageTeam } from './team-system/6v6/manageTeam.js';
import { formatTeamList } from './team-system/6v6/utils.js';

global.teamLists = global.teamLists || {};

let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
    try {
        switch (command) {
            case 'vv2':
            case 'crearlista':
                return await createTeamList(m, { conn, text, usedPrefix, command });
            
            case 'unirmemain':
                return await joinTeam(m, { conn, text, usedPrefix, command, type: 'main' });
            
            case 'unirmesub':
                return await joinTeam(m, { conn, text, usedPrefix, command, type: 'sub' });
            
            case 'addplayer':
                return await manageTeam(m, { conn, text, usedPrefix, command, action: 'add' });
            
            case 'verlista':
            case 'lista':
                return await viewList(m, { conn, text, usedPrefix, command, action: 'single' });
            
            case 'listas':
                return await viewList(m, { conn, text, usedPrefix, command, action: 'all' });
            
            case 'soporte':
                return await manageTeam(m, { conn, text, usedPrefix, command, action: 'support' });
            
            case 'eliminarlista':
                return await manageTeam(m, { conn, text, usedPrefix, command, action: 'delete' });
            
            case 'eliminartodas':
                return await manageTeam(m, { conn, text, usedPrefix, command, action: 'deleteAll' });
            
            default:
                await conn.reply(m.chat, '❌ Comando no reconocido', m);
        }
    } catch (error) {
        console.error('Error en team6v6 handler:', error);
        await conn.reply(m.chat, '❌ Ocurrió un error inesperado', m);
    }
};

handler.help = [
    'vv2 <nombre>', 
    'addplayer <lista> @jugador', 
    'verlista [lista]',
    'soporte <lista> @jugador',
    'unirmemain <lista>',
    'unirmesub <lista>',
    'eliminarlista <lista>',
    'eliminartodas'
].map(v => v + ' - Sistema VV2');

handler.tags = ['team'];
handler.command = /^(vv2|crearlista|addplayer|verlista|lista|listas|soporte|unirmemain|unirmesub|eliminarlista|eliminartodas)$/i;
handler.group = true;

export default handler;