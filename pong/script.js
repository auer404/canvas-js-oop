// Utilitaires :

function betterRandom(min, max, int_mode = false) {

    let result = Math.random() * (max - min) + min;

    if (int_mode) {
        result = Math.round(result);
    }

    return result;

}

////////////////// GESTION CANVAS

const canvas = document.querySelector("canvas");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.onresize = resizeCanvas;

////////////////// GESTION GAME

const game = new Game(canvas); // ! \ Important : le canvas doit déjà avoir été redimensionné pour que tous les centrages / positionnements soient pris en compte ici.

////////////////// GESTION ANIMATION

setInterval(redraw, 1000 / 60); // 60fps

function redraw() {

    // Vider le canvas (effacer la frame précédente)
    game.clear_screen();

    game.update(); // mouvements, etc - toutes les mises à jour de propriétés pour game, game.player1, game.player2 et game.ball

    game.draw(); // Tout ce que game doit afficher

}