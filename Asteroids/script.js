const style = document.body.style;
style.margin = '0';
style.padding = '0';
style.overflow = 'hidden';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Vaisseau {
    constructor(x, y, taille) {
        this.x = x;
        this.y = y;
        this.taille = taille;
        this.angle = 90 / 180 * Math.PI;
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
}

const vaisseau = new Vaisseau(canvas.width / 2, canvas.height / 2, 12);

function jeu() {
    requestAnimationFrame(jeu);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    vaisseau.draw();
}

jeu();