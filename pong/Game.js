/*
Bugs :
- Redimensionnement fenêtre -> pas de màj pos_x du Player 2
*/

class Game {

    canvas;
    scoreDisplay1;
    scoreDisplay2;
    ctx;
    player1;
    player2;
    ball;

    constructor(canvas, scoreDisplay1, scoreDisplay2) {

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.scoreDisplay1 = scoreDisplay1;
        this.scoreDisplay2 = scoreDisplay2;

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
            this.scoreDisplay1,
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
            this.scoreDisplay2,
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

    clear_screen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw_net() { // "net" = le filet
        this.ctx.beginPath(); // On commence un nouveau tracé
        this.ctx.moveTo(this.canvas.width / 2 , 0); // On se place ("crayon relevé") au point de départ
        this.ctx.lineTo(this.canvas.width / 2 , this.canvas.height); // On trace une ligne entre le point de départ et celui d'arrivée
        this.ctx.lineWidth = 3; // On règle l'épaisseur du contour qu'on s'apprête à donner au tracé
        this.ctx.stroke(); // On donne un contour à notre tracé (pour qu'il s'affiche)
    }

    reset() {
        this.ball.position_x = this.canvas.width / 2;
    }

    handle_ball_and_walls_collision() {

        // On peut "surnommer" des expressions booléennes, pour les tester ensuite
        const bottom_collision = (this.ball.position_y >= this.canvas.height - this.ball.size / 2);
        const top_collision = (this.ball.position_y <= 0 + this.ball.size / 2);
        const right_collision = (this.ball.position_x >= this.canvas.width - this.ball.size / 2);
        const left_collision = (this.ball.position_x <= 0 + this.ball.size / 2);

        // VARIANTE TROP PEU PRÉCISE, IL FAUDRA DISTINGUER CHAQUE BORD
        // if (left_collision || right_collision) {
        //     this.ball.direction_x *= -1;
        //     // Un joueur gagne un point, mais lequel ???
        // }

        // if (bottom_collision || top_collision) {
        //     this.ball.direction_y *= -1;
        // }

        if (left_collision) {

            this.reset();
            // UN POINT POUR PLAYER2
            this.player2.increase_score();

        } else if (right_collision) {

            this.reset();
            // UN POINT POUR PLAYER1
            this.player1.increase_score();
        }


        if (bottom_collision) {
            this.ball.bounce_to_top();
        } else if (top_collision) {
            this.ball.bounce_to_bottom();
        }

    }

    check_pad_collision(player) { // player = l'un des 2 pads

       // "Hitbox" de la balle - on a besoin des coordonnées des BORDS de la balle
       const ball_top = this.ball.position_y - this.ball.size / 2;
       const ball_bottom = this.ball.position_y + this.ball.size / 2;
       const ball_left = this.ball.position_x - this.ball.size / 2;
       const ball_right = this.ball.position_x + this.ball.size / 2;

       // "Hitbox" du pad concerné (défini par l'argument "player")
       const pad_top = player.position_y - player.height / 2;
       const pad_bottom = player.position_y + player.height / 2;
       const pad_left = player.position_x - player.width / 2;
       const pad_right = player.position_x + player.width / 2;

       // Intersections (bord par bord)
       const ball_intersects_pad_top = (ball_bottom >= pad_top);
       const ball_intersects_pad_bottom = (ball_top <= pad_bottom);
       const ball_intersects_pad_left = (ball_right >= pad_left);
       const ball_intersects_pad_right = (ball_left <= pad_right);

       // Balle et pad "alignés" horizontalement
       const ball_pad_align_y = (ball_intersects_pad_top && ball_intersects_pad_bottom);
       // Balle et pad "alignés" verticalement
       const ball_pad_align_x = (ball_intersects_pad_left && ball_intersects_pad_right);

       // COLLISION si cumul des 2 alignements

       // Cette méthode doit simplement indiquer si OUI ou NON il y a collision entre la balle et player

    //    if (ball_pad_align_x && ball_pad_align_y) {
    //         return true;
    //    } else {
    //         return false;
    //    }

    // Version courte :

        return (ball_pad_align_x && ball_pad_align_y); // true si collision, false sinon

    }

    handle_pads_and_ball_collision() {

        // Si collision balle <-> player1 : balle rebondit vers la droite
        // Si collision balle <-> player 2 : balle rebondit vers la gauche
        if (this.check_pad_collision(this.player1)) {
            this.ball.bounce_to_right();
        } else if (this.check_pad_collision(this.player2)) {
            this.ball.bounce_to_left();
        }

        // ! \ ATTENTION : Rebonds sur tranches des pads non gérés (un peu plus complexe...)

    }

    update() {

        this.handle_ball_and_walls_collision();
        this.handle_pads_and_ball_collision();

        this.ball.move();
        this.player1.move();
        this.player2.move();
    }

    draw() {

        this.draw_net();

        this.ball.draw();
        this.player1.draw();
        this.player2.draw();
    }

}