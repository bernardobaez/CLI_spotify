const { readFileSync } = require("fs");
const axios = require("axios");
const func = require("./functions.js");
require("colors");

class Commands {
    constructor() {
        (async () => {
            try {
                this.token = readFileSync("../token.txt", "utf-8").trim(); // Change the path if necessary
                if (this.token === "") {
                    throw new Error("Token doesn't exist. Can't be used.");
                }
            } catch (error) {
                console.error("Read token error:", error);
            }
        })();
    }

    async sendReq(url, method = "get", data = null) {
        try {
            let response;

            if (data == null) {
                response = await axios({
                    method,
                    url,
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
            } else {
                console.log(data);
                response = await axios({
                    method,
                    url,
                    data,
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        "Content-Type": "application/json"
                    }
                });
            }

            return response.data;
        } catch (error) {
            console.error("Request error:", error);
            throw error;
        }
    }

    async getUserInfo() {
        const url = "https://api.spotify.com/v1/me/player";
        return await this.sendReq(url);
    }

    async getPlaybackState() {
        const url = "https://api.spotify.com/v1/me/player/currently-playing";
        const data = await this.sendReq(url, "get");
        let art = await func.getArtists(data.item.artists) + "".green;

        console.log(data.item.name + " by" + art);
    }

    async getDevices(print = true) {
        const url = "https://api.spotify.com/v1/me/player/devices";
        const data = await this.sendReq(url, "get");

        if (print) {
            console.log(data.devices);
            return;
        }

        return data;
    }

    async getCurrentDevice() {
        let { devices } = await this.getDevices(false);
        const os = require("os");

        devices.forEach(ele => {
            if (!(ele.name == os.hostname()) && !ele.is_active) {
                return ele.id;
            }
        })

        return null;
    }

    async pauseMusic() {
        const url = "https://api.spotify.com/v1/me/player/pause";
        await this.sendReq(url, "put");
        console.log("Music paused");
    }

    async playMusic() {
        const url = "https://api.spotify.com/v1/me/player/play";
        await this.sendReq(url, "put");
        console.log("Playing music...");
    }

    async nextMusic() {
        const url = "https://api.spotify.com/v1/me/player/next";
        await this.sendReq(url, "post");
        console.log("Next music.");
    }

    async previousMusic() {
        const url = "https://api.spotify.com/v1/me/player/previous";
        await this.sendReq(url, "post");
        console.log("Previous music.");
    }

    async repeatMusic(option) {
        const url = "https://api.spotify.com/v1/me/player/repeat?state=" + option;
        await this.sendReq(url, "put");
    }

    async musicVolume(volume, device_id = null) {
        let url = `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`;

        if (device_id != null) {
            url += "&device_id=" + device;
        }

        await this.sendReq(url, "put");
    }

    async transferMusic(device) {
        if (device == "") {
            console.log("You haven't entered any device.");
            return;
        }

        let { devices } = await this.getDevices(false);
        let { id, is_active } = func.deviceExists(devices, device);
        const url = `https://api.spotify.com/v1/me/player`;

        if (id == 0) {
            console.log("The entered device does not exist.");
            return;
        }

        if (is_active) {
            console.log("You can't transfer to the same device where you are listening to music.");
            return;
        }
        console.log(id);

        await this.sendReq(url, "put", JSON.stringify({
            device_ids: [id]
        }));

        console.log(`Music has been transferred to (${device}) device.`);
    }

    async searchMusic() {
        let url = `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`;

        if (device_id != null) {
            url += "&device_id=" + device;
        }

        await this.sendReq(url, "put");
    }
}

module.exports = new Commands();
