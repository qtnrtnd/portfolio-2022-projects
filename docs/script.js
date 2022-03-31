const ol = document.querySelector('ol');
const cursor = document.querySelector('.cursor');

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

    const elt = document.elementFromPoint(x, y);

    const currentHover = document.querySelector('.hover');

    if (currentHover && !(currentHover === elt || currentHover.parentElement === elt)) {
        currentHover.classList.remove('hover');
        ol.classList.remove('nested-hover');
    }

    if (elt.classList.contains("hoverable")) {
        elt.classList.add("hover");
        ol.classList.add('nested-hover');
    } else if (elt.parentElement.classList.contains("hoverable")) {
        elt.parentElement.classList.add("hover");
        ol.classList.add('nested-hover');
    }

    setCursorPos(x, y)
});

document.addEventListener('touchstart', function (e) {

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    setCursorPos(x, y);

    cursor.classList.remove('small');
    
});

document.addEventListener('touchend', function () {

    document.querySelectorAll('.hover').forEach(elt => {
        elt.classList.remove('hover')
    });

    ol.classList.remove('nested-hover');

    cursor.classList.add('small');
    
});

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