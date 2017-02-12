/*!
 * simple-slider
 * @author: Avakandy
 * @version: 0.0.1
 * Copyright 2017.
 */


'use strict';

var slider = document.getElementById('slider');

if (slider) initSlider();


function initSlider(time) {
    var slides = slider.getElementsByTagName('li'),
        count = slides.length, //кол-во элементов
        current = 0, //первый видимый элемент
        timeout = 5000, //интервал смены слайдов по-умолчанию
        slideInterval, //переменная для управления автоматической прокруткой,
        buttons, //кнопки пейджера
        method = {};

    if (!isNaN(time)) {//проверим переданное значение времени
        timeout = Math.round(time);
        if (timeout < 1000) timeout = 1000;
    };


    method.addPager = function () {//добавим в разметку пейджер и управление прокруткой
        var pager = document.createElement('div');
        pager.className = 'b-pager';
        for (var i = 0; i < count; i++) {
            var item = document.createElement('span');
            item.className = 'b-pager__item';
            item.setAttribute('data-item', i);
            item.addEventListener('click', function () {
                var data = this.getAttribute('data-item');
                if (data === current) {
                    return false;
                } else {
                    method.goToSlide(data); //переходим на нужный слайд
                }
            });
            pager.appendChild(item);
        };
        slider.appendChild(pager);
        buttons = slider.getElementsByClassName('b-pager__item');
    };

    method.startSlider = function () {//запуск (перпезапуск)
        addClass(slides[current], 'current');
        addClass(buttons[current], 'current');
        slideInterval = setInterval(method.nextSlide, timeout); //запускаем автоматическую прокрутку
    };

    method.pauseSlider = function () {//остановим автоматическую прокрутку
        clearInterval(slideInterval);
    };

    method.hideSlide = function () {
        removeClass(slides[current], 'current');
        removeClass(buttons[current], 'current');
    };

    method.showSlide = function () {
        addClass(slides[current], 'current');
        addClass(buttons[current], 'current');
    };

    method.nextSlide = function () {
        method.hideSlide();
        current = (current + 1) % count;
        method.showSlide();
    };

    method.goToSlide = function (n) {
        method.pauseSlider();
        method.hideSlide();
        current = n;
        method.startSlider();
    };


    //если на странице более чем 1 слайд - запустим
    if (slides.length > 1) {
        method.addPager();
        method.startSlider();
    } else { //иначе просто покажем первый слайд
        addClass(slides[0], 'current');
    }
};


//helpers
function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}
