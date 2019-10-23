const Discord = require('discord.js');
const config = require('./config');
const { log } = require('./common');
const commands = require('./commands');
const { subscribe, unsubscribe } = require('./roles');

global.client = new Discord.Client();

client.on('error', log.error);
client.login(config.tokens.discord)
    .then(token => log.info('Bot is now online.'))
    .catch(e => log.error('Failed to login bot.', e));

// Assign 'Member' role if it does not exist.
client.on('presenceUpdate', (oldMember, newMember) => {
    if(!newMember.roles.some(r => r.name.toLowerCase() === config.role.member.name.toLowerCase())) {
        newMember.addRole(config.role.member.id)
    }
});

// On member join welcome message
client.on('guildMemberAdd', (member) => {
    const ch = client.channels.find('id', config.channel.welcome)
    ch.send({
        embed: {
            color: 0xff6c00,
            author: {
                name: member.user.username,
                icon_url: member.user.avatarURL
            },
            title: "Welcome to Eternal Framework.",
            description: "" + member + ", thank you for joining! Feel free to ask any questions in #help.",
            thumbnail: {
                url: config.iconUrl
            }
        }
    })
});

// On member leave welcome message
client.on('guildMemberRemove', (member) => {
    const ch = client.channels.find('id', config.channel.welcome)
    ch.send({
        embed: {
            color: 0xff6c00,
            author: {
                name: member.user.username,
                icon_url: member.user.avatarURL
            },
            description: 'has left the server.'
        }
    })
});

// On command
client.on('message', message => {
   if(message.author.bot) {
       return
   }

   if(!message.content.startsWith(config.commandPrefix)) {
       return
   }

   const args = message.content.slice(config.commandPrefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase();

   log.info('Received command: ', command, args);

   commands(message, command, args);
});

// Check for subscribe options.
client.on('messageReactionAdd', (reaction, user) => {
   if(reaction.emoji.name === '✅' && !user.bot) {
       subscribe(reaction, user)
   }
});

// Check for unsubscribe options.
client.on('messageReactionRemove', (reaction, user) => {
    if(reaction.emoji.name === '✅' && !user.bot) {
        unsubscribe(reaction, user)
    }
});