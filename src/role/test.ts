import { bootstrapExtra } from "@workadventure/scripting-api-extra";

bootstrapExtra().then(() => {
    // Utiliser 'roleSelect' pour obtenir la référence à l'élément <select>
    const roleSelect = document.getElementById("roleSelect") as HTMLSelectElement;
    const saveButton = document.getElementById("saveButton") as HTMLButtonElement;

    // Vérifie si la variable d'état 'addRole' existe et, si c'est le cas, sélectionne la valeur correspondante dans le <select>
    if (WA.state.addRole) {
        roleSelect.value = WA.state.addRole;
    }

    saveButton.addEventListener("click", () => {
        // Lors de la sauvegarde, prend la valeur sélectionnée du <select>
        WA.state.addRole = roleSelect.value;
        console.log('Rôle sauvegardé:', WA.state.addRole);
    });
}).catch(e => console.error(e));
