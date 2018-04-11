const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({
    disableEveryone: true
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is now Online!`);
    bot.user.setGame("Setting up CosmicRuins!");
});

var prefix, messageArray, cmd, args, message;

bot.on("message", async msg => {
    message = msg;
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    prefix = botconfig.prefix;
    messageArray = message.content.split(" ");
    cmd = messageArray[0];
    args = messageArray.slice(1);

    if (!cmd.includes(prefix)) return;
    cmd = cmd.replace(prefix, "");
    switch (cmd) {

    	case 'report':
    		return cmdReport();
    	case 'serverinfo':
    		return cmdServerInfo()
    	case 'botinfo':
    		return cmdBotInfo();
        case 'example':
            return cmdExample();
    }
});

function cmdReport() {
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if (!rUser) return message.channel.send("Couldnt find user");

	let reason = args.join(" ").slice(22);
	let returnMessage = new Discord.RichEmbed()
    	.setDescription("Reports")
    	.setColor("#15f153")
    	.addField("Reported User", `${rUser} with ID: ${rUser.id}`);
	return message.channel.send(returnMessage);
}

function cmdServerInfo() {
    let sicon = message.guild.iconURL;
    let returnMessage = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);
    return message.channel.send(returnMessage);
}

function cmdBotInfo() {
    let bicon = bot.user.displayAvatarURL;
    let returnMessage = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt);
    return message.channel.send(returnMessage);
}

function cmdExample() {
    let returnMessage = new Discord.RichEmbed()
        .setDescription("Example Text")
        .setColor("#15f153")
        .addField("CHANGE ME", "And me too!");
    return message.channel.send(returnMessage);
}

bot.login(botconfig.token);
