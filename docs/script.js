const ol = document.querySelector('ol');
const cursor = document.querySelector('.cursor');
const social = document.querySelector('.social');
const isTouch = ('ontouchstart' in window);

let showImages;

const resizeHandler = function (thumbnail) {
    if (ol.offsetLeft + ol.offsetWidth + thumbnail.offsetWidth < window.innerWidth) showImages = true;
    else showImages = false;
}

const moveHandler = function (e, elt, thumbnail) {

    let x = (e.offsetX - elt.offsetWidth / 2) / 24;
    let y = (e.offsetY - elt.offsetHeight / 2) / 4;

    thumbnail.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
}

const pointerLeaveHandler = function () {
    document.querySelectorAll('.hover').forEach(elt => {
        elt.classList.remove('hover')
    });

    ol.classList.remove('nested-hover');

    cursor.classList.add('small');
    cursor.classList.remove('small-hover');
}

document.querySelectorAll('li').forEach((li, i) => {

    const dataThumbnail = li.getAttribute('data-thumbnail');
    const thumbnail = document.querySelector(".project-thumbnail[data-thumbnail='" + dataThumbnail + "']");

    const moveHandlerRef = function (e) {
        moveHandler(e, this, thumbnail);
    }

    if (i === 0) {
        resizeHandler(thumbnail);
        window.addEventListener('resize', function () {
            resizeHandler(thumbnail)
        }); 
    }
    
    li.addEventListener('mouseenter', function (e) {

        if (showImages) {

            thumbnail.style.transition = "none";

            moveHandlerRef(e);

            thumbnail.offsetHeight;

            thumbnail.style.removeProperty("transition");

            li.addEventListener('mousemove', moveHandlerRef);

            thumbnail.style.left = this.offsetLeft + this.offsetWidth + "px";

            thumbnail.style.top = this.offsetTop + this.offsetHeight / 2 - thumbnail.offsetHeight / 2  + "px";

            thumbnail.classList.add('visible');
        }

        ol.classList.add('nested-hover');

    });

    li.addEventListener('mouseleave', function () {

        if (showImages) {

            li.removeEventListener('mousemove', moveHandlerRef);
            thumbnail.classList.remove('visible');
        }

        ol.classList.remove('nested-hover');

    });

});

const setCursorPos = function (x, y) {
    cursor.style.top = y + "px";
    cursor.style.left = x + "px";
}

document.addEventListener('touchmove', function (e) {

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const elt = document.elementFromPoint(x, y).closest(".hoverable");

    const currentHover = document.querySelector('.hover');

    if (currentHover && currentHover !== elt) {
        currentHover.classList.remove('hover');
        ol.classList.remove('nested-hover');
        cursor.classList.remove('small-hover');
    }

    if (elt) {
        elt.classList.add("hover");
        if (ol.contains(elt)) ol.classList.add('nested-hover');
        else if(social.contains(elt)) cursor.classList.add('small-hover');
    }

    setCursorPos(x, y)
});

document.addEventListener('touchstart', function (e) {

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    cursor.style.transition = "none";

    setCursorPos(x, y);

    cursor.offsetHeight;

    cursor.style.removeProperty('transition');

    cursor.classList.remove('small');
    
});

if (isTouch) {
    document.addEventListener('click', pointerLeaveHandler);
}

document.addEventListener('touchend', pointerLeaveHandler);

document.addEventListener('mousemove', function (e) {

    if (cursor.classList.contains('small') && !cursor.classList.contains('small-hover')) cursor.classList.remove('small');

    setCursorPos(e.clientX, e.clientY)
});

document.querySelectorAll('.social svg').forEach(a => {

    a.addEventListener('mouseenter', function () {
        cursor.classList.add('small-hover');
    });

    a.addEventListener('mouseleave', function () {
        cursor.classList.remove('small-hover');

    });
})