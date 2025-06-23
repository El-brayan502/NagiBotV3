import { readFileSync } from 'fs';
import { join } from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    try {
        const imagePath = '../REGLAS-CLK.png'; 
        
        const reglasTexto = `
╭─「 ⚔️ REGLAS CLK 4V4 ⚔️」
│
├─「 🎯 INFORMACIÓN BÁSICA 」
│ 🏪 TIENDA: AVANZADA
│ ❤️ HP: 200
│ 💰 MONEDA: MÁXIMA
│ 🔄 RONDAS: 13
│ 🔫 MUNICIÓN: LIMITADA
│ 📦 AIRDROP: NO
│
├─「 ⚠️ ACLARACIONES IMPORTANTES 」
│
│ 🎮 PRIMERA Y ÚNICA RONDA A DESERT
│
│ ⏰ DATOS 12 MIN ANTES, 5 MIN DE 
│    TOLERANCIA
│
│ 🚫 JUGADOR CON HABILIDAD MALA DEBE
│    ELIMINARSE ANTES DE 2DA RONDA
│
│ 🎯 [7-5] PARA SEGUNDA SALA (SOLO APLICA
│    PARA RIVAL)
│
│ 🔄 2 CAMBIOS EN 4VS4/3 EN 6VS6
│
│ 📊 1 M1014 EN 4VS4/2 EN 6VS6
│
│ 🚁 NO VALE ALTURAS (CARROS
│    CONTENEDORES CAJAS NO CUENTA COMO
│    ALTURA)
│
│ 🗺️ RIM NAM, OBSERVATORY, MILL NO
│    CUENTAN COMO ALTURA
│
│ 📋 7-5 PARA RECLAMAR PUNTOS MEDIOCRE
│    EVIDENCIAS CLARAS
│
│ 🌐 NO SE REPITE SALA SI UN JUGADOR NO
│    ENTRA POR INTERNET
│
│ 🏆 CUENTAS MAYORES NVL 50
│
├─「 🚫 PROHIBICIONES 」
│
│ ❌ QUITAR ADITAMENTOS Y ATRIBUTOS DE ARMA
│ ❌ PODER SOLO DESERT, UMP Y M1014
│ ❌ Personajes específicos (ver imagen)
│
├─「 💪 HABILIDADES PERMITIDAS 」
│
│ ✅ habilidades Permitidas
│ 🎯 **HABILIDAD ACTIVA:**
│    • Únicamente ALOK
│
│ 🛡️ **HABILIDADES PASIVAS:**
│    • MOCO
│    • KELLY
│    • MAXIM
│
├─「 💻 CONFIGURACIÓN TÉCNICA 」
│
│ 🖥️ 2 PC POR EQUIPO
│
╰─「 🎮 ${global.botname || 'Bot'} • Sistema CLK 4v4 」

🔥 **¡PREPÁRATE PARA LA BATALLA CLK!** 🔥

💡 **Comandos útiles:**
• \`${usedPrefix}4v4-clk <nombre>\` - Crear lista de equipo
• \`${usedPrefix}listas4v4\` - Ver todas las listas activas
• \`${usedPrefix}verlista4v4 <id>\` - Ver detalles de una lista

⚠️ **IMPORTANTE:** Estas reglas son oficiales y deben respetarse en todas las partidas CLK 4v4. Cualquier incumplimiento puede resultar en descalificación.

📅 **Última actualización:** ${new Date().toLocaleDateString()}
        `.trim();

        try {
            const imageBuffer = readFileSync(imagePath);
            
            await conn.sendMessage(m.chat, {
                image: imageBuffer,
                caption: reglasTexto,
                footer: `📋 Reglas oficiales CLK 4v4 • ${global.botname}`,
                buttons: [
                    {
                        buttonId: `${usedPrefix}4v4-clk Nueva Lista CLK`,
                        buttonText: { displayText: '🎮 Crear Lista 4v4' },
                        type: 1
                    },
                    {
                        buttonId: `${usedPrefix}listas4v4`,
                        buttonText: { displayText: '📋 Ver Listas Activas' },
                        type: 1
                    },
                    {
                        buttonId: `${usedPrefix}reglas-clk`,
                        buttonText: { displayText: '🔄 Actualizar Reglas' },
                        type: 1
                    }
                ],
                headerType: 4
            }, { quoted: m });
            
        } catch (imageError) {
            console.log('No se pudo cargar la imagen, enviando solo texto:', imageError.message);
            
            const buttonMessage = {
                text: `🖼️ **IMAGEN DE REGLAS NO DISPONIBLE**\n_Consulta la imagen reglas-clk.jpg en el servidor_\n\n${reglasTexto}`,
                footer: `📋 Reglas oficiales CLK 4v4 • ${global.botname}`,
                buttons: [
                    {
                        buttonId: `${usedPrefix}4v4-clk Nueva Lista CLK`,
                        buttonText: { displayText: '🎮 Crear Lista 4v4' },
                        type: 1
                    },
                    {
                        buttonId: `${usedPrefix}listas4v4`,
                        buttonText: { displayText: '📋 Ver Listas Activas' },
                        type: 1
                    },
                    {
                        buttonId: `${usedPrefix}help team`,
                        buttonText: { displayText: '❓ Más Comandos' },
                        type: 1
                    }
                ],
                headerType: 1
            };
            
            await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        
        const resumenRapido = `
╭─「 📋 RESUMEN RÁPIDO CLK 4v4 」
│
│ ⚡ **Lo más importante:**
│ • 🏆 Solo mapas: Desert, UMP, M1014
│ • ⏰ Datos 12min antes, 5min tolerancia  
│ • 🎯 [7-5] para reclamar puntos
│ • 🔄 2 cambios máximo por equipo
│ • 🚫 Sin alturas (carros/cajas OK)
│ • 💰 Moneda máxima, tienda avanzada
│ • ❤️ HP: 200, Rondas: 13
│
╰─「 ⚔️ ¡Que gane el mejor equipo! ⚔️ 」`;
        
        setTimeout(async () => {
            await conn.reply(m.chat, resumenRapido, m);
        }, 2000);
        
    } catch (error) {
        console.error('Error en comando reglas-clk:', error);
        await conn.reply(m.chat, '❌ Error al mostrar las reglas CLK. Intenta nuevamente.', m);
    }
};

handler.help = ['reglas-clk', 'reglasclk', 'rules-clk'].map(v => v + ' - Muestra las reglas oficiales CLK 4v4');
handler.tags = ['team', 'info'];
handler.command = /^(reglas\-clk|reglasclk|rules\-clk|reglas4v4|clk\-rules)$/i;
handler.group = true;

export default handler;