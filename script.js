'use strict';

// 변수..
// 버튼
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
// 총 합산 점수
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
// 현재 점수
const currentScore0Area = document.querySelector('#current--0');
const currentScore1Area = document.querySelector('#current--1');
// 주사위
const diceEl = document.querySelector('.dice');

// 함수..
// 선수교체
const switchPlayerFunc = () => {
  // 중요.. 0에서 1로 플레이어 교체 전에 원래 플레이어의 current점수를 0으로 만들어줘야해서 먼저 적는다.
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // 중요.. .toggle()로 있는건 없애고 없는건 있게 해줄 수 있다.
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};
// 기본세팅 중복
const init = function () {
  // 재할당
  currentScore = 0; // 이벤트함수 안에 있으면 버튼 누를 때마다 초기화 됨
  activePlayer = 0; // 현재 플레이어
  playing = true; // 현재 게임이 진행중인지
  totalScore = [0, 0]; // 총 합계 점수 배열로 저장

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0Area.textContent = 0;
  currentScore1Area.textContent = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--active');
};

// 기본 세팅하기
// 중요.. 기본 세팅 중복을 피해 함수에 넣었지만 스코프에 의해 밖에서 변수들을 빈 값으로 선언해놓고 함수에서 재할당한다
let currentScore, activePlayer, playing, totalScore;
init();
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// 설명.. roll버튼 이벤트
// [1] 1~6 랜덤숫자 생성 (버튼을 누를 때마다 생성해야하니까 안에 작성)
// [2] 랜덤숫자랑 일치하는 주사위 이미지 띄운다
// [3] 랜덤숫자를 current점수에 계속 더한다
// [4] 랜덤숫자가 1일 때 current점수.textContent는 0이되고 상대 선수로 넘어간다
rollBtn.addEventListener('click', () => {
  if (playing) {
    const randomNum = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.setAttribute('src', `dice-${randomNum}.png`);
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayerFunc(); // 선수교체
    }
  }
});

// 설명.. hold버튼 이벤트 함수..
// [1] 버튼을 누르면 현재점수가 총 합계 점수에 더해진다
// [2] 현재점수가 0으로 바뀐다
// [3] 플레이어가 변경된다
holdBtn.addEventListener('click', () => {
  if (playing) {
    // 이거 2개를 else에 넣어야하나 했는데,,,넣으면 100점이 넘어도 바로 이긴거로 안나오고 다음에 눌렀을 때 작동
    totalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = totalScore[activePlayer];

    // 100점 넘었을 때
    if (totalScore[activePlayer] >= 10) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
      // rollBtn.setAttribute('disabled', '');
      // holdBtn.setAttribute('disabled', '');
    } else {
      switchPlayerFunc(); // 선수교체
    }
  }
});

// 설명.. new버튼 이벤트 함수..
// 중요.. 처음 세팅과 겹치는 부분이 많아서 함수로 만들어서 중복 줄이기
newBtn.addEventListener('click', init);
// score0El.textContent = 0;
// score1El.textContent = 0;
// currentScore0Area.textContent = 0;
// currentScore1Area.textContent = 0;
// currentScore = 0;
// totalScore[0] = 0;
// totalScore[1] = 0;
// playing = true;
// document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
// activePlayer = 0;
// document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
