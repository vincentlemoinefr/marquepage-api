module.exports = class HiveClient {
    constructor(options = {}, libraries = {}) {

     

        // When did the Hive Master started
        this.started_at = Date.now();

        // integration of options and libraries
        this.integrateConfig(options);
        this.integrateConfig(libraries);

        this.requirements = [
            'DiscordClient',
            'HiveEvents'
        ];

        this.validateConfig(this.requirements);

        this.HiveEvents.once('databaseReady', () => {
            this.hcStart();
        });
    }

    hcStart() {
        this.DiscordClient.login(process.env.DISCORD_TOKEN);
    }
}