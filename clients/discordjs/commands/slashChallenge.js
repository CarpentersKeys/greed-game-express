// dummy fn to return results of slashCommand
function slashChallenge() {
    // await acceptance then return stage result of challenge
    const players = { ...PLAYERS_TEMPLATE }
    const numberRounds = 3
    return { players, numberRounds }
}
    // return promise of challengeResult
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};