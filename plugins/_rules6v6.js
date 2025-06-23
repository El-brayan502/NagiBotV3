import { readFileSync } from 'fs';
import { join } from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    try {
        const imagePath = '../REGLAS-VV2.png'; 
        
        const reglasTexto = `
╭─「 ⚔️ REGLAS KTS VV2 COMPETITIVO ⚔️」
│
├─「 🔫 ARMAS PERMITIDAS 」
│
│ ✅ **MINI UZI**
│ ✅ **WOODPEKER** 
│ ✅ **AWM** (1 soporte máximo)
│ ✅ **M1887**
│ ✅ **M590** (2 por equipo máximo)
│ ✅ **TROGON**
│ ✅ **MP40**
│
├─「 🚫 PROHIBICIONES ESTRICTAS 」
│
│ ❌ **USO DE OTHO Y WOLFRAHH**
│ ❌ **USO DE GRANADAS**
│ ❌ **ARMAS QUE NO ESTÁN MENCIONADAS**
│ ❌ **USO DE MASCOTA DRAKI**
│ ❌ **USO DE ARCHIVOS O HAKS**
│
├─「 💪 HABILIDADES PERMITIDAS 」
│
│ 🎯 **HABILIDAD ACTIVA:**
│    • Únicamente TATSUYA
│
│ 🛡️ **HABILIDADES PASIVAS:**
│    • TODAS las habilidades pasivas permitidas
│    • EXCEPTO las mencionadas como prohibidas
│
├─「 ⚠️ REGLAS IMPORTANTES 」
│
│ 🖥️ **MÁXIMO 3 PC POR EQUIPO**
│
│ 🔄 **+4 RONDAS PARA RECLAMOS**
│    • Si hay controversias o disputes
│    • Evidencias requeridas para reclamos
│
│ 📸 **EN CASO DE INCUMPLIMIENTO:**
│    • Pasar al privado con capturas
│    • Evidencias claras y contundentes
│    • Screenshots como prueba obligatoria
│
├─「 🎮 INFORMACIÓN DE CONTACTO 」
│
│ 📱 **IG:** @kts_competitivo
│ 🎯 **Organización:** KTS Esports
│
╰─「 🏆 ${global.botname || 'Bot'} • Sistema KTS VV2 」

🔥 **¡PREPÁRATE PARA LA BATALLA VV2!** 🔥

💡 **Comandos útiles para VV2:**
• \`${usedPrefix}vv2-kts <nombre>\` - Crear lista VV2
• \`${usedPrefix}listasvv2\` - Ver listas VV2 activas  
• \`${usedPrefix}reglas-vv2\` - Ver estas reglas

⚠️ **RECORDATORIO IMPORTANTE:** 
Estas son las reglas oficiales de KTS para modalidad VV2. El incumplimiento de cualquiera de estas normas resultará en penalizaciones o descalificación del torneo.

🏆 **FAIR PLAY:** Respeta las reglas, respeta a tus oponentes, y que gane el mejor equipo.

📅 **Última actualización:** ${new Date().toLocaleDateString()}
        `.trim();

        try {
            const imageBuffer = readFileSync(imagePath);
            
            await conn.sendMessage(m.chat, {
                image: imageBuffer,
                caption: reglasTexto,
                footer: `🎯 Reglas oficiales KTS VV2 • ${global.botname}`,
                buttons: [
                    {
                        buttonId: `${usedPrefix}vv2-kts Nueva Lista VV2`,
                        buttonText: { displayText: '🎮 Crear Lista VV2' },
                        type: 1
                    },
                    {
                        buttonId: `${usedPrefix}listasvv2`,
                        buttonText: { displayText: '📋 Ver Listas VV2' },
                        type: 1
                    },
                    {
                        buttonId: `${usedPrefix}reglas-clk`,
                        buttonText: { displayText: '⚔️ Reglas CLK 4v4' },
                        type: 1
                    }
                ],
                headerType: 4
            }, { quoted: m });
            
        } catch (imageError) {
            console.log('No se pudo cargar la imagen VV2, enviando solo texto:', imageError.message);
            
            const buttonMessage = {
                text: `🖼️ **IMAGEN DE REGLAS VV2 NO DISPONIBLE**\n_Consulta la imagen reglas-vv2.jpg en el servidor_\n\n${reglasTexto}`,
                footer: `🎯 Reglas oficiales KTS VV2 • ${global.botname}`,
                buttons: [
                    {
                        buttonId: `${usedPrefix}vv2-kts Nueva Lista VV2`,
                        buttonText: { displayText: '🎮 Crear Lista VV2' },
                        type: 1
                    },
                    {
                        buttonId: `${usedPrefix}help team`,
                        buttonText: { displayText: '❓ Más Comandos' },
                        type: 1
                    },
                    {
                        buttonId: `${usedPrefix}reglas-clk`,
                        buttonText: { displayText: '⚔️ Ver Reglas CLK' },
                        type: 1
                    }
                ],
                headerType: 1
            };
            
            await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        
        const resumenVV2 = `
╭─「 🎯 RESUMEN RÁPIDO KTS VV2 」
│
│ ⚡ **Puntos clave:**
│ • 🔫 Solo 7 armas permitidas
│ • 🎯 Tatsuya única habilidad activa
│ • 🚫 Sin granadas ni Otho/Wolfrahh
│ • 🖥️ Máximo 3 PC por equipo
│ • 📸 Capturas obligatorias para reclamos
│ • 🔄 +4 rondas para disputes
│
│ 📱 **Contacto:** @kts_competitivo
│
╰─「 🏆 ¡Que gane el mejor! 🏆 」`;
        
        setTimeout(async () => {
            await conn.reply(m.chat, resumenVV2, m);
        }, 2000);
        
    } catch (error) {
        console.error('Error en comando reglas-vv2:', error);
        await conn.reply(m.chat, '❌ Error al mostrar las reglas KTS VV2. Intenta nuevamente.', m);
    }
};

handler.help = ['reglas-vv2', 'reglasvv2', 'rules-vv2', 'kts-vv2', 'vv2-rules'].map(v => v + ' - Muestra las reglas oficiales KTS VV2');
handler.tags = ['team', 'info'];  
handler.command = /^(reglas\-vv2|reglasvv2|rules\-vv2|kts\-vv2|vv2\-rules|reglaskts)$/i;
handler.group = true;

export default handler;