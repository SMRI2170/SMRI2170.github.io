const svg = document.getElementById("blockchain");
const width = window.innerWidth;
const height = 150;
const blockCount = 10;
const blockWidth = 120;
const blockHeight = 50;
const spacing = 80;

let blocks = [];

// ランダムな16進数生成関数
function getRandomHash(length = 8) {
  const chars = 'ABCDEF0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ブロック生成
function createBlock(x) {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", 50);
  rect.setAttribute("width", blockWidth);
  rect.setAttribute("height", blockHeight);
  rect.setAttribute("rx", 10);
  rect.setAttribute("ry", 10);
  rect.setAttribute("fill", "#111");
  rect.setAttribute("stroke", "#0f0");
  rect.setAttribute("stroke-width", "2");

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x + blockWidth / 2);
  text.setAttribute("y", 80);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("fill", "#0f0");
  text.setAttribute("font-size", "12");
  text.textContent = getRandomHash();

  group.appendChild(rect);
  group.appendChild(text);

  return group;
}

// 初期ブロック生成
for (let i = 0; i < blockCount; i++) {
  const x = i * (blockWidth + spacing);
  const block = createBlock(x);
  svg.appendChild(block);

  if (i > 0) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x - spacing);
    line.setAttribute("y1", 75);
    line.setAttribute("x2", x);
    line.setAttribute("y2", 75);
    line.setAttribute("stroke", "#0f0");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);
  }

  blocks.push({ element: block, x });
}

// アニメーションループ
function animate() {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].x -= 1;
    blocks[i].element.setAttribute("transform", `translate(${blocks[i].x}, 0)`);
  }

  // ブロックが画面外に出たら再利用
  if (blocks[0].x + blockWidth < 0) {
    const old = blocks.shift();
    const lastX = blocks[blocks.length - 1].x + blockWidth + spacing;
    old.x = lastX;

    // ハッシュ再生成
    const text = old.element.querySelector("text");
    text.textContent = getRandomHash();

    blocks.push(old);
  }

  requestAnimationFrame(animate);
}

animate();
