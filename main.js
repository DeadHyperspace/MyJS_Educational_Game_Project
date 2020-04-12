"use strict";
//Объявили Canvas, подгрузили спрайты главного героя
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let img = new Image();
img.src = "main_character.png";

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

//Main Hero Object creation
let mainHero = {};
mainHero.current_x = 0;
mainHero.current_y = 0;
mainHero.x_left = 0;
mainHero.y_left = 96;
mainHero.x_right = 0;
mainHero.y_right = 192;
mainHero.x_up = 0;
mainHero.y_up = 288;
mainHero.x_down = 0;
mainHero.y_down = 0;
mainHero.sprite_w = 79;
mainHero.sprite_h = 96;

mainHero.moveLeft = function moveLeft(){
};
mainHero.moveRight = function moveRight(){
};
mainHero.moveUp = function moveUp(){
};
mainHero.moveDown = function moveDown() {
};
mainHero.animation = {
    collusion_detection(){}
}

//Отрисовка и проверка отрисовки изображения и константы для правильной отрисовки и шагов
const STEP = 100;
const START = 0;
img.addEventListener('load', function() {
    ctx.drawImage(img, START, START, mainHero.sprite_w, mainHero.sprite_h, START, START, mainHero.sprite_w, mainHero.sprite_h);
}, false);
function keyUpHandler(e){
    if(e.key === "Right" || e.key === "ArrowRight") {
        if(mainHero.current_x >= 900) {
            ctx.clearRect(mainHero.current_x, mainHero.current_y, STEP, STEP);
            ctx.drawImage(img, START, mainHero.y_right, mainHero.sprite_w, mainHero.sprite_h, mainHero.current_x , mainHero.current_y, mainHero.sprite_w, mainHero.sprite_h);
            rightPressed = false;
        }else {
            ctx.clearRect(mainHero.current_x, mainHero.current_y, STEP, STEP);
            ctx.drawImage(img, START, mainHero.y_right, mainHero.sprite_w, mainHero.sprite_h, mainHero.current_x += STEP, mainHero.current_y, mainHero.sprite_w, mainHero.sprite_h);
            rightPressed = false;
        }
    }else if(e.key === "Left" || e.key === "ArrowLeft") {
        if(mainHero.current_x < 100) {
            ctx.clearRect(mainHero.current_x, mainHero.current_y, STEP, STEP);
            ctx.drawImage(img, START, mainHero.y_left, mainHero.sprite_w, mainHero.sprite_h, mainHero.current_x, mainHero.current_y, mainHero.sprite_w, mainHero.sprite_h);
            leftPressed = false;
        }else {
            ctx.clearRect(mainHero.current_x, mainHero.current_y, STEP, STEP);
            ctx.drawImage(img, START, mainHero.y_left, mainHero.sprite_w, mainHero.sprite_h, mainHero.current_x -= STEP, mainHero.current_y, mainHero.sprite_w, mainHero.sprite_h);
            leftPressed = false;
        }
    }else if(e.key === "Up" || e.key === "ArrowUp") {
        if(mainHero.current_y < 100) {
            ctx.clearRect(mainHero.current_x, mainHero.current_y, STEP, STEP);
            ctx.drawImage(img, START, mainHero.y_up, mainHero.sprite_w, mainHero.sprite_h, mainHero.current_x, mainHero.current_y, mainHero.sprite_w, mainHero.sprite_h);
            upPressed = false;
        }else {
            ctx.clearRect(mainHero.current_x, mainHero.current_y, STEP, STEP);
            ctx.drawImage(img, START, mainHero.y_up, mainHero.sprite_w, mainHero.sprite_h, mainHero.current_x, mainHero.current_y -= STEP, mainHero.sprite_w, mainHero.sprite_h);
            upPressed = false;
        }
    }else if(e.key === "Down" || e.key === "ArrowDown") {

        if (mainHero.current_y >= 400) {
            ctx.clearRect(mainHero.current_x, mainHero.current_y, STEP, STEP);
            ctx.drawImage(img, START, mainHero.y_down, mainHero.sprite_w, mainHero.sprite_h, mainHero.current_x, mainHero.current_y, mainHero.sprite_w, mainHero.sprite_h);
            downPressed = false;
        }else {
            ctx.clearRect(mainHero.current_x, mainHero.current_y, STEP, STEP);
            ctx.drawImage(img, START, mainHero.y_down, mainHero.sprite_w, mainHero.sprite_h, mainHero.current_x, mainHero.current_y += STEP, mainHero.sprite_w, mainHero.sprite_h);
            downPressed = false;
        }
    }
}
//Объявление переменных для функции случайных чисел и её реализация
let min_x_y = 1; //0
let max_y = 4;
let max_x = 9;

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
function randomCorCheck(last_num, current_num, position){
    if(current_num === undefined){
        if(position === max_y){
            current_num = getRandomArbitrary(min_x_y, position)*100-50;
        }
        if(position === max_x){
            current_num = getRandomArbitrary(min_x_y, position)*100+30;
        }
        randomCorCheck(last_num, current_num);
    }
    if(current_num === last_num){
        if(position === max_y){
            current_num = getRandomArbitrary(min_x_y, position)*100-50;
            randomCorCheck(last_num, current_num);
        }
        if(position === max_x){
            current_num = getRandomArbitrary(min_x_y, position)*100+30;
            randomCorCheck(last_num, current_num);
        }
    }

    return current_num;
}
//Текстовый массив слов и его отрисовка в случайном месте на карте
let tags = ["<html>", "<head>", "</head>", "<body>", "</body>", "</html>"];
ctx.font = ('15px serif');
let x_words_array=[];
let y_words_array=[];
for(let i = 0; i !== tags.length; i++) {
    for (let a = 0; a <= i; a++) {
        x_words_array[i] = randomCorCheck(x_words_array[a], x_words_array[i], max_x);
        //console.log("x " + x_words_array[i]);
        y_words_array[i] = randomCorCheck(y_words_array[a], y_words_array[i], max_y);
        //console.log("y " + y_words_array[i]);
    }
    ctx.fillText(tags[i], x_words_array[i], y_words_array[i]);
}

for (c; c <= tags.length; c++) {
    if (mainHero.current_x === x_words_array[c]) {
        let c = 0;
        console.log(mainHero.current_x);
        console.log(x_words_array[c]);

    }

}