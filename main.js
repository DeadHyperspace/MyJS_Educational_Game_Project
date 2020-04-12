"use strict";
//Объявили Canvas, подгрузили спрайты главного героя
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let img = new Image();
img.src = "main_character.png";
//обработка нажатия кнопок
function settings() {
    alert("Для управления используйте стрелки");
}
function mission(){
    alert("Соберите все теги в правильной последовательности");
}
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

//Создание объекта главного героя
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
//Переменные связанные с анимацией
mainHero.second_sprite_w = 72;
mainHero.second_sprite_h = 90;
mainHero.third_sprite_w = 72;
mainHero.third_sprite_h = 90;
//2 кадр
mainHero.x_left2 = 80;
mainHero.y_left2 = 93;
mainHero.x_right2 = 80;
mainHero.y_right2 = 192;
mainHero.x_up2 = 80;
mainHero.y_up2 = 288;
mainHero.x_down2 = 80;
mainHero.y_down2 = 288;
//3 кадр
mainHero.x_left3 = 153;
mainHero.y_left3 = 93;
mainHero.x_right3 = 153;
mainHero.y_right3 = 192;
mainHero.x_up3 = 153;
mainHero.y_up3 = 287;
mainHero.x_down3 = 153;
mainHero.y_down3 = 0;
//Буффер для кадров
mainHero.x_buff = 0;
mainHero.y_buff = 0;

mainHero.moveLeft = function moveLeft(){
};
mainHero.moveRight = function moveRight(){
};
mainHero.moveUp = function moveUp(){
};
mainHero.moveDown = function moveDown() {
};
/*TO DO
mainHero.animation = function animation() {
    let i=1;
    switch (i) {
        case 1:
            mainHero.x_buff = mainHero.sprite_w;
            mainHero.y_buff = mainHero.sprite_h;
            i++;
            break;
        case 2:
            mainHero.x_buff = mainHero.second_sprite_w;
            mainHero.y_buff = mainHero.second_sprite_h;
            i++;
            break;
        case 3:
            mainHero.x_buff = mainHero.third_sprite_w;
            mainHero.y_buff = mainHero.third_sprite_h;

    }
};
*/

//Отрисовка и проверка отрисовки изображения и константы для правильной отрисовки и шагов
let counter=0;
function hitTestPoint(x1, y1, w1, h1, x2, y2)
{
    //x1, y1 = x and y coordinates of object 1
    //w1, h1 = width and height of object 1
    //x2, y2 = x and y coordinates of object 2 (usually )
    if((x1 <= x2 && x1+w1 >= x2) &&
        (y1 <= y2 && y1+h1 >= y2)){
        return true;
    }else {
        return false;
    }
}
let countOfTouch = 0;
const STEP = 100;
const START = 0;
img.addEventListener('load', function() {
                            ctx.drawImage(img, START, START, mainHero.sprite_w, mainHero.sprite_h, START, START, mainHero.sprite_w, mainHero.sprite_h);
                                                     }, false);
function keyUpHandler(e){
    countOfTouch+=detectCollusion();
    //gameState();
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
const TAGS = ["<html>", "<head>", "</head>", "<body>", "</body>", "</html>"];
ctx.font = ('15px serif');
let x_words_array=[];
let y_words_array=[];
for(let i = 0; i !== TAGS.length; i++) {
    for (let a = 0; a <= i; a++) {
        x_words_array[i] = randomCorCheck(x_words_array[a], x_words_array[i], max_x);
        //console.log("x " + x_words_array[i]);
        y_words_array[i] = randomCorCheck(y_words_array[a], y_words_array[i], max_y);
        //console.log("y " + y_words_array[i]);
    }
    //console.log(tags[i]);
    ctx.fillText(TAGS[i], x_words_array[i], y_words_array[i]);
}


//Проверка пересечения элементов
let score = 0;
let tags_check=["","","","","",""];
function detectCollusion(){
    for(let i = 0; i!==TAGS.length; i++){
        if((mainHero.current_x + mainHero.sprite_w) >= (x_words_array[i]) &&
            (mainHero.current_x) <= (x_words_array[i] + 40) &&
            (mainHero.current_y + mainHero.sprite_h) >= (y_words_array[i]) &&
            (mainHero.current_y) <= (y_words_array[i] + 10)) {
                tags_check[i] = TAGS[score];
                console.log("CHECK"+tags_check[i]);
                console.log("TAGS"+TAGS[i]);
                console.log("i:"+ i);
                //прилось захардкодить из-за проблемы которой я не понимаю
            if (tags_check[0] === "<html>" ||
                tags_check[1] === "<head>" ||
                tags_check[2] === "</head>" ||
                tags_check[3] === "<body>" ||
                tags_check[4] === "</body>"||
                tags_check[5] === "</html>") {
                    score++;
                    console.log(score);
                    x_words_array[i] = -10;
                    y_words_array[i] = -10;
                    if (score >= 6 && (tags_check[0] === "<html>" ||
                        tags_check[1] === "<head>" ||
                        tags_check[2] === "</head>" ||
                        tags_check[3] === "<body>" ||
                        tags_check[4] === "</body>"||
                        tags_check[5] === "</html>")) {
                        console.log(score);
                        alert("Игра пройдена");
                    }
                }
        }



    }
}

/*
function gameState() {
    for (let i = 0; i !== tags_check.length; i++) {



    }
    console.log(score);
    if (score >= 5) {
        console.log("Игра пройдена");
    }
}
*/