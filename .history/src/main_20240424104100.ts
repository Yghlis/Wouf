/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let lastPosition = { x: 0, y: 0 };  // Initialiser la dernière position connue
let lastDirection = 'down'; // Initialiser la dernière direction connue

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    // Track player's movement to determine the last known position and direction
    WA.player.onPlayerMove((moveData) => {
        lastPosition = { x: moveData.x, y: moveData.y };
        lastDirection = moveData.direction;
    });

    WA.room.area.onEnter('jitsiMeetingRoom').subscribe(() => {
        console.log(`Le joueur ${WA.player.name} est entré dans la zone.`);
        console.log(`Tags du joueur: ${WA.player.tags.join(', ')}`);
        
            console.log('Accès refusé à la salle jitsiMeetingRoom. Vous n\'avez pas le tag wouf.');

            // Calculate a position in front of the jitsiMeetingRoom based on last direction
            let teleportX = lastPosition.x;
            let teleportY = lastPosition.y;

            switch (lastDirection) {
                case 'down':
                    teleportY -= 1; // Move up one tile
                    break;
                case 'up':
                    teleportY += 1; // Move down one tile
                    break;
                case 'left':
                    teleportX += 1; // Move right one tile
                    break;
                case 'right':
                    teleportX -= 1; // Move left one tile
                    break;
            }

            // Use teleport to move the player
            WA.player.teleport(teleportX, teleportY).then(() => {
                // Display an action message when access is denied
                WA.ui.displayActionMessage({
                    message: "Vous ne pouvez pas accéder à cette conférence, si le problème persiste veuillez contacter un administrateur",
                    callback: () => {
                        // Action after the player confirms the message, if necessary
                        console.log('Le joueur a confirmé le message.');
                    },
                    type: "warning",
                });
            });
        
            console.log('Bienvenue dans la salle jitsiMeetingRoom!');
            const playersAround = WA.players.list();
            console.log('Liste des joueurs présents dans la salle :');
            for (const player of playersAround) {
                console.log(`Joueur: ${player.name}, Tags: ${player.tags.join(', ')}`);
            }
        }
    });

    WA.room.area.onEnter('clock').subscribe(() => {
        console.log('Player entered the area near the clock.');

        // Ouvrir une modalité vers le site Web WorkAdventure
        WA.ui.modal.openModal({
            title: "WorkAdventure website",
            src: './index.html',
            allow: "fullscreen",
            position: "right"
        });
    });



    // Bootstrap the Scripting API Extra library
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
