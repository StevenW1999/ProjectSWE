"use strict";
var randomInt = function (min, max) {
    min = min;
    max = max;
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var randomFloat = function (min, max) {
    min = min;
    max = max;
    return Math.random() * (max - min) + min;
};
console.log(randomFloat);
