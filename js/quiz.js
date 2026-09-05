/* 페이지 하단 확인문제 렌더러
   사용법: 페이지에 아래를 넣고 이 파일을 불러온다.
   <div id="pagequiz"></div>
   <script type="application/json" id="quiz-data">[ {s,o,a,e}, ... ]</script>
*/
(function () {
  var host = document.getElementById('pagequiz');
  var raw = document.getElementById('quiz-data');
  if (!host || !raw) return;

  var DATA;
  try { DATA = JSON.parse(raw.textContent); } catch (e) { return; }
  if (!Array.isArray(DATA) || !DATA.length) return;

  var done = 0, correct = 0;

  function build() {
    done = 0; correct = 0;
    host.innerHTML =
      '<div class="q-score" id="q-score">푼 문항 0 / ' + DATA.length + ' · 정답 0</div>' +
      DATA.map(function (d, i) {
        return '<div class="q">' +
          '<div class="qno">Q' + (i + 1) + '</div>' +
          '<div class="stem">' + d.s.replace('___', '<span class="blank">_______</span>') + '</div>' +
          '<div class="opts">' +
            d.o.map(function (t, j) {
              return '<button class="opt" data-q="' + i + '" data-o="' + j + '">' +
                '<span class="lt">(' + 'abcd'[j] + ')</span><span>' + t + '</span></button>';
            }).join('') +
          '</div>' +
          '<div class="sol" id="sol-' + i + '"><div class="sol-label">해설</div>' + d.e + '</div>' +
        '</div>';
      }).join('') +
      '<button class="q-reset" id="q-reset">다시 풀기</button>';

    host.querySelectorAll('.opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var qi = +btn.dataset.q, oi = +btn.dataset.o;
        var box = btn.closest('.q');
        if (box.dataset.answered) return;
        box.dataset.answered = '1';
        done++;
        if (oi === DATA[qi].a) {
          btn.classList.add('correct');
          correct++;
        } else {
          btn.classList.add('wrong');
          box.querySelectorAll('.opt')[DATA[qi].a].classList.add('correct');
        }
        document.getElementById('sol-' + qi).classList.add('show');
        document.getElementById('q-score').textContent =
          '푼 문항 ' + done + ' / ' + DATA.length + ' · 정답 ' + correct;
      });
    });

    document.getElementById('q-reset').addEventListener('click', build);
  }

  build();
})();
