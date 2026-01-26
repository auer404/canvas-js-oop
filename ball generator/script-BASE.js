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

// On veut redessiner en boucle le contenu du canvas (en faisant évoluer des choses d'une frame à la suivante)

setInterval(redraw, 40); // Environ 25 fps

let position_x = canvas.width / 2;
let position_y = canvas.height / 2;

const speed = 5; // pixels par image
const size = 150;
const color = "pink";

function redraw() {

    // Vider le canvas (effacer la frame précédente)
    ctx.clearRect(0 , 0, canvas.width, canvas.height);

    // Faire bouger le cercle :
    // Avancer d'un pixel vers la droite et vers le bas
    position_x += speed;
    position_y += speed;

    // Dessiner un cercle dans le canvas
    ctx.beginPath();
    ctx.ellipse(
        position_x, // coordonnée x du centre de l'ellipse
        position_y, // coordonnée y
        size / 2, // rayon (vertical)
        size / 2, // rayon (horizontal)
        0, // angle d'inclinaison
        0, // point de départ du dessin
        2 * Math.PI // Circonférence à dessiner
    );
    //ctx.stroke(); // Afficher le contour du dessin que l'on vient de faire

    ctx.fillStyle = color; // Définir la couleur de remplissage (s'appliquera sur tout ce qu'on dessinera par le suite, jusqu'à ce qu'on définisse une nouvelle couleur)
    ctx.fill(); // Remplir le contour du dessin que l'on vient de faire

}
