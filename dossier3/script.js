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

////////////////// GESTION GAME

const game = new Game(canvas);

////////////////// GESTION ANIMATION

setInterval(redraw, 1000 / 60); // 60fps

function redraw() {

    // Vider le canvas (effacer la frame précédente)
    game.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // game.update(); // mouvements, etc - toutes les mises à jour de propriétés pour game, game.player1, game.player2 et game.ball

    // game.draw(); // Tout ce que game doit afficher

}

alert("Version modifiée");