class Game {

    canvas;
    ctx;
    player1;
    player2;
    ball;

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        // Instancier players et balle...

        let dir_x = betterRandom(-1, 1, true);
        while (dir_x == 0) {
            dir_x = betterRandom(-1, 1, true);
        }

        let dir_y = betterRandom(-1, 1, true);
        while (dir_y == 0) {
            dir_y = betterRandom(-1, 1, true);
        }

        this.ball = new Ball(
            this.canvas, // Le canvas dans lequel la balle se dessinera
            this.canvas.width / 2, // position x initiale
            this.canvas.height / 2, // position y initiale (à affiner ?)
            10, // vitesse en px / image
            50,
            "black",
            dir_x, // Direction initiale axe X
            dir_y // Direction initiale axe Y
        );

        this.player1 = new Pad(
            this.canvas,
            20, // pos x
            this.canvas.height / 2, // pos y
            10, // vitesse
            20, // largeur
            150, // hauteur
            "black",
            "z", // Touche "haut"
            "s" // Touche "bas"
        );

        this.player2 = new Pad(
            this.canvas,
            this.canvas.width - 20, // pos x
            this.canvas.height / 2, // pos y
            10, // vitesse
            20, // largeur
            150, // hauteur
            "black",
            "ArrowUp", // Touche "haut"
            "ArrowDown" // Touche "bas"
        );

    }

}