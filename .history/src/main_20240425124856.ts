/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let lastPosition = { x: 0, y: 0 };
let lastDirection = 'down';
let noteWebsite: any;
let cguWebsite: any;

// Configure tracking as soon as the API is ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');

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

    // Track players entering and leaving the nearby zone
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
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1920px-Wikipedia-logo-v2.svg',  // Exemple avec le logo de Wikipedia
        toolTip: 'Register',
        callback: (event) => {
            console.log('Button clicked', event);
            // Utilise openModal pour ouvrir Wikipedia dans un modal
            WA.ui.modal.openModal({
                title: "Wikipedia",
                src: 'https://www.wikipedia.org/',
                allow: "fullscreen",  // Permet le plein écran dans le modal
                position: "right",   // Centre le modal au milieu de l'écran
                size: { width: 800, height: 600 }
            });
        }
    });

    // Track player's movement to determine the last known position and direction
    WA.player.onPlayerMove((moveData) => {
        lastPosition = { x: moveData.x, y: moveData.y };
        lastDirection = moveData.direction;
    });

    WA.state.onVariableChange('addRole').subscribe((addRole) => {
        console.log("Role updated:", addRole);
    });

    WA.room.onEnterLayer("visibileRole").subscribe(async () => {
        console.log("Entering visibileRole layer");
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

    // Change player sprite after 10 seconds
    setTimeout(() => {
        const newSpriteUrl = 'url_to_new_sprite_image.png'; // Adjust the URL to your new sprite image
        WA.player.setPlayerSprite(newSpriteUrl);
        console.log('Sprite has been changed after 10 seconds');
    }, 10000);

    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

export {};
