const Discord = require('discord.js');
const Client = new Discord.Client();
const OwnerID = "130515926117253122";

const prefix = "!"



Client.on("ready", () => {
	console.log("online");
	Client.user.setPresence({ game: { name: ``, type: 0} });
});

Client.on("message", async (message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);
	
	let args = message.content.split(" ").slice(1);

	if (command === "say") {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setDescription(args.join(" "))
    .setTimestamp()
    message.channel.send({embed});
  } else
    if(command === "kick") {
        if(!message.member.roles.some(r=>["👑Masters", "Ajudantes"].includes(r.name)) )
          return message.reply("Você não tem permissão para usar este comando!");
        
        let member = message.mentions.members.first();
        if(!member)
          return message.reply("Plz, Informe um usuário válido");
        if(!member.kickable) 
          return message.reply("Você não possui permissões suficientes para kickar este usuário.");
        
        let reason = args.slice(1).join(' ');
        if(!reason)
          return message.reply("Qual o motivo do Kick?");

        await member.kick(reason)
          .catch(error => message.reply(`Sry ${message.author} , impossivel executar o kick devido ao erro: ${error}`));
          const canal = member.guild.channels.find('name', '🚫punições');
          if (!canal) return;
          canal.send(`@here ${member.user.tag} Foi Kickado por ${message.author.tag} Motivo: ${reason}`);
          const embed = new Discord.RichEmbed()
          .setTimestamp()
          message.channel.send({embed});
	} else
	if(command === "apagar") {
        const deleteCount = parseInt(args[0], 10);

        if(!deleteCount || deleteCount < 1 || deleteCount > 100)
          return message.reply("Insira um número entre 1 e 100 para deletar");
        
        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Erro ao deletar as mensagens: ${error}`));
  }
	if (command === "sugetão") {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setTitle("Sugetão:")
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(args.join(" "))
    .setTimestamp()
    message.channel.send({embed});

  }  
  
});

Client.login("NDE4NTI2NzY5MDQ2NjE4MTMy.DkpsmA.I9r9DNI1Sfu8Wbv_9CSj3xTG-hA");
