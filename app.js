const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(`Starting...`)
    setTimeout(function (){

	console.log(`Loading users...`);

  }, 5000);
  setTimeout(function (){

	console.log(`Started the CosmicRuins bot with ${client.channels.size} users`); 
    client.user.setActivity(`play.CosmicRuins.us`);

  }, 10000);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`play.CosmicRuins.us`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`play.CosmicRuins.us`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "info") {
	  let returnMessage = new Discord.RichEmbed()
        .setTitle("CosmicRuins Bot")
		.setDescription("Made by _Puggy")
        .setColor("#08d827")
        .addField("Version", "1.0")
		.addField("Server IP", "play.cosmicruins.us")
		.addField("For more...","Use +help to list the commands")
	  return message.channel.send(returnMessage);
  }
  if(command === "help") {
	  let returnMessage = new Discord.RichEmbed()
        .setTitle("CosmicRuins Bot")
		.setDescription("Made by _Puggy")
        .setColor("#08d827")
        .addField("+info", "Shows bot info")
        .addField("+ip", "Shows the server IP")
		.addField("+website","Shows the website link")
		.addField("+store","Shows the store link")
		.addField("+report <user> <reason>", "Reports a user")
		.addField("+poll create <question>", "Creates a poll in #polls")
		.addField("!invites", "Shows how many invites you have")
		.addField("?help", "List DynoBot commands")
	  return message.channel.send(returnMessage);
  }
  if(command === "ip") {
	  message.channel.send("The server IP is `play.cosmicruins.us`");
  }
  if(command === "website") {
	  message.channel.send("The server website link is http://cosmicruins.us/");
  }
  if(command === "store") {
	  message.channel.send("The server store link is http://store.cosmicruins.us/");
  }
  if(command === "report") {
	  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	  if(!rUser) return message.channel.send("User not found!");
	  let reason = args.join(" ").slice(22);
	  let reportEmbed = new Discord.RichEmbed()
	    .setTitle("Report")
        .setColor("#08d827")
	    .addField("User", `${rUser}`)
	    .addField("Reporter", `${message.author}`)
	    .addField("Reason", reason)
	  let reportSent = new Discord.RichEmbed()
	    .setTitle("Report Sent!")
		.setColor("#08d827")
		.addField("What next?","A member of staff will read this and may message you.")
	  message.channel.send(reportSent);
	  let reportschannel = message.guild.channels.find(`name`, "reports");
	  if(!reportschannel) return message.channel.send("Couldn't find reports channel!");
	  message.delete().catch(O_o=>{});
	  reportschannel.send(reportEmbed);
	  return;
  }
  if(command === "poll") {
	  let question = args.join(" ").slice(6);
	  let pollannoucement = new Discord.RichEmbed()
	  .setTitle("Poll by")
	  .setDescription(`${message.author}`)
	  .setColor("#08d827")
	  .addField("Question", question);
	  let pollcreated = new Discord.RichEmbed()
	  .setTitle("Poll Created!")
	  .setColor("#08d827")
	  .addField("View in", "#polls")
	  let pollschannel = message.guild.channels.find(`name`, "polls");
	  message.channel.send(pollcreated);
	  pollschannel.send(pollannoucement)
	  .then(function (message) {
		  message.react("👍")
		  message.react("👎")
	  }).catch(function () {
		  //Nothing
	  });
	  message.delete().catch(O_o=>{});
  }
});

client.login(config.token);