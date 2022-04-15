const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { discordBotClientId, discordBotGuildId, discordBotToken } = require('../config.json');
const path = require('path')

const commands = [];

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(discordBotToken);

rest.put(Routes.applicationGuildCommands(discordBotClientId, discordBotGuildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);