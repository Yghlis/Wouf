/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let lastPosition = { x: 0, y: 0 };
let lastDirection = 'down';
let noteWebsite: any;
let cguWebsite: any;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

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

    WA.ui.actionBar.addButton({
        id: 'register-btn',
        type: 'action',
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1920px-Wikipedia-logo-v2.svg', 
        toolTip: 'Register',
        callback: (event) => {
            console.log('Button clicked', event);
            WA.ui.modal.openModal({
                title: "Wikipedia",
                src: 'https://www.wikipedia.org/',
                allow: "fullscreen",
                position: "right",
                size: { width: 800, height: 600 }
            });
        }
    });

    WA.player.onPlayerMove((moveData) => {
        lastPosition = { x: moveData.x, y: moveData.y };
        lastDirection = moveData.direction;
        checkNearbyPlayers();
    });

    WA.state.onVariableChange('addRole').subscribe((addRole) => {
        console.log("Role updated:", addRole);
    });

    WA.room.area.onEnter('jitsiMeetingRoom').subscribe(async () => {
        console.log(`The player ${WA.player.name} has entered the zone.`);
        const playerRole = WA.state.addRole;
        if (playerRole !== 'administrateur') {
            console.log('Access denied. You do not have the "admin" role.');
            teleportAway();
        } else {
            console.log('Welcome to the jitsiMeetingRoom!');
        }
    });

    WA.room.onEnterLayer("visibileRole").subscribe(async () => {
        noteWebsite = await WA.ui.website.open({
            url: "./src/role/tableau.html",
            position: { vertical: "top", horizontal: "middle" },
            size: { height: "30vh", width: "50vw" },
            margin: { top: "10vh" },
            allowApi: true,
        });
    });

    WA.room.onLeaveLayer("visibileRole").subscribe(() => {
        if (noteWebsite) noteWebsite.close();
    });

    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

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

function checkNearbyPlayers() {
    WA.players.getPlayersAround(lastPosition.x, lastPosition.y, 10).then(players => {
        players.forEach(player => {
            WA.state.loadVariable(`roleOf:${player.id}`).then(role => {
                console.log(`Player near you: ${player.name}, Role: ${role}`);
            });
        });
    });
}

export {};
