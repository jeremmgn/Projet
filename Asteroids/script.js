const style = document.body.style;
style.margin = '0';
style.padding = '0';
style.overflow = 'hidden';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Vaisseau {
    constructor(x, y, taille) {
        this.x = x;
        this.y = y;
        this.taille = taille;
        this.angle = 90 / 180 * Math.PI;
        this.rotation = 0;
        this.propulsion = false;
        this.acceleration = 0.2;
        this.vitesse = {
            x: 0,
            y: 0
        };
        this.friction = 0.99;
    }

    draw() {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(
            this.x + 4 / 3 * this.taille * Math.cos(this.angle),
            this.y - 4 / 3 * this.taille * Math.sin(this.angle)
        );
        ctx.lineTo(
            this.x - this.taille * (2 / 3 * Math.cos(this.angle) + Math.sin(this.angle)),
            this.y + this.taille * (2 / 3 * Math.sin(this.angle) - Math.cos(this.angle))
        );
        ctx.lineTo(
            this.x - this.taille * (2 / 3 * Math.cos(this.angle) - Math.sin(this.angle)),
            this.y + this.taille * (2 / 3 * Math.sin(this.angle) + Math.cos(this.angle))
        );
        ctx.closePath();
        ctx.stroke();
    }

    update() {
        this.angle += this.rotation;
        if (this.propulsion) {
            this.vitesse.x += this.acceleration * Math.cos(this.angle);
            this.vitesse.y -= this.acceleration * Math.sin(this.angle);
        }
        this.vitesse.x *= this.friction;
        this.vitesse.y *= this.friction;
        this.x += this.vitesse.x;
        this.y += this.vitesse.y;
        if (this.x < -this.taille) {
            this.x = canvas.width + this.taille;
        }
        if (this.x > canvas.width + this.taille) {
            this.x = -this.taille;
        }
        if (this.y < -this.taille) {
            this.y = canvas.height + this.taille;
        }
        if (this.y > canvas.height + this.taille) {
            this.y = -this.taille;
        }
    }
}

const vaisseau = new Vaisseau(canvas.width / 2, canvas.height / 2, 16);

document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37:
            vaisseau.rotation = - 0.1;
            break
        case 38:
            vaisseau.propulsion = true;
            break
        case 39:
            vaisseau.rotation = 0.1;
            break
    }
});

document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
        case 37:
            vaisseau.rotation = 0;
            break
        case 38:
            vaisseau.propulsion = false;
            break
        case 39:
            vaisseau.rotation = 0;
            break
    }
});

function jeu() {
    requestAnimationFrame(jeu);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    vaisseau.draw();
    vaisseau.update();
}

jeu();