const images = ['bau', 'cua', 'tom', 'ca', 'nai', 'ga'];
const spinButton = document.getElementById('spinBtn');
const resetButton = document.getElementById('resetBtn');
const resultBoxes = document.querySelectorAll('.result_box');
const betItems = document.querySelectorAll('.bet-item');
const message = document.getElementById('message');
let bets = {
  bau: 0,
  cua: 0,
  tom: 0,
  ca: 0,
  nai: 0,
  ga: 0,
};

// Đặt cược khi bấm vào hình
betItems.forEach((item) => {
  item.addEventListener('click', () => {
    const name = item.dataset.name;
    if (getTotalBet() < 3) {
      bets[name]++;
      updateBetCount();
    } else {
      alert('Bạn chỉ có thể đặt tối đa 3 điểm!') ;
    }
  });
});

// Cập nhật số điểm đặt cược hiển thị
function updateBetCount() {
  betItems.forEach((item) => {
    const name = item.dataset.name;
    item.querySelector('.bet-count').textContent = bets[name];
  });
}

// Lấy tổng số điểm đặt cược
function getTotalBet() {
  return Object.values(bets).reduce((a, b) => a + b, 0);
}

resetButton.addEventListener('click', () => {
  bets = {
    bau: 0,
    cua: 0,
    tom: 0,
    ca: 0,
    nai: 0,
    ga: 0,
  };
  updateBetCount();
  resultBoxes.forEach((box) => (box.style.backgroundImage = 'none'));
});

spinButton.addEventListener('click', () => {
  spinButton.disabled = true;

  // Quay kết quả ngẫu nhiên
  let results = [];
  resultBoxes.forEach((box, index) => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    results.push(randomImage);
    setTimeout(() => {
      box.style.backgroundImage = `url('img/${randomImage}.png')`;
    }, 1000);
  });

  // So sánh kết quả sau khi quay xong
  setTimeout(() => {
    checkResults(results);
    spinButton.disabled = false;
  }, 1000);
});

// Kiểm tra kết quả quay và cược
function checkResults(results) {
  let win = false;
  results.forEach((result) => {
    if (bets[result] > 0) {
      win = true;
    }
  });

  if (win) {
    alert('Chúc mừng! Bạn đã đoán đúng!');
  } else {
    alert( 'Rất tiếc! Bạn đã đoán sai!');
  }
}
