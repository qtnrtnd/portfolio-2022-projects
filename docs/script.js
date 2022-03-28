const ol = document.querySelector('ol');
const cursor = document.querySelector('.cursor');

document.querySelectorAll('li').forEach(li => {

    li.addEventListener('mouseenter', function () {
        ol.classList.add('hovering');
    });

    li.addEventListener('mouseleave', function () {
        ol.classList.remove('hovering');

    });

    li.addEventListener('mousemove', function (e) {
        let x = (e.offsetX - this.offsetWidth / 2) / 16;
        let y = (e.offsetY - this.offsetHeight / 2) / 16;

        let thumbnail = this.querySelector('.project-thumbnail');

        thumbnail.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
    });

});

document.addEventListener('mousemove', function (e) {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
});

document.querySelectorAll('.social svg').forEach(a => {

    a.addEventListener('mouseenter', function () {
        cursor.classList.add('small');
    });

    a.addEventListener('mouseleave', function () {
        cursor.classList.remove('small');

    });
})