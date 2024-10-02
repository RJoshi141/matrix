const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cw = window.innerWidth;
let ch = window.innerHeight;

canvas.width = cw;
canvas.height = ch;

window.addEventListener('resize', function () {
  cw = window.innerWidth;
  ch = window.innerHeight;
  canvas.width = cw;
  canvas.height = ch;
  maxColumns = cw / fontSize;
}, true);

let charArr = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
  "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4",
  "5", "6", "7", "8", "А", "В", "Г", "Д", "Є", "Ѕ", "З", "И", "Ѳ", "І", "К",
  "Л", "М", "Н", "Ѯ", "Ѻ", "П", "Ч", "Р", "С", "Т", "Ѵ", "Ф", "Х", "Ѱ", "Ѿ",
  "Ц"
];

let maxCharCount = 300;
let fallingCharArr = [];
let fontSize = 16;  // Slightly larger font for more clarity
let maxColumns = cw / fontSize;
let frames = 0;

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.value = charArr[Math.floor(Math.random() * charArr.length)].toUpperCase();
    this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    this.opacity = 1; // Initial opacity for fading effect
  }

  draw(ctx) {
    this.value = charArr[Math.floor(Math.random() * charArr.length)].toUpperCase();
    this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

    // Fade effect: Opacity decreases as the character falls
    ctx.fillStyle = `rgba(0, 255, 0, ${this.opacity})`;
    ctx.font = fontSize + "px sans-serif";
    ctx.fillText(this.value, this.x, this.y);
    this.y += this.speed;

    // Reduce opacity for the fading effect
    this.opacity -= 0.01;

    // Reset character if it goes off-screen or becomes too transparent
    if (this.y > ch || this.opacity <= 0) {
      this.y = (Math.random() * ch) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.opacity = 1; // Reset opacity
    }
  }
}

let update = () => {
  if (fallingCharArr.length < maxCharCount) {
    let fallingChar = new FallingChar(
      Math.floor(Math.random() * maxColumns) * fontSize,
      (Math.random() * ch) / 2 - 50
    );
    fallingCharArr.push(fallingChar);
  }

  // Adding a lower opacity background for a "glow" effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, cw, ch);

  // Draw the falling characters
  for (let i = 0; i < fallingCharArr.length && frames % 2 === 0; i++) {
    fallingCharArr[i].draw(ctx);
  }

  requestAnimationFrame(update);
  frames++;
};

update();
