/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let lastPosition = { x: 0, y: 0 };  // Initialiser la dernière position connue
let lastDirection = 'down'; // Initialiser la dernière direction connue
let noteWebsite: any;  // Déclaration à déplacer ici pour être accessible dans toutes les fonctions
let cguWebsite: any;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    
    // Ouvrir l'iframe avec les CGU
    cguWebsite = WA.ui.website.open({
        url: "./src/cgu/index.html",
        position: { vertical: "top", horizontal: "middle" },
        size: { height: "30vh", width: "50vw" },
        margin: { top: "10vh" },
        allowApi: true,
    });

    // Injecter le script de gestion des CGU dans l'iframe une fois chargée
    cguWebsite.on('load', () => {
        cguWebsite.execute(`
            const form = document.createElement('form');
            form.id = 'cguForm';
            form.innerHTML = \`
                <input type="checkbox" id="acceptCgu" required>
                <label for="acceptCgu">J'accepte les Conditions Générales d'Utilisation</label>
                <button type="submit">Valider</button>
            \`;

            document.body.appendChild(form);

            document.getElementById('cguForm').addEventListener('submit', function(event) {
                event.preventDefault();
                if (document.getElementById('acceptCgu').checked) {
                    window.parent.postMessage({ action: 'closeCGU' }, '*'); // Remplace '*' par l'origine exacte en production
                } else {
                    alert('Vous devez accepter les CGU pour continuer.');
                }
            });
        `);
    });

    // Écouter les messages envoyés par l'iframe
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

    // Réagit aux changements de la variable 'addRole'.
    WA.state.onVariableChange('addRole').subscribe((addRole) => {
        console.log("La note a été mise à jour :", addRole);
    });

    // Accès à la salle de réunion Jitsi
    WA.room.area.onEnter('jitsiMeetingRoom').subscribe(async () => {
        console.log(`The player ${WA.player.name} has entered the zone.`);
        const playerRole = WA.state.addRole;

        if (playerRole !== 'administrateur') {
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
            // Afficher les autres joueurs à proximité ou toute autre logique...
        }
    });


    // Entrée et sortie de la zone 'visibileRole'
    WA.room.onEnterLayer("visibileRole").subscribe(async () => {
        console.log("Entering visibileRole layer");

        noteWebsite = await WA.ui.website.open({
            url: "./src/role/tableau.html",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "30vh",
                width: "50vw",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });
    });

    WA.room.onLeaveLayer("visibileRole").subscribe(() => {
        if (noteWebsite) noteWebsite.close();
        console.log(WA.state.addRole);
    });

    bootstrapExtra().then(() => {
        WA.state.onVariableChange('addRole').subscribe((newRole) => {
            console.log("Le rôle a été mis à jour :", newRole);
        });
        // ... Autre code pour gérer les entrées/sorties de la zone 'visibileRole' et autres interactions
    }).catch(e => console.error(e));



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

 




export {};
