const minX = 0;
const minY = 0;
const maxX = 1300;
const maxY = 600;
const bubbleCount = 24;

//holds wall boundaries
let walls;

// let newBubble

let bubbles = [];

function startBubbles() {
  container.init();
  walls = container.getWalls();
  const randInits = []; // array of {rx, ry, rradius} that were initialized with getRandomInt

  for (let i = 0; i < bubbleCount; i++) {
    let randRadius = getRandomInt(5, 25);
    let ranX = getRandomInt(walls.left, walls.right - 2 * randRadius);
    let ranY = getRandomInt(walls.top, walls.bottom - 2 * randRadius);

    if (randInits.length === 0) {
      randInits.push({ rx: ranX, ry: ranY, rradius: randRadius });
    }

    //re-adjust colliding inits of (x,y)
    //FAILS FOR bubbleCOUNT > 20 BECAUSE OF REINITIALIZING BY FOLLOWING CONDITION FOR ENORMOUS POINTS + MATH LOAD + SETINTERVAL LOAD
    randInits.forEach((p) => {
      while (
        ranX + 2 * randRadius >= p.rx &&
        ranX <= p.rx + 2 * p.rradius &&
        ranY + 2 * randRadius >= p.ry &&
        ranY <= p.ry + 2 * p.rradius
      ) {
        ranX = getRandomInt(walls.left, walls.right - 2 * randRadius);
        ranY = getRandomInt(walls.top, walls.bottom - 2 * randRadius);
      }
      randInits.push({ rx: ranX, ry: ranY, rradius: randRadius });
    });

    const newBubble = new Bubble(randRadius, ranX, ranY);
    newBubble.initbubble();
    container.start();
  }
}

function endBubbles() {
  bubbles = [];
  container.clear();
}
let container = {
  reqFrame: -1,
  box: document.createElement("div"),
  init: function () {
    this.box.setAttribute("id", "box");
    this.box.style.width = maxX + "px";
    this.box.style.height = maxY + "px";
    this.box.style.margin = "10px auto";
    document.body.insertBefore(this.box, document.body.childNodes[0]);
  },
  start: function () {
    this.reqFrame = window.requestAnimationFrame(updateGameArea);
  },
  stop: function () {
    window.cancelAnimationFrame(this.reqFrame);
  },
  clear: function () {
    document.getElementById("box").innerHTML = "";
  },

  getWalls: function () {
    return this.box.getBoundingClientRect();
  },
};

function Bubble(radius = 55, x, y) {
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.mass = radius ** 2;

  // this.dx = (Math.random() > 0.5) ? 1*Math.random()*5: -Math.random()*5
  // this.dy = (Math.random() > 0.5) ? 1*Math.random()*5: -Math.random()*5
  this.dx = Math.random();
  this.dy = Math.random();
  this.bubbleHandle = document.createElement("div");
  this.speed = () => {
    return Math.sqrt(this.dx ** 2 + this.dy ** 2);
  };
  this.angle = () => {
    return Math.atan(this.dy, this.dx);
  };

  this.initbubble = function () {
    this.bubbleHandle.classList.add("bubble");
    this.bubbleHandle.style.position = "absolute";
    this.bubbleHandle.style.borderRadius = "50%";
    this.bubbleHandle.style.width = 2 * this.radius + "px";
    this.bubbleHandle.style.height = 2 * this.radius + "px";
    this.bubbleHandle.style.left = this.x + "px";
    this.bubbleHandle.style.top = this.y + "px";

    document.getElementById("box").appendChild(this.bubbleHandle);
    bubbles.push(this);
  };

  this.update = () => {
    this.bubbleHandle.style.left = this.x + "px";
    this.bubbleHandle.style.top = this.y + "px";
    document.getElementById("box").appendChild(this.bubbleHandle);
  };
  this.newPos = () => {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    this.checkbubbleCollision();
    this.checkWallCollision();
  };

  this.checkWallCollision = function () {
    if (this.x + 2 * this.radius + this.dx >= walls.right) {
      this.dx = -this.dx;
    }
    if (this.y + 2 * this.radius + this.dy >= walls.bottom) {
      this.dy = -this.dy;
    }
    if (this.x + this.dx <= walls.left) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy <= walls.top) {
      this.dy = -this.dy;
    }
  };

  this.checkbubbleCollision = function () {
    bubbles.forEach((bubble) => {
      if (bubble !== this) {
        let distanceX =
          bubble.x +
          bubble.dx +
          bubble.radius -
          (this.x + this.dx + this.radius);
        let distanceY =
          bubble.y +
          bubble.dy +
          bubble.radius -
          (this.y + this.dy + this.radius);
        let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        if (this.radius + bubble.radius >= distance) {
          let theta1 = this.angle();
          let theta2 = bubble.angle();
          let phi = Math.atan2(bubble.y - this.y, bubble.x - this.x);
          let m1 = this.mass;
          let m2 = bubble.mass;
          let v1 = this.speed();
          let v2 = bubble.speed();

          let dx1F =
            ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
              2 * m2 * v2 * Math.cos(theta2 - phi)) /
              (m1 + m2)) *
              Math.cos(phi) +
            v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
          let dy1F =
            ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
              2 * m2 * v2 * Math.cos(theta2 - phi)) /
              (m1 + m2)) *
              Math.sin(phi) +
            v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
          let dx2F =
            ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
              2 * m1 * v1 * Math.cos(theta1 - phi)) /
              (m1 + m2)) *
              Math.cos(phi) +
            v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
          let dy2F =
            ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
              2 * m1 * v1 * Math.cos(theta1 - phi)) /
              (m1 + m2)) *
              Math.sin(phi) +
            v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);

          this.dx = dx1F;
          this.dy = dy1F;
          bubble.dx = dx2F;
          bubble.dy = dy2F;

          staticCollision(this, bubble);
          this.checkWallCollision();
        }
      }
    });
  };
}

function staticCollision(ob1, ob2, emergency = false) {
  let distanceX = ob1.x + ob1.radius - (ob2.x + ob2.radius);
  let distanceY = ob1.y + ob1.radius - (ob2.y + ob2.radius);
  let distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

  let overlap = ob1.radius + ob2.radius - distance;
  let smallerObject = ob1.radius < ob2.radius ? ob1 : ob2;
  let biggerObject = ob1.radius > ob2.radius ? ob1 : ob2;
  if (emergency) [smallerObject, biggerObject] = [biggerObject, smallerObject];

  let theta = Math.atan2(
    biggerObject.y - smallerObject.y,
    biggerObject.x - smallerObject.x
  );
  smallerObject.x -= overlap * Math.cos(theta);
  smallerObject.y -= overlap * Math.sin(theta);

  if (distance < ob1.radius + ob2.radius) {
    if (!emergency) staticCollision(ob1, ob2, true);
  }
}
let lastRenderTime = 0;

updateGameArea = (timestamp) => {
  if (!lastRenderTime) {
    lastRenderTime = timestamp;
  }
  const secondsSinceLastRender = (timestamp - lastRenderTime) / 1000;
  window.requestAnimationFrame(updateGameArea);
  if (secondsSinceLastRender < 0.0009) {
    return;
  }
  container.clear();
  bubbles.forEach((b) => {
    b.newPos();
    b.update();
  });
  lastRenderTime = timestamp;
};

if (bubbleMode) {
  startBubbles();
}

container.box.addEventListener("mousedown", (e) => {
  if (e.target.classList[0] === "bubble") {
    new Audio(`../res/sounds/pop2.mp3`).play();
    e.target.style.backgroundImage = "url('../res/images/gif/pop.gif')";
    setTimeout(() => {
      e.target.style.display = "none";
    }, 100);
    setTimeout(() => {
      e.target.style.display = "initial";
      e.target.style.backgroundImage =
        "url('../res/images/sprites/bubble2.png')";
    }, 30000);
  }
});
