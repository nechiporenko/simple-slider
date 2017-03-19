# simple-slider

Простой Javascript слайдер, без jQuery зависимостей.
Демо: http://nsv.in.ua/play/simple-slider/

HTML:
см. файл index.html

JS:
вызов слайдера - см. в начале app.js:
var slider = document.getElementById('slider');
if (slider) initSlider();

где slider - ID списка

По умолчанию слайдер запустится с интервалом в 5сек. Интервал можно передать в виде параметра ф-ции, т.е. initSlider(2000) - запустит слайдер с интервалом 2сек.
Разметка пейджера создается динамически.
Если в разметке будет только один элемент (li) - он отобразится но слайдер не запустится. Для старта необходимо минимум 2 элемента разметки.


CSS:
Названия классов (префиксы классов) разметки слайдера можно менять на ваше усмотрение. 
Для улучшения показателей Google PageSpeed стили пейджера вынесены в отдельный css файл. Этот файл скриптом добавляется в head документа после старта слайдера.
В реальном проекте необходимо в js-файле в методе addPagerStyles() указать правильный относительный путь к папке /css темы  - css.setAttribute("href", "/wp-content/themes/yor-theme-name/css/pager.min.css")
Названия классов в этом фале менять нельзя (либо изменить их и в js-файле)





