const canvas = document.getElementById("sandbox");

canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 85;

const ctx = canvas.getContext("2d");

const btn = document.getElementById("btn-opt");

function circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    this.dx = (Math.random() * 4) + 1;
    this.dy = (Math.random() * 4) + 1;

    this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.draw = function () {
        ctx.beginPath();
        ctx.strokeStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
    }

    this.animate = function () {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
        this.draw();
    }
}

function joshName(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;

    this.dx = (Math.random() * 3) + 1;
    this.dy = (Math.random() * 3) + 1;

    this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.drawJoshName = function () {
        ctx.font = "30px monospace";
        //    ctx.fillStyle = this.c;
        ctx.strokeStyle = this.c;
        //    ctx.fillText('Joshua Fulgencio', this.x, this.y);
        ctx.strokeText('Joshua Fulgencio', this.x, this.y);
    }

    this.animateJoshName = function () {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x > canvas.width || this.x < 0) {
            this.dx = -this.dx;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.dy = -this.dy;
        }
        this.drawJoshName();
    }
}

canvas.addEventListener('click', function (e) {
    let r = Math.floor(Math.random() * 30) + 15;
    balls.push(new circle(e.clientX, e.clientY, r, '#FF10F0'));
    joshNames.push(new joshName(e.clientX, e.clientY, '#FF10F0'));
});

const balls = [];
const joshNames = [];

for (let i = 0; i < 10; i++) {
    let r = Math.floor(Math.random() * 30) + 15
    let x = Math.random() * (canvas.width - (r * 2)) + r;
    let y = Math.random() * (canvas.height - (r * 2)) + r;
    let c = '#39FF14';
    balls.push(new circle(x, y, r, c));
    joshNames.push(new joshName(x, y, c));
}

function Update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < balls.length; i++) {
        balls[i].animate();
    }
    requestAnimationFrame(Update);
}

function UpdateJoshName() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < joshNames.length; i++) {
        joshNames[i].animateJoshName();
    }
    requestAnimationFrame(UpdateJoshName);
}

let option = true;

btn.addEventListener("click", function () {
    if (option) {
        Update();
        btn.innerHTML = "Circles"
    } else if (!option) {
        UpdateJoshName();
        btn.innerHTML = "Names"
    }
    console.log("option is clicked!");
    option = !option;
    console.log(option);
});