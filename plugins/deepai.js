const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg'); // For Creating File
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const axios = require('axios'); // Resp Checker
const Config = require('../config'); // GAN STYLE Support

const got = require("got"); // Responses Catcher
const deepai = require('deepai'); // Localde ise deepmain.js oluşturarak özelleştirilebilir şekilde kullanabilirsiniz. Web Sunucularında Çalışmaz!!
deepai.setApiKey('7e684ac4-e63f-43a4-a39e-a002029039fe'); // Quickstart API Key

const Language = require('../language'); 
const Lang = Language.getString('deepai'); // Language Support

if (Config.WORKTYPE == 'private') {

    Asena.addCommand({pattern: 'deepai', fromMe: false, deleteCommand: true, desc: Lang.DEEPAI_DESC}, (async (message, match) => {

        await message.sendMessage('💻 Uso: *!colorai*\nℹ️ Descripción: Colorea la foto que esté en blanco y negro.\n\n💻 Uso: *!dreamai*\nℹ️ Descripción: Aplica efecto de ensueño a la foto.\n\n💻 Uso: *!toonai*\nℹ️ Descripción: Convierte la cara de la foto en un personaje de dibujos animados con Inteligencia Artificial.\n\n💻 Uso: *!nudity*\nℹ️ Descripción: Detecta la probabilidad de que una imagen contenga desnudez y deba considerarse NSFW.\n\n💻 Uso: *!ganstyle*\nℹ️ Descripción: Coloca un filtro a la foto respondida.\n\n💻 Uso: *!neuraltalkai*\nℹ️ Descripción: Trata de explica lo que está pasando en la foto con Inteligencia Artificial (Modo BETA).\n\n💻 Uso: *!textai <texto>*\nℹ️ Descripción: Crea una historia artificial para ti a partir de tu oración, por ahora solo en inglés.\n Ejemplo: !textai hot\n\nSi quieres traducirlo puedes hacerlo con el comando !trt en es respondiendo al texto.\n\n⚠️ *Todas las herramientas aquí funcionan con aprendizaje profundo. Cuanto más lo use, funcionará mejor ya que más información almacenará. (Inteligencia Artificial)* ```de preferencia utiliza solo caracteres en inglés.```\n\n*Gracias por usar DrkBot ❤*');

    }));

    Asena.addCommand({pattern: 'colorai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Colorizando... 🎨',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("colorizer", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));
    
    Asena.addCommand({pattern: 'nudity', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Buscando partes desnudas... 🔞',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("nsfw-detector", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'waifuai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Mezclando... 🧩',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("waifu2x", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'superai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Mejorando... 🖌️',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("torch-srgan", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'moodai ?(.*)', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("sentiment-analysis", {
            text: `${match[1]}`,

        });

        await message.reply(`*Mood:* ${resp.output}`);

    }));

    Asena.addCommand({pattern: 'dreamai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Noche estrellada... 🌃',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("deepdream", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'neuraltalkai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Leyendo... 🙇🏻',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("neuraltalk", {
                    image: fs.createReadStream("./output.jpg"),

                });

                await message.reply(`*Output:* ${resp.output}`);

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'ttiai ?(.*)', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("text2img", {
            text: `${match[1]}`,

        });

        var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

    }));

    Asena.addCommand({pattern: 'toonai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Caricaturizando... 🌟',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("toonify", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'textai ?(.*)', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("text-generator", {
            text: `${match[1]}`,

        });

        await message.reply(`*Article:*\n ${resp.output}`);

    }));

    Asena.addCommand({pattern: 'ganstyle', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Creando... ♻️',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("CNNMRF", {
                    style: Config.GANSTYLE,
                    content: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));
}
else if (Config.WORKTYPE == 'public') {

    Asena.addCommand({pattern: 'deepai', fromMe: false, deleteCommand: true, desc: Lang.DEEPAI_DESC}, (async (message, match) => {

        await message.sendMessage('💻 Uso: *!colorai*\nℹ️ Descripción: Colorea la foto que esté en blanco y negro.\n\n💻 Uso: *!dreamai*\nℹ️ Descripción: Aplica efecto de ensueño a la foto.\n\n💻 Uso: *!toonai*\nℹ️ Descripción: Convierte la cara de la foto en un personaje de dibujos animados con Inteligencia Artificial.\n\n💻 Uso: *!nudity*\nℹ️ Descripción: Detecta la probabilidad de que una imagen contenga desnudez y deba considerarse NSFW.\n\n💻 Uso: *!ganstyle*\nℹ️ Descripción: Coloca un filtro a la foto respondida.\n\n💻 Uso: *!neuraltalkai*\nℹ️ Descripción: Trata de explica lo que está pasando en la foto con Inteligencia Artificial (Modo BETA).\n\n💻 Uso: *!textai <texto>*\nℹ️ Descripción: Crea una historia artificial para ti a partir de tu oración, por ahora solo en inglés.\n Ejemplo: !textai hot\n\nSi quieres traducirlo puedes hacerlo con el comando !trt en es respondiendo al texto.\n\n⚠️ *Todas las herramientas aquí funcionan con aprendizaje profundo. Cuanto más lo use, funcionará mejor ya que más información almacenará. (Inteligencia Artificial)* ```de preferencia utiliza solo caracteres en inglés.```\n\n*Gracias por usar DrkBot ❤*');

    }));

    Asena.addCommand({pattern: 'colorai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Colorizando... 🎨',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("colorizer", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));
    
    Asena.addCommand({pattern: 'nudity', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Buscando partes desnudas... 🔞',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("nsfw-detector", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'waifuai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Mezclando... 🧩',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("waifu2x", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'superai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Mejorando... 🖌️',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("torch-srgan", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'moodai ?(.*)', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("sentiment-analysis", {
            text: `${match[1]}`,

        });

        await message.reply(`*Mood:* ${resp.output}`);

    }));

    Asena.addCommand({pattern: 'dreamai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Noche estrellada... 🌃',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("deepdream", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'neuraltalkai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Leyendo... 🙇🏻',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("neuraltalk", {
                    image: fs.createReadStream("./output.jpg"),

                });

                await message.reply(`*Output:* ${resp.output}`);

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'ttiai ?(.*)', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("text2img", {
            text: `${match[1]}`,

        });

        var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

    }));

    Asena.addCommand({pattern: 'toonai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Caricaturizando... 🌟',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("toonify", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'textai ?(.*)', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("text-generator", {
            text: `${match[1]}`,

        });

        await message.reply(`*Article:*\n ${resp.output}`);

    }));

    Asena.addCommand({pattern: 'ganstyle', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```¡Necesito que respondas a una foto!```');

        var downloading = await message.client.sendMessage(message.jid,'Creando... ♻️',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("CNNMRF", {
                    style: Config.GANSTYLE,
                    content: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Hecho por *DrkBot*'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));
}