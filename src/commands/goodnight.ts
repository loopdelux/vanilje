import { Message } from "concordia";

export default {
    name: 'goodnight',
    description: 'i lost hours of sleep to ts',
    execute(msg: Message, args: string[]) {
        msg.reply('good night.');
    }
}
