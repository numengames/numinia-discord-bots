# Numinia Discord Bots

This project contains several Discord bots that run in Docker containers and are managed via PM2. These bots are designed to perform specific tasks on Discord servers.

## Prerequisites

- Docker
- Discord account
- [Node.js](https://nodejs.org/) and npm (to manage dependencies and run PM2 locally if needed)

## Project Setup

1. **Clone the repository:**

    ```bash
    git clone git@github.com:numengames/numinia-discord-bots.git
    cd discord_bots
    ```

2. **Create the Environment Variables File:**

    You need to create an `.env` file since it's not included in the repository (listed in `.gitignore`). This file should contain all necessary environment variables for each bot.

    Create a `.env` file in the root directory and add your bot tokens like so:

    ```plaintext
    BOT_TOKEN_NAME=YOUR_BOT_TOKEN
    ```

    Replace `BOT_TOKEN_NAME` with the name of the bot and `YOUR_BOT_TOKEN` with the actual token you obtain from the Discord Developer Portal. Do that for each bot you declare.

3. **Configure `ecosystem.config.js`:**

    To add a new bot, update the `ecosystem.config.js` file with the configuration for the new bot. Here is an example of how to add a bot:

    ```javascript
    module.exports = {
      apps : [{
        name: 'new_bot_name',  // Name of your new bot
        script: 'new_bot_script.js',  // Main script file for your new bot
        watch: true,
        instances: 1,
        autorestart: true,
        max_memory_restart: '100M' // This is the minimum required by the bot to run
      }]
    };
    ```

    Replace `new_bot_name` and `new_bot_script.js` with the name and entry script of your new bot, respectively.

3. **Build the Docker image:**

    Before building the Docker image, ensure you have an `.env` file containing the necessary environment variables for each bot.

    ```bash
    docker build -t discord-bots -f ./Dockerfile .
    ```

4. **Running the bots:**

    Use the following command to start the bots with PM2 in a Docker container:

    ```bash
    docker run --rm -it --env-file ./.env --net=bridge $(docker build -q -t discord-bots -f ./Dockerfile .)
    ```

## Adding Bots to a Discord Server

To add a bot to a Discord server, you must have administrative permissions on the server. Replace `client_id` in the URL below with the client ID of your bot to generate an invite link:

    ```url
    https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=3072
    ```

Replace `YOUR_CLIENT_ID` with the actual client ID of the bot you wish to add. This URL will guide you through authorizing your bot on a specific Discord server.

## Memory Requirements

Each bot requires approximately 100 MB of memory.

## Creating Applications for Bots

You can create and manage Discord applications (bots) via the following website:

- [Discord Developer Portal](https://discord.com/developers)

Follow the instructions on the site to set up new bot applications and obtain their credentials.

## Contributing

We welcome contributions! If you'd like to improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/awesome-feature).
3. Make your changes and commit them (git commit -am 'Add an awesome feature').
4. Push the branch (git push origin feature/awesome-feature).
5. Open a pull request.

## 📜 License

Code released under the [CCO License](https://creativecommons.org/publicdomain/zero/1.0/).

Copyright (c) 2024, NumenGames