/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let lastPosition = { x: 0, y: 0 };  // Initialiser la dernière position connue
let lastDirection = 'down'; // Initialiser la dernière direction connue

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    // Track player's movement to determine the last known position and direction
    WA.player.onPlayerMove((moveData) => {
        lastPosition = { x: moveData.x, y: moveData.y };
        lastDirection = moveData.direction;
    });

    WA.room.area.onEnter('jitsiMeetingRoom').subscribe(async () => {
        console.log(`The player ${WA.player.name} has entered the zone.`);
        if (!WA.player.tags.includes('afdfdfdmin')) {
            console.log('Access denied to the jitsiMeetingRoom. You do not have the "admin" tag.');

            // Calculate a position in front of the jitsiMeetingRoom based on last direction
            let teleportX = lastPosition.x;
            let teleportY = lastPosition.y;

            switch (lastDirection) {
                case 'down': teleportY -= 1; break;
                case 'up': teleportY += 1; break;
                case 'left': teleportX += 1; break;
                case 'right': teleportX -= 1; break;
            }

            // Use teleport to move the player
            await WA.player.teleport(teleportX, teleportY);
            WA.ui.displayActionMessage({
                message: "You cannot access this conference, please contact an administrator if the problem persists",
                callback: () => {
                    console.log('The player has confirmed the message.');
                },
                type: "warning",
            });
        } else {
            console.log('Welcome to the jitsiMeetingRoom!');
            await WA.players.configureTracking();
            const players = WA.players.list();
            for (const player of players) {
                console.log(`Player ${player.name} is near you`);
            }
        }
    });

    function openArray() {
        WA.ui.website.open({
            url: "./src/role/tableau.html",
            position: {
                vertical: "middle",
                horizontal: "middle"
            },
            size: {
                width: "90%",
                height: "90%"
            },
            visible: true,
            allowApi: true,
            allowPolicy: "fullscreen"
        }).then(website => {
            console.log("Calendar opened successfully");
        
        }).catch(err => {
            console.error("Error opening calendar", err);
        });
    }

    WA.room.area.onEnter('clock').subscribe(() => {
        openArray();
    });

    // Add the action bar button
    WA.ui.actionBar.addButton({
        id: 'register-btn',
        type: 'action',
        imageSrc: 'https://www.google.com/imgres?q=naruto&imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fnaruto%2Fimages%2Ff%2Ff1%2FNaruto_Partie_I.png%2Frevision%2Flatest%2Fscale-to-width-down%2F1200%3Fcb%3D20151201180820%26path-prefix%3Dfr&imgrefurl=https%3A%2F%2Fnaruto.fandom.com%2Ffr%2Fwiki%2FNaruto_Uzumaki&docid=oRct0Ye4E50Z4M&tbnid=5I4R9HNQovIl2M&vet=12ahUKEwibx76iituFAxWkVqQEHUOJDq0QM3oECBQQAA..i&w=1200&h=900&hcb=2&ved=2ahUKEwibx76iituFAxWkVqQEHUOJDq0QM3oECBQQAA', // Remplacez par l'URL de votre image
        toolTip: 'Register',
        callback: (event) => {
            console.log('Button clicked', event);
            // Quand un utilisateur clique sur le bouton de la barre d'actions 'Register', nous le supprimons.
            WA.ui.actionBar.removeButton('register-btn');
        }
    });
    // Bootstrap the Scripting API Extra library
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

console.log(document);
window.addEventListener('message', function(event) {
    // Assurez-vous que le message vient de la source attendue ou vérifiez le contenu du message
   
        console.log("Data from calendar:", event.data);
    
});

export {};
