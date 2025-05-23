const text = "01001000 01100101 01101100 01101100 01101111 Digital World...";
let i = 0;

function type() {
  if (i < text.length) {
    document.querySelector(".typing").textContent += text.charAt(i);
    i++;
    setTimeout(type, 80);
  }
}
type();
