import { readFileSync } from 'fs';
import { join } from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    try {
        const reglasTexto = `
⚔️ **REGLAS KTS VV2 COMPETITIVO** ⚔️

🔫 **ARMAS PERMITIDAS:**
✅ MINI UZI | WOODPEKER | AWM (1 max)
✅ M1887 | M590 (2 max) | TROGON | MP40

🚫 **PROHIBIDO:**
❌ OTHO, WOLFRAHH Y SONIA| Granadas | Draki
❌ Archivos/Haks | Otras armas

💪 **HABILIDADES:**
🎯 Activa: Solo TATSUYA
🛡️ Pasivas: Todas Menos las mencionadas

⚠️ **REGLAS:**
🖥️ Máximo 3 PC por equipo
🔄 +4 rondas para reclamos
📸 Capturas obligatorias

📱 **Contacto:** @kts_competitivo
        `.trim();

        try {
            const imagePath = join(process.cwd(), 'ReglasVv2.png');
            const imageBuffer = readFileSync(imagePath);
            
            await conn.sendMessage(m.chat, {
                image: imageBuffer,
                caption: reglasTexto
            }, { quoted: m });
            
        } catch (imageError) {
            await conn.reply(m.chat, reglasTexto, m);
        }
        
    } catch (error) {
        await conn.reply(m.chat, '❌ Error al mostrar reglas VV2', m);
    }
};

handler.help = ['reglas-vv2'];
handler.tags = ['team'];
handler.command = /^(reglas\-vv2|reglasvv2|vv2\-rules)$/i;
handler.group = true;

export default handler;