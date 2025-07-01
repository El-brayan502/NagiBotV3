import { readFileSync } from 'fs';
import { join } from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    try {
        const reglasTexto = `
⚔️ **REGLAS CLK 4V4** ⚔️

🎯 **CONFIGURACIÓN:**
🏪 Tienda: AVANZADA | ❤️ HP: 200
💰 Moneda: MÁXIMA | 🔄 Rondas: 13
🔫 Munición: LIMITADA | 📦 Sin Airdrop

⚠️ **REGLAS IMPORTANTES:**
🎮 Primera ronda: Solo DESERT
⏰ Datos 12min antes, 5min tolerancia
🎯 [7-5] para segunda sala
🔄 2 cambios máximo en 4v4
📊 1 M1014 máximo en 4v4
🚫 Sin alturas (carros/cajas OK)
🏆 Cuentas nivel 50+

🚫 **PROHIBIDO:**
❌ Quitar aditamentos de armas
❌ Solo Desert, UMP y M1014 permitidos
❌ Personajes específicos

💪 **HABILIDADES:**
🎯 Activa: Solo ALOK
🛡️ Pasivas: MOCO, KELLY, MAXIM

💻 **TÉCNICO:** 2 PC por equipo máximo
        `.trim();

        try {
            const imagePath = join(process.cwd(), 'ReglasClk.png');
            const imageBuffer = readFileSync(imagePath);
            
            await conn.sendMessage(m.chat, {
                image: imageBuffer,
                caption: reglasTexto
            }, { quoted: m });
            
        } catch (imageError) {
            await conn.reply(m.chat, reglasTexto, m);
        }
        
    } catch (error) {
        await conn.reply(m.chat, '❌ Error al mostrar reglas CLK', m);
    }
};

handler.help = ['reglas-clk'];
handler.tags = ['team'];
handler.command = /^(reglas\-clk|reglasclk|rules\-clk)$/i;
handler.group = true;

export default handler;