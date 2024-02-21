/*      Starting point of the entire program    */

import cfg from "../config";
import { ActivityType, Client, Collection, Message } from "concordia";
import fs from "node:fs"

class CommandClient extends Client
{
        commands: Collection<string, any>;
        constructor()
        {
                super();
                this.commands = new Collection<string, any>();
        }
}

const client = new CommandClient();

/*      Command Handling        */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles)
{
        const command = require(`./commands/${file}`).default;
        // set new item in collection with key as command name & value as exported module
        client.commands.set(command.name, command);
        console.log(command);
}


/*      Bot start-up & continued behaviour      */
function onReady(): void
{
        client.user!.setPresence
        ({ 
                activity: { name: 'with my balls.'},
                status: 'idle'
        });
        console.log("Logged in!");
}

function onMessage(msg: Message): void
{
        if ( msg.author.bot || !msg.content.startsWith(cfg.prefix) )
                return;

        const args: string[] = msg.content.slice(cfg.prefix.length).trim().split(/ +/);
        const command: string = args.shift()!.toLowerCase();

        if (!client.commands.has(command)) return;

        try
        {
                client.commands.get(command).execute(msg, args);
        }
        catch (error)
        {
                console.error(error);
                msg.reply('There was an error...');
        }
}

client.on("ready", onReady);
client.on("message", onMessage);

client.login(cfg.token);
