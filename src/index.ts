/*      Starting point of the entire program    */

import cfg from "../config";
import { ActivityType, Client } from "concordia";
const client = new Client<true>();

function onReady()
{
        console.log("Logged in!");
}

client.on("ready", onReady);

client.login(cfg.token);
