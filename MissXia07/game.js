let chk1 = document.querySelector('#chk1');
let chk2 = document.querySelector('#chk2');
let chk3 = document.querySelector('#chk3');
let reset = document.querySelector('.reset')   /*选择网页元素*/

chk1.onclick = function(){
    if (chk1.checked == true){
        chk1.disabled = 'true';
    }
}

chk2.onclick = function(){
    if (chk2.checked == true){
        chk2.disabled = 'true';
    }
}

chk3.onclick = function(){          /*当checkbox被点击后，不允许再点击*/
    if (chk3.checked == true){
        chk3.disabled = 'true';
    }
}

reset.onclick = function(){         /*当reset被点击后，游戏重新开始，允许再次点击游玩*/
    chk1.disabled = false;
    chk1.checked = false;
    chk2.disabled = false;
    chk2.checked = false;
    chk3.disabled = false;
    chk3.checked = false;
}