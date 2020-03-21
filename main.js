"use strict";
//Объявили Canvas, подгрузили пикчу гг
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let img = new Image();
img.src = "main_character.png";
//Отрисовка и проверка отрисовки изображения
img.addEventListener('load', function() {
    ctx.drawImage(img, 0, 0, 79, 96, 1, 1, 79, 96);
}, false);
//Обработка нажатия клавиш
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e){
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }else if(e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
    }else if(e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key === "Right" || e.key === "ArrowRight") {
        ctx.clearRect(1, 1, 79, 96);
        alert("gay");
        ctx.drawImage(img, 0, 192, 79, 96, 100, 1, 79, 96);
        rightPressed = false;
    }else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }else if(e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
    }else if(e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
    }
}

//Main Hero Object creation
let mainHero = {};
mainHero.moveLeft = function moveLeft(){

};

mainHero.moveRight = function moveRight(){

};
mainHero.moveUp = function moveUp(){

};
mainHero.moveDown = function moveDown(){

};
