"use strict";
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
