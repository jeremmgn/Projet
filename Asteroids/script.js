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
        this.invincible = true;
        this.collision = false;
        this.score = 0;
    }

    draw() {
        ctx.strokeStyle = '#4b80ca';
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

class Asteroide {
    constructor(x, y, taille, vitesse) {
        this.x = x;
        this.y = y;
        this.taille = taille;
        this.vitesse = vitesse;
    }

    draw() {
        ctx.strokeStyle = '#b45252';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2) / 5;
            const x = this.x + this.taille * Math.cos(i * angle);
            const y = this.y + this.taille * Math.sin(i * angle);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    update() {
        this.x += this.vitesse.x;
        this.y += this.vitesse.y;

        if (this.x + this.taille < 0) {
            this.x = canvas.width + this.taille;
        } else if (this.x - this.taille > canvas.width) {
            this.x = -this.taille;
        }

        if (this.y + this.taille < 0) {
            this.y = canvas.height + this.taille;
        } else if (this.y - this.taille > canvas.height) {
            this.y = -this.taille;
        }
    }

    collision(vaisseau) {
        const distance = Math.sqrt((this.x - vaisseau.x) ** 2 + (this.y - vaisseau.y) ** 2);
        return distance < this.taille + vaisseau.taille;
    }
}

const vaisseau = new Vaisseau(canvas.width / 2, canvas.height / 2, 16);

const asteroides = [];

for (let i = 0; i < 8; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const taille = 36;
    const vitesse = {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8
    };
    asteroides.push(new Asteroide(x, y, taille, vitesse));
}

for (let i = 0; i < 6; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const taille = 72;
    const vitesse = {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4
    };
    asteroides.push(new Asteroide(x, y, taille, vitesse));
}

for (let i = 0; i < 4; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const taille = 18;
    const vitesse = {
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 12
    };
    asteroides.push(new Asteroide(x, y, taille, vitesse));
}

const etoiles = [];

function dessinerEtoiles(x, y, taille) {
    ctx.beginPath();
    ctx.arc(x, y, taille, 0, 2 * Math.PI);
    ctx.fill();
}

for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const taille = Math.random();
    etoiles.push({ x, y, taille });
}

function fond() {
    for (const etoile of etoiles) {
        ctx.fillStyle = "#E5E4DF";
        dessinerEtoiles(etoile.x, etoile.y, etoile.taille);
    }
}

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

const jouer = document.getElementById('btn-jouer');
const menu = document.getElementById('menu');
const score = document.getElementById('score');
const gameover = document.getElementById('game-over');
const scorefinal = document.getElementById('score-final');
const affichage = document.getElementById('affichage');
const btnaffichage = document.getElementById('btn-affichage');
const rejouer = document.getElementById('btn-rejouer');

jouer.addEventListener('click', () => {
    jeu();
    menu.style.display = 'none';
    if (vaisseau.invincible) {
        setInterval(() => {
            vaisseau.invincible = false;
        }, 3000);
    }
});

rejouer.addEventListener('click', () => {
    vaisseau.taille = 16;
    vaisseau.x = canvas.width / 2;
    vaisseau.y = canvas.height / 2;
    vaisseau.invincible = true;
    vaisseau.collision = false;
    vaisseau.score = 0;
    score.style.display = 'flex';
    affichage.style.display = 'none';
    if (vaisseau.invincible) {
        setInterval(() => {
            vaisseau.invincible = false;
        }, 3000);
    }
});

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
fond();

function jeu() {
    requestAnimationFrame(jeu);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fond();
    vaisseau.draw();
    vaisseau.update();
    asteroides.forEach(asteroide => {
        asteroide.draw();
        asteroide.update();
        if (!vaisseau.invincible && asteroide.collision(vaisseau)) {
            vaisseau.collision = true;
            if (vaisseau.collision) {
                vaisseau.taille = 0;
                affichage.style.display = 'flex';
                gameover.style.display = 'flex';
                scorefinal.innerHTML = 'SCORE: ' + vaisseau.score;
                btnaffichage.style.display = 'flex';
                score.style.display = 'none';
            }
        }
    });
    if (!vaisseau.collision) {
        vaisseau.score++;
    }
    score.innerHTML = 'SCORE: ' + vaisseau.score;
}
