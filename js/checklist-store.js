/* 체크박스(data-dic 속성)의 선택 상태를 localStorage에 저장하고 복원한다.
   페이지별로 키가 겹치지 않도록 현재 파일 경로를 접두어로 사용한다. */
(function () {
  var PREFIX = 'gtelp-notes:' + location.pathname + ':';
  var boxes = document.querySelectorAll('input[type="checkbox"][data-dic]');
  if (!boxes.length) return;

  boxes.forEach(function (box) {
    var key = PREFIX + box.dataset.dic;
    try {
      box.checked = localStorage.getItem(key) === '1';
    } catch (e) {}
    box.addEventListener('change', function () {
      try {
        localStorage.setItem(key, box.checked ? '1' : '0');
      } catch (e) {}
    });
  });
})();
