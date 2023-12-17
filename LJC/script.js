// 初始化

// 获取元素
const moduleImages = document.querySelectorAll('.module-image');
const progressBar = document.getElementById('progress-bar');
const startGameMessage = document.getElementById('start-game-message');
const GameResult = document.getElementById('game-result');

// 排布图片
var myArray = RandomArray();
// 存储点击次数
let clickCount = 0;
// 存储已点击的图片元素
let clickedImages = [];
// 游戏未开始，不允许点击
let allowClick = false;
// 记录隐藏的元素数量
let hiddenElementsCount = 0;
// 清除计时器
let timerInterval;
// 隐藏游戏结果
GameResult.style.display = 'none';
// 加载正确音频
var audio = new Audio('correct.mp3');
// 游戏未结束
let GameIsOverOrNot = false;

// 按下回车开始游戏
document.addEventListener('keydown', function(event) {
  if (event.key == 'Enter' && !allowClick) {
    // 隐藏开始提示
    startGameMessage.style.display = 'none';
    // 允许点击
    allowClick = true;
    // 清除计时器
    clearTimer();
    // 重置进度条
    resetProgressBar();
    // 启动计时器
    startTimer();
  }
});

// 点击模块
moduleImages.forEach(function(moduleImage, index) {
  moduleImage.addEventListener('click', function() {
    // 点击切换到另一张图片
    if (allowClick && this.src.includes('cover.png')) {
      // 添加翻转效果
      this.classList.add('flipped');
      // 根据随机数显示相应的图片
      this.src = myArray[index] + '.png';
      clickedImages.push(this);
      clickCount++;

      // 如果点击次数达到两次，等待0.3秒后重新将点击过的图片切换为cover.png，并判断是否隐藏该元素
      if (clickCount == 2) {
        // 暂时不允许点击
        allowClick = false;
        setTimeout(function() {
          // 检查两张图片是否相同
          if (clickedImages[0].src == clickedImages[1].src) {
            // 如果相同，隐藏这两张图片对应的元素
            audio.play();
            clickedImages[0].parentNode.style.display = 'none';
            clickedImages[1].parentNode.style.display = 'none';
            // 更新隐藏元素个数
            hiddenElementsCount += 2;
            document.getElementById('hidden-elements-count').innerText = hiddenElementsCount;

            // 判断是否全部匹配完毕
            if (hiddenElementsCount == 12) {
              // 结束游戏
              GameOver();
              return;
            }

          } else {
            // 如果不同，将点击过的图片切换回cover.png
            clickedImages.forEach(function(clickedImage) {
              clickedImage.classList.remove('flipped');
              clickedImage.src = 'cover.png';
            });
          }

          // 重置计数器
          clickCount = 0;
          // 重置已点击的图片数组
          clickedImages = [];
        }, 300);
        // 重新允许点击
        allowClick = true;
      }
    }
  });
});

// 函数

// 随机排布图片函数
function RandomArray() {
  var array = [];
  // 生成1到6的数字，每个数字出现两次
  for (var i = 1; i <= 6; i++) {
    array.push(i);
    array.push(i);
  }
  // 随机排序数字
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

// 重置进度条函数
function resetProgressBar() {
  progressBar.style.width = '0%';
}

// 清除计时器函数
function clearTimer() {
  clearInterval(timerInterval);
}

// 启动计时器函数
function startTimer() {
  let secondsRemaining = 15;
  let startTime = Date.now();

  // 更新进度条函数
  function updateProgressBar() {
    // 检查游戏是否结束
    if (GameIsOverOrNot == true) {
      return;
    }
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const progressWidth = (elapsedSeconds / 14) * 100;
    progressBar.style.width = progressWidth + '%';

    // 检查计时是否结束
    if (elapsedSeconds >= 15) {
      GameOver();
    }else{
      // 更新进度条
      requestAnimationFrame(updateProgressBar);
    }
  }

  // 更新进度条
  requestAnimationFrame(updateProgressBar);

  // 每秒更新计时器
  timerInterval = setInterval(function() {
    // 如果计时结束，游戏结束
    if (secondsRemaining <= 0) {
      GameOver();
    }

    secondsRemaining--;
  }, 1000);
}

// 结束游戏函数
function GameOver(){
  // 游戏结束
  GameIsOverOrNot = true;
  // 不再允许点击
  allowClick = false;
  // 设置进度条宽度为100%
  progressBar.style.width = '100%';
  // 清除计时器
  clearTimer();
  // 显示游戏结果
  GameResult.style.display = 'block';
}
