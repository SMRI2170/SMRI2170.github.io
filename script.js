// 現在時刻の表示
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("ja-JP");
  document.getElementById("time").textContent = `現在時刻: ${timeString}`;
}
setInterval(updateTime, 1000);
updateTime();

// スムーススクロール（オプション）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});
