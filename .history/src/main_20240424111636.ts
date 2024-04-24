/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let lastPosition = { x: 0, y: 0 };  // Initialiser la dernière position connue
let lastDirection = 'down'; // Initialiser la dernière direction connue

// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');
    console.log('Tags du joueur : ', WA.player.tags.join(', ') || 'Aucun tag');

    // Track player's movement to determine the last known position and direction
    WA.player.onPlayerMove((moveData) => {
        lastPosition = { x: moveData.x, y: moveData.y };
        lastDirection = moveData.direction;
    });

    WA.room.area.onEnter('jitsiMeetingRoom').subscribe(async () => {
        console.log(`Le joueur ${WA.player.name} est entré dans la zone.`);
        console.log(`Tags du joueur : ${WA.player.tags.join(', ') || 'Aucun tag'}`);
        if (!WA.player.tags.includes('admin')) {
            console.log('Accès refusé à la salle jitsiMeetingRoom. Vous n\'avez pas le tag admin.');

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
            await WA.player.teleport(teleportX, teleportY);
            WA.ui.displayActionMessage({
                message: "Vous ne pouvez pas accéder à cette conférence, si le problème persiste veuillez contacter un administrateur",
                callback: () => console.log('Le joueur a confirmé le message.'),
                type: "warning",
            });
        } else {
            console.log('Bienvenue dans la salle jitsiMeetingRoom!');
            try {
                await WA.players.configureTracking();
                const players = WA.players.list();
                for (const player of players) {
                    const tagList = player.tags.length > 0 ? player.tags.join(', ') : 'Aucun tag';
                    console.log(`Joueur ${player.name} est près de vous; Tags: ${tagList}`);
                }
            } catch (error) {
                console.error('Erreur lors de la configuration du suivi des joueurs ou de l'énumération des joueurs:', error);
            }
        }
    });

    WA.room.area.onEnter('clock').subscribe(() => {
        console.log('Le joueur est entré dans la zone de l'horloge.');
        WA.ui.modal.openModal({
            title: "Site Web de WorkAdventure",
            src: './index.html',
            allow: "fullscreen",
            position: "right"
        });
    });

    // Bootstrap the Scripting API Extra library
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra prête');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
