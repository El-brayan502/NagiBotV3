export class TeamManager {
    constructor() {
        if (!global.teamLists) {
            global.teamLists = {};
        }
    }

    async createList(listName, teamSize = 4, creator) {
        const listId = listName.toLowerCase().replace(/\s+/g, '-');
        
        if (global.teamLists[listId]) {
            return {
                success: false,
                message: '⚠️ Ya existe una lista con este nombre'
            };
        }
        
        const subsCount = teamSize === 6 ? 3 : 2;
        
        global.teamLists[listId] = {
            name: listName,
            teamSize: teamSize,
            main: Array(teamSize).fill(null), 
            subs: Array(subsCount).fill(null),  
            creator: creator,
            createdAt: new Date()
        };
        
        return {
            success: true,
            listId: listId,
            message: `✅ Lista "${listName}" creada exitosamente`
        };
    }

    async joinAsMain(listId, userId) {
        const list = global.teamLists[listId];
        
        if (!list) {
            return {
                success: false,
                message: '❌ Lista no encontrada'
            };
        }
        
        if (list.main.includes(userId) || list.subs.includes(userId)) {
            return {
                success: false,
                message: '⚠️ Ya estás registrado en esta lista'
            };
        }
        
        if (list.main.includes(null)) {
            const emptyIndex = list.main.indexOf(null);
            list.main[emptyIndex] = userId;
            
            return {
                success: true,
                message: '✅ Te has unido como titular'
            };
        } else {
            return {
                success: false,
                message: '❌ No hay espacios como titular. ¿Quieres ser suplente?'
            };
        }
    }

    async joinAsSub(listId, userId) {
        const list = global.teamLists[listId];
        
        if (!list) {
            return {
                success: false,
                message: '❌ Lista no encontrada'
            };
        }
        
        if (list.main.includes(userId) || list.subs.includes(userId)) {
            return {
                success: false,
                message: '⚠️ Ya estás registrado en esta lista'
            };
        }
        
        if (list.subs.includes(null)) {
            const emptyIndex = list.subs.indexOf(null);
            list.subs[emptyIndex] = userId;
            
            return {
                success: true,
                message: '✅ Te has unido como suplente'
            };
        } else {
            return {
                success: false,
                message: '❌ No hay espacios como suplente'
            };
        }
    }

    async addPlayers(listId, mentionedJids, requesterId) {
        const list = global.teamLists[listId];
        
        if (!list) {
            return {
                success: false,
                message: '❌ Lista no encontrada'
            };
        }

        if (list.creator !== requesterId) {
            return {
                success: false,
                message: '❌ Solo el creador puede añadir jugadores'
            };
        }
        
        if (mentionedJids.length === 0) {
            return {
                success: false,
                message: '❌ Debes mencionar al menos un jugador'
            };
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
            return {
                success: false,
                message: '❌ No se pudo añadir jugadores. Lista llena o ya están añadidos'
            };
        }

        return {
            success: true,
            added: addedCount,
            message: `✅ ${addedCount} jugador(es) añadidos`
        };
    }

    async deleteList(listId, requesterId) {
        if (!listId) {
            return {
                success: false,
                message: '❌ Debes especificar el ID de la lista'
            };
        }
        
        const list = global.teamLists[listId];
        if (!list) {
            return {
                success: false,
                message: '❌ Lista no encontrada'
            };
        }
        
        if (list.creator !== requesterId) {
            return {
                success: false,
                message: '❌ Solo el creador puede eliminar la lista'
            };
        }
        
        delete global.teamLists[listId];
        return {
            success: true,
            message: `✅ Lista "${list.name}" eliminada`
        };
    }

    async deleteAllLists() {
        const listCount = Object.keys(global.teamLists).length;
        if (listCount === 0) {
            return {
                success: false,
                message: 'ℹ️ No hay listas para eliminar'
            };
        }
        
        global.teamLists = {};
        return {
            success: true,
            message: `✅ Se eliminaron ${listCount} lista(s)`
        };
    }
}