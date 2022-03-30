const ol = document.querySelector('ol');
const cursor = document.querySelector('.cursor');

/*const maxViewportHeight = Math.max(window.screen.availHeight - (window.outerHeight - window.innerHeight), window.innerHeight);
document.body.style.setProperty('--doc-min-height', maxViewportHeight + "px");*/

document.querySelectorAll('li').forEach(li => {

    const dataThumbnail = li.getAttribute('data-thumbnail');
    const thumbnail = document.querySelector(".project-thumbnail[data-thumbnail='" + dataThumbnail + "']");
    //const rightSide = dataThumbnail % 2 === 0;

    const moveHandler = function (e, that) {

        let elt = that ? that : this;

        let x = (e.offsetX - elt.offsetWidth / 2) / 24;
        let y = (e.offsetY - elt.offsetHeight / 2) / 4;

        thumbnail.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
    }

    li.addEventListener('mouseenter', function (e) {

        thumbnail.style.transition = "none";

        moveHandler(e, this);

        thumbnail.offsetHeight;

        thumbnail.style.removeProperty("transition");

        li.addEventListener('mousemove', moveHandler);

        //if (rightSide) {
            thumbnail.style.left = this.offsetLeft + this.offsetWidth + "px";
        /*} else {
            thumbnail.style.left = this.offsetLeft - thumbnail.offsetWidth + "px";
        }*/

        thumbnail.style.top = this.offsetTop + this.offsetHeight / 2 - thumbnail.offsetHeight / 2  + "px";

        ol.classList.add('hovering');
        thumbnail.classList.add('visible');

    });

    li.addEventListener('mouseleave', function () {

        li.removeEventListener('mousemove', moveHandler);
        ol.classList.remove('hovering');
        thumbnail.classList.remove('visible');

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