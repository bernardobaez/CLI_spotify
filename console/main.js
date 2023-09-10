#!/usr/bin/env node

const commands = require("./commands.js");
const program = require("commander");
require("dotenv").config();

program
    .version('1.0.0')
    .description("Spotify CLI application.");

program
    .command("get-music")
    .alias("gm")
    .description("Get information about the currently playing music.")
    .action(async () => {
        await commands.getPlaybackState();
    });

program
    .command("get-devices")
    .alias("gd")
    .description("Get information about available devices.")
    .action(async () => {
        await commands.getDevices();
    });

program
    .command("pause")
    .description("Pause the currently playing music.")
    .action(async()=>{
        await commands.pauseMusic()
    })

program
    .command("play")
    .description("Resume or start playing music.")
    .action(async()=>{
        await commands.playMusic()
    })

program
    .command("next")
    .description("Play the next track.")
    .action(async()=>{
        await commands.nextMusic()
    })

program
    .command("previous")
    .description("Play the previous track.")
    .action(async()=>{
        await commands.previousMusic()
    })

program
    .command("repeat <option>")
    .description("Set the repeat mode (context, track, or off).")
    .action(async (option)=>{
        if(!(option == "context" || option == "track" || option == "off")){
            console.log("Invalid option entered.");
            return;
        }

        commands.repeatMusic(option);
    })

program
    .command("volume <volume>")
    .description("Adjust the music volume (0-100).")
    .action(async (volume)=>{
        let n = parseInt(volume);
        if(n < 0 || n > 100){
            console.log("You must enter a numeric value between (0-100)");
            return;
        }

        if(commands.getCurrentDevice() != null){

        }

        commands.musicVolume(volume);    
    })

program
    .command("transfer-to [device_name...]")
    .description("Transfer music playback to a specified device.")
    .action(async (device_name)=>{
        if(device_name.length == 1){                                                                                                                                
            commands.transferMusic(device_name[0]);
            return;                                                                                                                                                         
        }

        let name = "";
        device_name.forEach(ele=>{
            name += ele + " ";                                                                                                                          
        })

        commands.transferMusic(name);

    })

program.parse(process.argv);
