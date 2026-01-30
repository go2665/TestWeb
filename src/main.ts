const width = 1280;
const height = 720;
const knight = document.getElementById('knight') as HTMLImageElement;
const knightSize = 256;
let knightX = 0, knightY = 0;
const step = 5;

// 어떤 키가 눌려있는지 저장하는 객체
const keyStates: {[key: string]: boolean} = {};

// 입력 상태 관리
window.addEventListener("keydown", (event) => {
  keyStates[event.key] = true;
});
window.addEventListener("keyup", (event) => {
  keyStates[event.key] = false;
});

function updateKnightPos() {
  knight.style.left = `${knightX}px`;
  knight.style.top = `${knightY}px`;
}

// 매 프레임마다 기사 이동
function loop() {
  let moved = false;
  if (keyStates['ArrowUp']) {
    knightY = Math.max(knightY - step, 0);
    moved = true;
  }
  if (keyStates['ArrowDown']) {
    knightY = Math.min(knightY + step, height - knightSize);
    moved = true;
  }
  if (keyStates['ArrowLeft']) {
    knightX = Math.max(knightX - step, 0);
    moved = true;
  }
  if (keyStates['ArrowRight']) {
    knightX = Math.min(knightX + step, width - knightSize);
    moved = true;
  }
  if (moved) updateKnightPos();
  requestAnimationFrame(loop);
}

// 처음 위치 지정, 루프 시작
updateKnightPos();
requestAnimationFrame(loop);