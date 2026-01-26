// Ici, on définit un schéma / un "plan" de comment doit se construire et se comporter un objet de classe "Ball"

class Ball {

    // Les propriétés de notre classe = des variables qui lui "appartiennent"
    position_x;
    position_y;
    speed;
    size;
    color;
    direction_x;
    direction_y;

    // Le constructeur de notre classe = une fonction appelée dès qu'on instancie notre classe (qu'on en créée un "exemplaire" via new Ball() )
    constructor(new_x, new_y, new_speed, new_size, new_color, new_dir_x, new_dir_y) {

        // On se servira souvent du constructeur surtout pour "distribuer" les paramètres d'instanciation aux propriétés correspondantes de l'instance
        this.position_x = new_x;
        this.position_y = new_y;
        this.speed = new_speed;
        this.size = new_size;
        this.color = new_color;
        this.direction_x = new_dir_x;
        this.direction_y = new_dir_y;

        // Note : "this" fera référence à l'instance qu'on est en train de créer
        // On l'utilise pour atteindre les propriétés (ici et dans toutes les méthodes)
    }

    // Les méthodes de notre classe = des fonctions qui lui "appartiennent"

    check_rebound() { // Gestion des directions (cas de rebonds)

        // On peut "surnommer" des expressions booléennes, pour les tester ensuite
        const bottom_collision = (this.position_y >= canvas.height - this.size / 2);
        const top_collision = (this.position_y <= 0 + this.size / 2);
        const right_collision = (this.position_x >= canvas.width - this.size / 2);
        const left_collision = (this.position_x <= 0 + this.size / 2);

        if (left_collision || right_collision) {
            this.direction_x *= -1;
        }

        if (bottom_collision || top_collision) {
            this.direction_y *= -1;
        }

    }

    move() { // Gestion du mouvement (Màj coordonnées)

        this.check_rebound();
        this.position_x += this.speed * this.direction_x;
        this.position_y += this.speed * this.direction_y;
    }

    draw() { // Affichage dans le canvas

        ctx.beginPath(); // Commencer à dessiner (= "poser le crayon")
        ctx.ellipse(
            this.position_x, // coordonnée x du centre de l'ellipse
            this.position_y, // coordonnée y
            this.size / 2, // rayon (vertical)
            this.size / 2, // rayon (horizontal)
            0, // angle d'inclinaison
            0, // point de départ du dessin
            2 * Math.PI // Circonférence à dessiner (ici : 360° donc cercle complet)
        );

        ctx.fillStyle = this.color; // Définir la couleur de remplissage (s'appliquera sur tout ce qu'on dessinera par le suite, jusqu'à ce qu'on définisse une nouvelle couleur)
        ctx.fill(); // Remplir le contour du dessin que l'on vient de faire

    }

}