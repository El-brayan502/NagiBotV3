import axios from 'axios';

const handler = async (m, { args, conn }) => {
    if (args.length < 2) return m.reply('¡Ingresa el título y el slogan! Ejemplo: .logo WhatsApp Bot|ᴅᴏʟᴘʜɪɴʙᴏᴛ-MD');

    const [titulo, slogan] = args.join(" ").split("|");

    try {
        await conn.sendMessage(m.chat, {
            react: {
                text: "⏱️",
                key: m.key,
            }
        });

        let payload = {
            ai_icon: [333276, 333279],
            height: 300,
            idea: `Un Icono ${titulo}`,
            industry_index: "N",
            industry_index_id: "",
            pagesize: 4,
            session_id: "",
            slogan: slogan || "",
            title: titulo,
            whiteEdge: 80,
            width: 400
        };

        let { data } = await axios.post("https://www.sologo.ai/v1/api/logo/logo_generate", payload);

        if (!data || !data.data.logoList.length) {
            return m.reply('🕸 Falló al crear el logo.');
        }

        const logoUrls = data.data.logoList.map(logo => logo.logo_thumb);

        let mensaje = `🍬 *Generador de Logos*\n\n`;
        mensaje += `📌 *Título*: ${titulo}\n`;
        mensaje += `🐇 *Slogan*: ${slogan || "-"}\n`;
        mensaje += `🐚 *Descargando logo...*`;

        await conn.sendMessage(m.chat, { 
            image: { url: logoUrls[0] }, 
            caption: mensaje 
        }, { quoted: m });

        for (let i = 1; i < logoUrls.length; i++) {
            await conn.sendMessage(m.chat, { 
                image: { url: logoUrls[i] }
            }, { quoted: m });
        }

        await conn.sendMessage(m.chat, {
            react: {
                text: "✅",
                key: m.key,
            }
        });

    } catch (error) {
        console.error("Error al generar el logo:", error);
        m.reply('❌ Ocurrió un error al crear el logo.');
    }
};

handler.help = ['logo <título>|<slogan>'];
handler.tags = ['tools'];
handler.command = ["logogen", "generadordelogo"];

export default handler;
