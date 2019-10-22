const log = require('loglevel');
const Discord = require('discord.js');
const config = require('./config');

log.setLevel('info');

function createEmbed() {
    return new Discord.RichEmbed()
        .setThumbnail(config.iconUrl)
        .setColor(0x30916a)
        .setFooter('Eternal Bot', config.iconUrl)
}

function isDeveloper(member) {
    return member && member.roles.some(r => r.name.toLowerCase() === config.role.developer.name.toLowerCase())
}

module.exports = {
    log,
    createEmbed,
    isDeveloper
};