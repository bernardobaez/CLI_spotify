# Spotify CLI Application

## Prerequisites

Before you can use this application, you need to have the following prerequisites installed:

- Node.js: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

## Installation

1. Clone or download this repository to your local machine.

2. Navigate to the project directory in your terminal.

3. Install the required Node.js packages by running the following command:

   ```bash
   npm install

## Getting Started

Before using this code, please make sure to follow these steps:

1. Obtain a Spotify Client ID:
   - Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   - Create a new Spotify application.
   - Once created, you will find your Client ID. Replace `'YOUR_CLIENT_ID_HERE'` in the code *(public/index.html)* with your actual Client ID.

2. Configure the Redirect URI:
   - In your Spotify application settings, configure the Redirect URI to match the one specified in your code (`http://localhost:3000` by default).

3. Scope Permissions:
   - The code assumes a set of default scope permissions for the Spotify API. You can customize the `scope` variable to request additional permissions as needed.

4. Run the Application:
   - After making the necessary changes, run your application and initiate the Spotify authentication flow by visiting your application's URL.

## Usage

To use the application, open your terminal and navigate to the project directory *(console/main.js)*.

## Available Commands

### Get Information about Currently Playing Music:

``node main.js get-music``

### Get Information about Available Devices:

``node main.js get-devices``

### Pause the Currently Playing Music:

``node main.js pause``

### Resume or Start Playing Music:

``node main.js play``

### Play the Next Track:

``node main.js next``

### Play the Previous Track:

``node main.js previous``

### Set Repeat Mode (context, track, or off):
*Replace <option> with 'context', 'track', or 'off'.*

``node main.js repeat <option>``

### Adjust the Music Volume (0-100):

``node main.js volume <volume>``

### Transfer Music Playback to a Specified Device:
*Replace [device_name...] with the name of the device to which you want to transfer playback.*

``node main.js transfer-to [device_name...]``

