const express = require("express");
const fs = require("fs").promises;
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.post("/token", async (req, res) => {
    let { token } = req.body;

    try {
        await fs.writeFile("./token.txt", token);
        process.env.ACCESS_TOKEN = token; // Set environment variable in the Node.js process

        res.status(200).send("Token saved successfully");
    } catch (error) {
        console.error("Error saving the token:", error);
        res.status(500).send("Error saving the token");
    }
});

app.listen(3000, () => {
    console.log("http://localhost:3000/");
});
