/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let lastPosition = { x: 0, y: 0 };
let lastDirection = 'down';
let cguWebsite: any;

// Configure player tracking as soon as the API is ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');

    // Configure player tracking with movement
    await WA.players.configureTracking({
        players: true,
        movement: true
    });

    cguWebsite = WA.ui.website.open({
        url: "./src/cgu/index.html",
        position: { vertical: "top", horizontal: "middle" },
        size: { height: "30vh", width: "50vw" },
        margin: { top: "10vh" },
        allowApi: true,
    });

    window.addEventListener('message', (event) => {
        if (event.data.action === 'closeCGU') {
            if (cguWebsite) {
                cguWebsite.close();
                console.log('CGU window closed');
            }
        }
    });

    // Subscribe to players entering, moving around or leaving the vicinity
    WA.players.onPlayerEnters.subscribe(player => {
        console.log(`Player ${player.name} entered your nearby zone`);
    });

    WA.players.onPlayerLeaves.subscribe(player => {
        console.log(`Player ${player.name} left your nearby zone`);
    });

    WA.players.onPlayerMoves().subscribe(event => {
        const { player, newPosition, oldPosition } = event;
        console.log(`Player ${player.name} moved from ${oldPosition.x},${oldPosition.y} to ${newPosition.x},${newPosition.y}`);
    });

    WA.ui.actionBar.addButton({
        id: 'register-btn',
        type: 'action',
        imageSrc: 'http://localhost:5173/tilesets/iconsheesh.png',
        toolTip: 'Register',
        callback: (event) => {
            console.log('Button clicked', event);
            WA.ui.modal.openModal({
                title: 'ash',
                src: 'http://localhost:5173/src/ash.html',
                allow: 'fullscreen',  
                position: 'center',  
                allowApi: true
            });
        }
    });

    // Track player's movement to determine the last known position and direction
    WA.player.onPlayerMove((moveData) => {
        lastPosition = { x: moveData.x, y: moveData.y };
        lastDirection = moveData.direction;
    });

    // Handling Jitsi Meeting Room access based on player tags
    WA.room.area.onEnter('jitsiMeetingRoom').subscribe(async () => {
        console.log(`The player ${WA.player.name} has entered the zone.`);
        const playerTags = WA.player.tags;

        console.log('Player tags:', playerTags);

        if (!playerTags.includes('administrateur')) {
            console.log('Access denied. You do not have the "admin" role.');
            teleportAway();
        } else {
            console.log('Welcome to the jitsiMeetingRoom!');
        }
    });

    // Bootstrap the Scripting API Extra library
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

export {};

function teleportAway() {
    let teleportX = lastPosition.x;
    let teleportY = lastPosition.y;
    switch (lastDirection) {
        case 'down': teleportY -= 1; break;
        case 'up': teleportY += 1; break;
        case 'left': teleportX += 1; break;
        case 'right': teleportX -= 1; break;
    }
    WA.player.teleport(teleportX, teleportY);
}
