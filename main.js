"use strict";
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let img = new Image();
img.src = "main_character.png";
//Отрисовка и проверка отрисовки изображения
img.addEventListener('load', function() {
    ctx.drawImage(img, 20, 25, 71, 92, 1, 1, 71, 92);
}, false);
//Функции движения
function moveLeft(){
    
}

function moveRight() {

}

function moveUp(){

}

function moveDown() {

}
