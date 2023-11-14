export default class Scene {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.lastUpdate = 0;
      this.balls = [];
    }
    initScroll() {

      this.fontSize = this.w > this.h ? this.w * 0.05 : this.h * 0.1;
      this.scroller = {
        fontSize: this.fontSize,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam iusto, consequuntur neque soluta at hic sint magnam libero ea cum repudiandae asperiores sunt eius officia expedita culpa exercitationem unde laudantium!',
        textWidth: 0,
        yloc: this.h - this.fontSize,
        xloc: this.w,
        rate: 4,
        font: `400 ${this.fontSize}px 'Special Elite'`,
      }
      let gradient = this.ctx.createLinearGradient(0, this.scroller.yloc, 0, this.h);
      gradient.addColorStop(0, 'rgb(60, 20, 0)');
      gradient.addColorStop(0.4, 'rgb(170, 58, 0)');
      gradient.addColorStop(0.6, 'rgb(170, 58, 0)');
      gradient.addColorStop(1, 'rgb(60, 20, 0)');
      this.scroller.textColor = gradient;
      let gradient1 = this.ctx.createLinearGradient(0, this.scroller.yloc, 0, this.h);
      gradient1.addColorStop(0, 'rgba(0,0,0,1)');
      gradient1.addColorStop(.2, 'rgba(0,0,0,.3)');
      gradient1.addColorStop(0.5, 'rgba(0,0,0,0)');
      gradient1.addColorStop(.8, 'rgba(0,0,0,.3)');
      gradient1.addColorStop(1, 'rgba(0,0,0,1)');
      this.scroller.textColor1 = gradient1;
    }
    scrollText() {
      let { textWidth: tW, font, text, xloc, rate } = this.scroller
      if (!tW) {
        this.ctx.font = font;
        const toUpp = text.toUpperCase();
        tW = this.ctx.measureText(toUpp).width;
      }
      (tW + xloc < 0) 
      ? this.scroller.xloc = this.w
      : this.scroller.xloc -= rate * (this.delta / 16.67);
    }
    drawText() {
      let { font, text, xloc, yloc, textColor, textColor1 } = this.scroller
      this.ctx.beginPath();
      this.ctx.font = font;
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = textColor;
      this.ctx.fillText(text.toUpperCase(), xloc, yloc);
      this.ctx.fillStyle = textColor1;
      this.ctx.fillText(text.toUpperCase(), xloc, yloc);
    }
    rnd(rndNumber) {
      return Math.floor(Math.random() * rndNumber);
    }
    randomRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    initBalls() {
      const $_maxballs = 8;
      const $_XspeedRange = [-1, 1];
      const $_YspeedRange = [-1, 1];
      const $_lifeTimeRange = [300, 650];
      let $_sizeRange = this.$_sizeRange;
      this.size = this.randomRange($_sizeRange[0], $_sizeRange[1]);
      let ball = {
        size: this.size,
        xSpeed: this.randomRange($_XspeedRange[0], $_XspeedRange[1]),
        ySpeed: this.randomRange($_YspeedRange[0], $_YspeedRange[1]),
        lifeTime: this.randomRange($_lifeTimeRange[0], $_lifeTimeRange[1]),
        age: 0,
        colors: {
          red: 140,
          green: this.rnd(255),
          blue: this.rnd(128),
          alpha: 0,
        },
        x: this.randomRange(this.size, this.w - this.size),
        y: this.randomRange(this.size, this.h - this.size),
      }
      if (this.balls.length !== $_maxballs) {
        this.balls.push(ball);
      }
    }
    moveBalls() {
      const { width: w, height: h } = this.canvas;
      this.balls.forEach((ball) => {
        let { x, y, size, ySpeed, xSpeed, lifeTime } = ball;
        let { alpha } = ball.colors;
        if ((x + size >= w && xSpeed > 0) || (size >= x && xSpeed < 0)) {
          ball.xSpeed = -xSpeed;
        }
        if ((y + size >= h && ySpeed > 0) || (y <= size && ySpeed < 0)) {
          ball.ySpeed = -ySpeed;
        }
        ball.x += xSpeed * (this.delta / 16.67);
        ball.y += ySpeed * (this.delta / 16.67);
        ball.age++;
        if (ball.age < lifeTime / 2) {
          ball.colors.alpha += 1 / (lifeTime / 2);
          ball.xSpeed *= 1.01;
          ball.ySpeed *= 1.01;
          if (alpha > 1) {
            ball.colors.alpha = 1;
          }
        } else {
          ball.colors.alpha -= 1 / (lifeTime / 2);
          ball.xSpeed *= 0.99;
          ball.ySpeed *= 0.99;
          if (alpha < 0) {
            ball.colors.alpha = 0;
          }
        }
      });
    }
    drawBalls() {
      const { width: w, height: h } = this.canvas;
      this.balls.forEach((ball) => {
        let { x, y, size: s } = ball;
        let rW = s / w;
        let rH = s / h;
        let hW = w / 2;
        let hH = h / 2;
        let WD1 = x + (hW - x) * rW;
        let WD2 = x - (x - hW) * rW;
        let HD1 = y + (hH - y) * rH;
        let HD2 = y - (y - hH) * rH;
        let { red: r, green: g, blue: b, alpha: a } = ball.colors;
        const grd = this.ctx.createRadialGradient((x > hW) ? WD1 : WD2, (y > hH) ? HD1 : HD2, 0, x, y, s);
        grd.addColorStop(0.000, `rgba(${r},${g},${b},${a})`);
        grd.addColorStop(1.000, `rgba(0, 0, 0, ${a * 0.3})`);
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.2})`;
        this.ctx.fillStyle = grd;
        this.ctx.arc(x, y, s, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.fill();
      });
    }
    removeBalls() {
      let i = this.balls.length;
      while (i--) {
        let ball = this.balls[i];
        if (ball.age >= ball.lifeTime) {
          this.balls.splice(i, 1);
        }
      }
    }
    clearScreen() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }
    renderLoop(now) {
      this.delta = (now - this.lastUpdate).toFixed(2) * 1;
      this.removeBalls();
      this.clearScreen();
      this.initBalls();
      this.scrollText();
      this.moveBalls();
      this.drawText();
      this.drawBalls();
      this.lastUpdate = now;
      window.requestAnimationFrame((now) => {
        this.renderLoop(now)
      });
    }
    fitToScreen(el) {
      el.width = window.innerWidth;
      el.height = window.innerHeight;
      this.w = el.width
      this.h = el.height
      this.w > this.h
      ? this.$_sizeRange = [this.w / 30, this.w / 10 ]
      : this.$_sizeRange = [this.h / 20, this.h / 7];
      this.initScroll()
    }
    addListener() {
      window.addEventListener('resize', () => {
        this.fitToScreen(this.canvas);
      });
    }
    run() {
      this.fitToScreen(this.canvas);
      this.addListener();
      this.initBalls();
      this.renderLoop(0);
    }
  }