class Pad {

    canvas;
    ctx;
    position_x;
    position_y;
    speed;
    width;
    height;
    color;
    up_key;
    down_key;
    direction_y;
    #score;

    constructor(canvas, new_x, new_y, new_speed, new_width, new_height, new_color, new_up_key, new_down_key) {

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.position_x = new_x;
        this.position_y = new_y;
        this.speed = new_speed;
        this.width = new_width;
        this.height = new_height;
        this.color = new_color;
        this.up_key = new_up_key;
        this.down_key = new_down_key;
        this.direction_y = 0; // Immobile par défaut
        this.#score = 0;

        //window.onkeydown = function(e) {
        window.addEventListener("keydown", function(e) {
            //console.log(this); // Par défaut : window (car on est dans un méthode de window). On veut forcer this à continuer à représenter notre Pad. Pour ce faire, on applique la méthode .bind() à cette fonction, nous permettant d'y "forcer" le contexte de "this"

            if (e.key == this.up_key) {
                this.direction_y = -1;
            }
            if (e.key == this.down_key) {
                this.direction_y = 1;
            }
        }.bind(this));
        //}.bind(this);

        //window.onkeyup = function(e) {
        window.addEventListener("keyup", function(e) {
            if (e.key == this.up_key) {
                this.direction_y = 0;
            }
            if (e.key == this.down_key) {
                this.direction_y = 0;
            }

        }.bind(this));
        //}.bind(this);

    }

    move() {
        
        // Conditions pour appliquer le mouvement (hors appui clavier) :
        // - La raquette ne doit pas être contre le bord haut avec direction_y == -1
        // - La raquette ne doit pas être contre le bord bas avec direction_y == 1

        const top_collision = (this.position_y <= this.height / 2);
        const bottom_collision = (this.position_y >= this.canvas.height - this.height / 2);

        if ( !(top_collision && this.direction_y == -1) && !(bottom_collision && this.direction_y == 1) ) {
            this.position_y += this.speed * this.direction_y;
        }
    }

    draw() {

        this.ctx.fillStyle = this.color;

        this.ctx.fillRect(
            this.position_x - this.width / 2,
            this.position_y - this.height / 2,
            this.width,
            this.height
        )

    }

    increase_score() {
        this.#score++;
        console.log(this.#score);
    }

}