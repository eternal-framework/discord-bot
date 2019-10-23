const config = require('./config');
const { RichEmbed } = require('discord.js');

let projectUpdatesMessage = null;

const projectUpdatesRoleEmbed = new RichEmbed()
    .setTitle('Subscribe To Project Updates')
    .setColor(0x303891)
    .setDescription('React to this message to subscribe to the project git updates category. Remove your reaction to unsubscribe.');

// Sends the roles message to #roles.
function sendRolesMessage() {
    const ch = client.channels.find('id', config.channel.roles);
    // Send the Project update subscribe embed.
    ch.send({
        embed: projectUpdatesRoleEmbed
    }).then(message => {
        projectUpdatesMessage = message
        message.react('✅')
    })
}

function hasRole(member, roleName) {
    return member.roles.some(r => r.name.toLowerCase() === roleName.toLowerCase())
}

function getMemberFromUser(user) {
    const guild = client.guilds.find('id', config.guildId);
    return guild.member(user)
}

function subscribe(reaction, user) {
    const message = reaction.message;
    // Subscribe to project updates
    if(message.id === projectUpdatesMessage.id) {
        if(!hasRole(getMemberFromUser(user), config.role.project_updates.name)) {
            getMemberFromUser(user).addRole(config.role.project_updates.id)
        }
    }
}

function unsubscribe(reaction, user) {
    const message = reaction.message;
    // Unsubscribe to project update
    if(message.id === projectUpdatesMessage.id) {
        if(hasRole(getMemberFromUser(user), config.role.project_updates.name)) {
            getMemberFromUser(user).removeRole(config.role.project_updates.id)
        }
    }
}

module.exports = {
    sendRolesMessage,
    subscribe,
    unsubscribe
};