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

////////////////// GESTION BALLE

let dir_x = betterRandom(-1 , 1, true);
while (dir_x == 0) {
    dir_x = betterRandom(-1 , 1, true);
}

let dir_y = betterRandom(-1 , 1, true);
while (dir_y == 0) {
    dir_y = betterRandom(-1 , 1, true);
}

const ball = new Ball(
    canvas, // Le canvas dans lequel la balle se dessinera
    canvas.width / 2, // position x initiale
    canvas.height / 2, // position y initiale (à affiner ?)
    10, // vitesse en px / image
    50,
    "black",
    dir_x, // Direction initiale axe X
    dir_y // Direction initiale axe Y
);

////////////////// GESTION RAQUETTES

const player1 = new Pad(
    canvas,
    20, // pos x
    canvas.height / 2, // pos y
    10, // vitesse
    20, // largeur
    150, // hauteur
    "black",
    "z", // Touche "haut"
    "s" // Touche "bas"
);

////////////////// GESTION ANIMATION

setInterval(redraw, 1000 / 60); // 60fps

function redraw() {

    // Vider le canvas (effacer la frame précédente)
    ball.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // On doit ici "demander à notre balle de se re-dessiner"
     ball.move();
     ball.draw();

     player1.move();
     player1.draw();

}