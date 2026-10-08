// 主题
var root = document.documentElement;
var saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);
document.getElementById('themeBtn').addEventListener('click', function () {
  var now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', now);
  localStorage.setItem('theme', now);
});

// 手机端目录
var menuBtn = document.getElementById('menuBtn');
if (menuBtn) menuBtn.addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('open');
});
document.querySelectorAll('.toc a').forEach(function (a) {
  a.addEventListener('click', function () {
    document.getElementById('sidebar').classList.remove('open');
  });
});

// 阅读进度
var prog = document.getElementById('progress');
window.addEventListener('scroll', function () {
  var h = document.body.scrollHeight - window.innerHeight;
  prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
});

// 目录高亮
var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
var heads = links.map(function (a) { return document.getElementById(decodeURIComponent(a.hash.slice(1))); });
function spy() {
  var y = window.scrollY + 120, cur = 0;
  heads.forEach(function (h, i) { if (h && h.offsetTop <= y) cur = i; });
  links.forEach(function (a, i) { a.classList.toggle('active', i === cur); });
}
window.addEventListener('scroll', spy); spy();

// 搜索目录
var box = document.getElementById('search');
if (box) box.addEventListener('input', function () {
  var q = box.value.trim().toLowerCase();
  links.forEach(function (a) {
    a.style.display = (!q || a.textContent.toLowerCase().indexOf(q) >= 0) ? '' : 'none';
  });
});

// 复制代码
document.querySelectorAll('.copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var code = btn.closest('.codeblock').querySelector('code');
    navigator.clipboard.writeText(code.innerText).then(function () {
      btn.textContent = '已复制';
      setTimeout(function () { btn.textContent = '复制'; }, 1200);
    });
  });
});
