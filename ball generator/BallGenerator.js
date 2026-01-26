// Notre générateur devra :
// - Instancier un nombre (paramétrable) de balles
// - Leur donner des paramètres aléatoires (mais bornés via minimum et maximum)
// - En centraliser les actions : draw, move

class BallGenerator {

    ball_array = [];

    constructor(ball_count, min_speed, max_speed, min_size, max_size) {

        /* Rappel arguments pour le constructeur Ball() :
            x (0 + size/2 <-> canvas.width - size/2)
            y (0 + size/2 <-> canvas.height - size/2)
            speed (min et max à personnaliser)
            size (min et max à personnaliser)
            color (100% aleatoire)
            dir_x (1 ou -1)
            dir_y (1 ou - 1)
        */

        for (let i = 0; i < ball_count; i++) {

            const size = betterRandom(min_size, max_size, true);
            const x = betterRandom(size / 2 , canvas.width - size / 2);
            const y = betterRandom(size / 2 , canvas.height - size / 2);
            const speed = betterRandom(min_speed, max_speed, true);
            const color = randomColor();
            //const dir_x = betterRandom(-1 , 1, true); // NON, on veut exclure 0
            //const dir_y = betterRandom(-1 , 1, true); // Idem

            let dir_x = betterRandom(-1 , 1, true);
            let dir_y = betterRandom(-1 , 1, true);
            while (dir_x == 0) {
                dir_x = betterRandom(-1 , 1, true);
            }
            while (dir_y == 0) {
                dir_y = betterRandom(-1 , 1, true);
            }

           this.ball_array.push(new Ball(x, y, speed, size, color, dir_x, dir_y));
        }


    }

    draw_all() {
        for (let b of this.ball_array) {
            b.move();
            b.draw();
        }
    }

}