const { createEmbed, isDeveloper } = require('./common');

function removeCommandMessage(message) {
    message.delete();
}

module.exports = (message, command, args) => {
    const value = args.join(' ');

    switch (command) {
        case 'help':
            const helpEmbed = createEmbed()
                .setTitle('Commands')
                .setDescription('Below is a list of all commands')
                .addField('!help', 'Displays this message.');

            if(isDeveloper(message.member)) {
                helpEmbed
                    .addField('!send-roles-msg', 'Resend the roles messages in #roles')
                    .addField('!send-links-msg', 'Resend the links messages in #official-links')
            }

            message.channel.send({
                embed: helpEmbed
            });

            removeCommandMessage(message);
        break;
        default:
            removeCommandMessage(message);
        break;
    }
};