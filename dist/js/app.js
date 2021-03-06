/*!
 * simple-js-slider
 * @author: avakandy
 * @version: 1.0.3
 * Copyright 2017.
 */

(function () {
    'use strict';

    var slider = document.getElementById('slider'), //id списка слайдера
        pager_css = 'css/pager.min.css'; //путь к файлу стилей пейджера
    if (slider) initSlider(); //можно передать значение интервала в качестве параметра, например, initSlider(2000) - для запуска слайдера с интервалом в 2с.


    function initSlider(time) {
        var slides = slider.getElementsByTagName('li'), //элементы слайдера
            buttons, //запишем сюда массив кнопок пейджера
            method = {}, //методы
            handle = {}; //переменные

        handle.count = slides.length; //кол-во слайдов
        handle.current = 0; //текущий слайд
        handle.delay = 5000; //интервал смены слайдов по-умолчанию

        method.addPager = function () {//добавим в разметку пейджер и создадим управление прокруткой
            var pager = document.createElement('div');
            pager.className = 'b-pager';
            for (var i = 0; i < handle.count; i++) {
                var item = document.createElement('span');
                item.className = 'b-pager__item';
                item.setAttribute('data-item', i);
                pager.appendChild(item);
                method.clickOnPager(item);//добавим обработку клика по кнопке (вынесем за пределы цикла)
            }
            method.addPagerStyles();//добавили в head стили пейджера
            slider.appendChild(pager);//добавили кнопки пейджера в слайдер
            buttons = slider.getElementsByClassName('b-pager__item'); //после того как пейджер создан, запишем его элементы в массив
        };

        method.addPagerStyles = function(){
            var css = document.createElement('link');
            css.setAttribute('rel', 'stylesheet');
            css.setAttribute('href', pager_css);
            document.getElementsByTagName("head")[0].appendChild(css);
        };

        method.clickOnPager = function(el){//обработка клика по кнопке пейджера
            el.addEventListener('click', function(){
                var data = el.getAttribute('data-item');
                if (data === handle.current) {
                    return false;
                } else {
                    method.goToSlide(data); //переходим на нужный слайд
                }
            });
        };

        method.startSlider = function () {//запуск (перпезапуск)
            addClass(slides[handle.current], 'current');
            addClass(buttons[handle.current], 'current');
            method.requestInterval();//включаем автоматическую смену слайдов
        };

        method.hideSlide = function () {
            removeClass(slides[handle.current], 'current');
            removeClass(buttons[handle.current], 'current');
        };

        method.showSlide = function () {
            addClass(slides[handle.current], 'current');
            addClass(buttons[handle.current], 'current');
        };

        method.nextSlide = function () {
            method.hideSlide();
            handle.current = (handle.current + 1) % handle.count;
            method.showSlide();
        };

        method.goToSlide = function (n) {
            method.pauseSlider();
            method.hideSlide();
            handle.current = n;
            method.startSlider();
        };

        method.requestInterval = function () {//для более точного выполнения, будем вызывать рекурсивно setTimeout вместо setInterval
            handle.timer = setTimeout(function loop() {
                method.nextSlide();
                handle.timer = setTimeout(loop, handle.delay);
            }, handle.delay);
        };

        method.pauseSlider = function () {//остановим автоматическую прокрутку
            clearTimeout(handle.timer);
        };

        method.init = (function () {
            if (!isNaN(time)) {//проверим переданное значение интервала смены слайдов (если есть, если нет - оставим дефолтное)
                handle.delay = Math.round(time);
                if (handle.delay < 1000) handle.delay = 1000;
            }

            //если на странице более чем 1 слайд - запустим
            if (slides.length > 1) {
                method.addPager();
                method.startSlider();
            } else { //иначе просто покажем первый слайд
                addClass(slides[0], 'current');
            }
        })();
    }


    //helpers. Ф-ции добавить/удалить класс плюс fallback для ie9
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
})();
