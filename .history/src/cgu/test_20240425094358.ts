import { bootstrapExtra } from "@workadventure/scripting-api-extra";

bootstrapExtra().then(() => {
    console.log('Script started successfully');

    document.getElementById('cguForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire
        const isAccepted = (document.getElementById('acceptCgu') as HTMLInputElement).checked;

        if (isAccepted) {
            console.log('CGU accepted');
            
            window.parent.postMessage({ action: 'closeCGU' }, '*');
        } else {
            alert('Vous devez accepter les conditions générales d\'utilisation pour continuer.');
        }
    });
}).catch(e => console.error('Error starting the WorkAdventure script:', e));
