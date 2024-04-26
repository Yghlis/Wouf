/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


let lastPosition = { x: 0, y: 0 };  // Initialiser la dernière position connue
let lastDirection = 'down'; // Initialiser la dernière direction connue
let cguWebsite: any;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('CA MARCHE')

    cguWebsite = WA.ui.website.open({
        url: "./src/cgu/index.html",
        position: { vertical: "top", horizontal: "middle" },
        size: { height: "30vh", width: "50vw" },
        margin: { top: "10vh" },
        allowApi: true,
    });

    // Écoute les messages envoyés par les iframes
    window.addEventListener('message', (event) => {
        if (event.data.action === 'closeCGU') {
            if (cguWebsite) {
                cguWebsite.close();
                console.log('CGU window closed');
            }
        }
    });

    // Track player's movement to determine the last known position and direction
    WA.player.onPlayerMove((moveData) => {
        lastPosition = { x: moveData.x, y: moveData.y };
        lastDirection = moveData.direction;
    });


    // Accès à la salle de réunion Jitsi
    WA.room.area.onEnter('jitsiMeetingRoom').subscribe(async () => {
        console.log(`The player ${WA.player.name} has entered the zone.`);
        const playerTags = WA.player.tags; // Récupérer les tags du joueur

        console.log('Player tags:', playerTags);

        if (!playerTags.includes('administrateur')) {
            console.log('Access denied to the jitsiMeetingRoom. You do not have the "admin" role.');

            let teleportX = lastPosition.x;
            let teleportY = lastPosition.y;
            switch (lastDirection) {
                case 'down': teleportY -= 1; break;
                case 'up': teleportY += 1; break;
                case 'left': teleportX += 1; break;
                case 'right': teleportX -= 1; break;
            }
            await WA.player.teleport(teleportX, teleportY);

            WA.ui.displayActionMessage({
                message: "You cannot access this conference, please contact an administrator if the problem persists",
                callback: () => console.log('The player has confirmed the message.'),
                type: "warning",
            });
        } else {
            console.log('Welcome to the jitsiMeetingRoom!');
        }
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
                allowApi: true,
               
            });
        }
    });

    // Bootstrap the Scripting API Extra library
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));




export {};
