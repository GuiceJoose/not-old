import { useEffect, useRef } from "react";
const Background = () => {
  const canvasRef = useRef(null);
  const getNumberBetween = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const getStarColor = () => {
    return `hsla(${getNumberBetween(200, 360)},100%,${getNumberBetween(
      80,
      100
    )}%, 1)`;
  };
  const addVectors = ([x1, y1, z1], [x2, y2, z2]) => {
    return [x1 + x2, y1 + y2, z1 + z2];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const halfw = canvas.width / 2;
    const halfh = canvas.height / 2;
    const maxInitialZ = 5;
    let acceleration = 0.01;

    const star = function () {
      let v = [];
      this.initializeStar = function () {
        v = [
          getNumberBetween(0 - halfw, halfw),
          getNumberBetween(0 - halfh, halfh),
          getNumberBetween(1, maxInitialZ),
        ];

        this.x = v[0];
        this.y = v[1];
        this.color = getStarColor();
      };

      this.initializeStar();

      this.calcVel = function () {
        return [0, 0, 0 - acceleration];
      };

      this.draw = function () {
        const vel = this.calcVel();
        v = addVectors(v, vel);
        const x = v[0] / v[2];
        const y = v[1] / v[2];
        const x2 = v[0] / (v[2] + acceleration * 0.5);
        const y2 = v[1] / (v[2] + acceleration * 0.5);

        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        if (x < 0 - halfw || x > halfw || y < 0 - halfh || y > halfh) {
          this.initializeStar();
        }
      };
    };

    const starfield = function () {
      const numOfStars = 250;

      let stars = [];

      function init() {
        for (let i = 0; i < numOfStars; i++) {
          stars.push(new star());
        }
      }

      init();

      this.draw = function () {
        ctx.translate(halfw, halfh);

        for (let i = 0; i < stars.length; i++) {
          const currentStar = stars[i];

          currentStar.draw();
        }
      };
    };

    const mStarField = new starfield();

    function draw() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      mStarField.draw();

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Background;
