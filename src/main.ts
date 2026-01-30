import { clamp } from "./utils/math";

const width = 1280;
const height = 720;
const knight = document.getElementById('knight') as HTMLImageElement;
const knightSize = 256;
let knightX = 0, knightY = 0;
const moveSpeed = 200;

// 어떤 키가 눌려있는지 저장하는 객체
const keyStates: {[key: string]: boolean} = {};

// 입력 상태 관리
window.addEventListener("keydown", (event) => {
  keyStates[event.key] = true;
});
window.addEventListener("keyup", (event) => {
  keyStates[event.key] = false;
});

function moveKnightPos(xDelta:number, yDelta:number) {
    knightX = clamp(knightX + xDelta, 0, width - knightSize);
    knightY = clamp(knightY + yDelta, 0, height - knightSize);
    //knight.style.left = `${knightX}px`;
    //knight.style.top = `${knightY}px`;
    knight.style.transform = `translate(${knightX}px, ${knightY}px)`;
}

// 매 프레임마다 기사 이동
let last = performance.now();
function loop(now = performance.now()) {
    const deltaTime = (now - last) / 1000;
    let moved = false;
    let directionX = 0;
    let directionY = 0;
    if (keyStates['ArrowUp']) {
        directionY -= 1;
        moved = true;
    }
    if (keyStates['ArrowDown']) {
        directionY += 1;
        moved = true;
    }
    if (keyStates['ArrowLeft']) {
        directionX -= 1;
        moved = true;
    }
    if (keyStates['ArrowRight']) {
        directionX += 1;
        moved = true;
    }
    if (moved) {
        let deltaMove = moveSpeed * deltaTime;
        moveKnightPos(directionX*deltaMove, directionY*deltaMove);
    }

    last = now;
    requestAnimationFrame(loop);
}

// 처음 위치 지정, 루프 시작
moveKnightPos(0,0);
requestAnimationFrame(loop);