module.exports = {
    // Command prefix
    commandPrefix: '!',
    // Eternal Logo URL
    iconUrl: 'https://i.imgur.com/Tq2X2Og.png',
    // ENV imported vars
    tokens: {
        // Discord bot token
        discord: process.env.DISCORD_TOKEN
    },
    guildId: '635853168688758804',
    role: {
        member: {
            name: 'Member',
            id: '636235144348565538'
        },
        project_updates: {
            name: 'project-updates',
            id: '636328397009715231'
        },
        project_tester: {
            name: 'project-tester',
            id: '636329085731078184'
        },
        developer: {
            name: 'Developer',
            id: '635863147273650176'
        }
    },
    channel: {
        welcome: '636232206120910850',
        official_links: '636329550678196275',
        roles: '636329631976390667'
    }
};