// require('dotenv').config();

// // reference the environmental variable
// // console.log(process.env.DISCORDJS_BOT_TOKEN);

// //logging in Bot
// const Discord = require('discord.js');
// const { Client } = require('discord.js');
// // const client = new Discord.Client({ intents: ["GUILD_MEMBERS", "GUILD_MEMBER_ADD"] })
// const client = new Discord.Client({ ws: { intents: 32509 }} );
// // const intents = new Discord.Intents(32767);

require('dotenv').config();

// console.log(process.version);

const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = "$";

//ready event
client.on('ready' , () => {  //ready- is an Event(discord.js)
    console.log( `${client.user.tag} has logged in.`);
});

//message event
client.on('message', (message) =>{

    if (message.author.bot) return; // bot - boolen event   
        if (message.content.startsWith(PREFIX)) {
            const [CMD_NAME, ...args] =  message.content
            .trim()
            .substring(PREFIX.length)
            // .split(" ");
            .split(/\s+/); //remove the spaces 
            console.log(CMD_NAME);
            console.log(args);
        
    // console.log(`[${message.author.tag}] : ${message.content}`);

    //bot message reply
    // if (message.content === 'hello'){
        // message.reply('henomdello there!');
        //  message.channel.send('hello');
    
        //kick command
        if(CMD_NAME === 'kick'){
            // message.channel.send('kicked the user');
            if (args.length === 0)  return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            
            if (member){
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked.`))
                .catch((err) => message.channel.send('I cannot have permission :(' ));
            } else {
                message.channel.send('That member has not found');
            }

        }
    }
});


client.login(process.env.DISCORDJS_BOT_TOKEN);