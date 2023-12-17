// 初始化

// 获取元素
const imageContainers = document.querySelectorAll('.image-container');
const moduleImages = document.querySelectorAll('.module-image');

// 定义位置检查数组
var LocationArray = [0, 0, 0, 0];

// 初始调用
Flip();

// 按下回车准备游戏
document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
      window.location.href = 'Demo.html';
    }
  });


// 函数

// 随机数函数
function RandomNumber(min, max, excludeArray) {
    let randomNumber;
    // 确保生成的随机数不在位置检查数组中
    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludeArray.includes(randomNumber));

    return randomNumber;
}

// 翻转函数
function Flip() {
    // 使用随机数函数生成四个不重复的随机数 abcd
    var a = RandomNumber(1, 12, LocationArray);
    var b = RandomNumber(1, 12, LocationArray.concat(a));
    var c = RandomNumber(1, 12, LocationArray.concat(a, b));
    var d = RandomNumber(1, 12, LocationArray.concat(a, b, c));

    // 更新LocationArray
    LocationArray = [a, b, c, d];

    // 根据LocationArray开始翻转
    for (let i = 0; i < 4; i++) {
        y = Math.floor(Math.random() * (6)) + 1;
        var x = LocationArray[i];
        
        // 获取对应的图片容器和图片元素
        var selectedContainer = document.getElementById('image-container-' + x);
        var selectedImage = selectedContainer.querySelector('.module-image');
        // 添加翻转效果
        selectedImage.classList.add('flipped');
        // 根据随机数显示相应的图片
        selectedImage.src = y + '.png';
    }
    
    // 翻回
    setTimeout(function(){
        FlipBack(LocationArray);
    },1000);
}

// 翻回函数
function FlipBack(LocationArray) {
    for (let i = 0; i < 4; i++) {
        var x = LocationArray[i];
        var ContainerBack = document.getElementById('image-container-' + x);
        var ImageBack = ContainerBack.querySelector('.module-image');
        // 翻回相应的图片
        ImageBack.src = 'cover.png';
        // 移除翻转效果
        ImageBack.classList.remove('flipped');
    }
    // 开始新一轮翻转
    Flip();
}
