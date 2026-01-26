// Utilitaires :

function betterRandom(min, max, int_mode = false) {

    let result = Math.random() * (max - min) + min;

    if (int_mode) {
        result = Math.round(result);
    }

    return result;

}

function randomColor() {

    const r = betterRandom(0, 255, true);
    const g = betterRandom(0, 255, true);
    const b = betterRandom(0, 255, true);

    return `rgb(${r},${g},${b})`;
}

//////////////////


// A RESOUDRE : Pouvoir créer des balles à 0/0 sans bug de "rebonds infinis"

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Redimensionnement dynamique (pour un canvas pleine fenêtre)
// Note : pour un canvas on ne peut pas passer par CSS
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.onresize = resizeCanvas;

// Instancier un objet de classe "Ball" (en créer un exemplaire) :
// const ball1 = new Ball(
//     55, // x de départ
//     55, // y de départ
//     3, // vitesse (px / image)
//     100, // dimensions
//     "rgb(255,0,0)", // couleur
//     1, // direction X
//     1 // direction Y
// );

// const ball2 = new Ball(
//     canvas.width / 2, // x de départ
//     canvas.height / 2, // y de départ
//     5, // vitesse (px / image)
//     80, // dimensions
//     "green", // couleur
//     -1, // direction X
//     1 // direction Y
// );

const BG = new BallGenerator(
    500, // nombre de balles
    5, // vitesse mini
    15, // vitesse maxi
    25, // taille mini
    50 // taille maxi
);

// On veut redessiner en boucle le contenu du canvas (en faisant évoluer des choses d'une frame à la suivante)

setInterval(redraw, 40); // Environ 25 fps

function redraw() {

    // Vider le canvas (effacer la frame précédente)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // On doit ici "demander à notre balle de se re-dessiner"
    // ball1.move();
    // ball1.draw();

    // ball2.move();
    // ball2.draw();

    BG.draw_all();

}
