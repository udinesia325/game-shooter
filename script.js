const line = document.querySelectorAll(".line");
const line1 = document.querySelector(".line-1");
const score = document.querySelector(".score");
const shooter = document.querySelectorAll(".shooter");
const shooter_d = document.querySelector(".shooter-d");
const shooter_f = document.querySelector(".shooter-f");
const shooter_j = document.querySelector(".shooter-j");
const shooter_k = document.querySelector(".shooter-k");

function dispatchScore(type = "inc") {
  if (type == "inc") {
    score.innerHTML = parseInt(score.innerHTML) + 1;
  } else {
    score.innerHTML = parseInt(score.innerHTML) - 1;
  }
}

function makeEnemy() {
  const div = document.createElement("div");
  div.classList.add("enemy");
  return div;
}
const enemyWave = setInterval(() => {
  const randLine = Math.floor(Math.random() * line.length);
  //   console.log(line[randLine]);
  line[randLine].append(makeEnemy());
  //   line1.append(makeEnemy());
}, 1000);

function clearBullet() {
  //hapus musuh setelah ke bawah
  document.querySelectorAll(".bullet")?.forEach((bull) => {
    const bullRect = bull.getBoundingClientRect();
    if (bullRect.top < 0) {
      bull.remove();
    }
  });

  window.requestAnimationFrame(clearBullet);
} //end func

function makeBullet() {
  const div = document.createElement("div");
  div.classList.add("bullet");
  return div;
}

function clearEnemy() {
  //hapus musuh setelah ke bawah
  document.querySelectorAll(".enemy")?.forEach((en) => {
    const enRect = en.getBoundingClientRect();
    if (enRect.bottom > window.innerHeight) {
      en.remove();
    }
  });

  window.requestAnimationFrame(clearEnemy);
}

shooter_d.addEventListener("click", function () {
  this.append(makeBullet());
});
shooter_f.addEventListener("click", function () {
  this.append(makeBullet());
});
shooter_j.addEventListener("click", function () {
  this.append(makeBullet());
});
shooter_k.addEventListener("click", function () {
  this.append(makeBullet());
});
function isCollide() {
  document.querySelectorAll(".bullet")?.forEach((bull) => {
    const bullRect = bull.getBoundingClientRect();
    const target = document.elementsFromPoint(bullRect.x, bullRect.y);
    if (target[0]?.classList.contains("enemy")) {
      bull.remove();
      target[0].remove();
      dispatchScore("inc");
      console.log("boom");
    }
  });
  window.requestAnimationFrame(isCollide);
}
function gameOver() {
  clearInterval(1000);
}
function enemyAttack() {
  //game over jika score telah kosong
  document.querySelectorAll(".enemy")?.forEach((en) => {
    const enRect = en.getBoundingClientRect();
    if (enRect.bottom > window.innerHeight - 100) {
      en.remove();
      dispatchScore("dec");
      if (parseInt(score) == 0) {
        gameOver();
      }
    }
  });
  window.requestAnimationFrame(enemyAttack);
}

window.addEventListener("keyup", (event) => {
  //   console.log(event.code);
  switch (event.key) {
    case "d":
      shooter_d.click();
      break;
    case "f":
      shooter_f.click();
      break;
    case "j":
      shooter_j.click();
      break;
    case "k":
      shooter_k.click();
      break;
    default:
      null;
  }
});

window.requestAnimationFrame(enemyAttack);
window.requestAnimationFrame(isCollide);
window.requestAnimationFrame(clearBullet);
window.requestAnimationFrame(clearEnemy);
