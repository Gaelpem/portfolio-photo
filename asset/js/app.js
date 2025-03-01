"use strict"; 

let about = document.querySelector('.about'); 
let work = document.querySelector('.work'); 
let portrait = document.querySelector('.portrait'); 
let arrow = document.getElementById('arrow');
let arrow1 = document.getElementById('arrow1');  

// Fonction pour basculer la rotation et la position
function toggleElement(element, property, value1, value2) {
    element.style[property] = element.style[property] === value1 ? value2 : value1;
}

about.addEventListener('click', () => {
    toggleElement(arrow, "transform", "rotate(180deg)", "rotate(0deg)");
    toggleElement(work, "bottom", "5rem", "25rem");
    toggleElement(portrait, "bottom", "20rem", "40rem");
});

work.addEventListener('click', () => {
    toggleElement(arrow1, "transform", "rotate(180deg)", "rotate(0deg)");
    toggleElement(portrait, "bottom", "30rem", "40rem");
});


//cliquage sur la photo de presentatoion

let imgPresentation = document.querySelector('.img-presentation'); 
let container = document.querySelector('.container'); 
let back = document.querySelector('.back'); 

imgPresentation.addEventListener('click', () => {
    container.classList.add('open'); 
    container.classList.remove('closing'); 
});

back.addEventListener('click', () => {
    container.classList.add('closing'); 
    setTimeout(() => {
        container.classList.remove('open'); 
    }, 500); // Attends la fin de l'animation (0.5s)
});

// animation photo
let items = document.querySelector('.items');
let indicator = document.querySelector('.indicator');
let previewImage = document.querySelector('.img-preview img');
let itemElement = document.querySelectorAll('.item');
let itemImage = document.querySelectorAll('.item img');

let isVertical = window.innerWidth <= 900;

let dimensions = {
    itemSize: 0,
    containerSize: 0,
    indicatorSize: 0,
};

let maxTranslate = 0;
let targetTranslate = 0;
let currentTranslate = 0;
let isClickMove = false;
const activeOpacity = 0.3;
let currentImageIndex = -1;

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function updateDimension() {
    isVertical = window.innerWidth <= 900;
    if (isVertical) {
        dimensions = {
            itemSize: itemElement[0].getBoundingClientRect().height,
            containerSize: items.getBoundingClientRect().height,
            indicatorSize: indicator.getBoundingClientRect().height,
        };
    } else {
        dimensions = {
            itemSize: itemElement[0].getBoundingClientRect().width,
            containerSize: items.scrollWidth,
            indicatorSize: indicator.getBoundingClientRect().width,
        };
    }
    return dimensions;
}

dimensions = updateDimension();
maxTranslate = dimensions.containerSize - dimensions.indicatorSize;

function getImageIndicator() {
    itemImage.forEach((img) => (img.style.opacity = 1));

    const indicatorStart = -currentTranslate;
    const indicatorEnd = indicatorStart + dimensions.indicatorSize;

    let maxOverlape = 0;
    let selectIndex = 0;

    itemElement.forEach((item, index) => {
        const itemStart = index * dimensions.itemSize;
        const itemEnd = itemStart + dimensions.itemSize;

        const overlapStart = Math.max(indicatorStart, itemStart);
        const overlapEnd = Math.min(indicatorEnd, itemEnd);

        const overlap = Math.max(0, overlapEnd - overlapStart);
        if (overlap > maxOverlape) {
            maxOverlape = overlap;
            selectIndex = index;
        }
    });

    itemImage[selectIndex].style.opacity = activeOpacity;
    return selectIndex;
}

function updatePreviewImage(index) {
    if (currentImageIndex !== index) {
        currentImageIndex = index;
        const targetItem = itemElement[index].querySelector('img');
        const targetSrc = targetItem.getAttribute('src');
        previewImage.setAttribute('src', targetSrc);
    }
}

function animate() {
    const lerpFactor = isClickMove ? 0.05 : 0.075;
    currentTranslate = lerp(currentTranslate, targetTranslate, lerpFactor);

    if (Math.abs(currentTranslate - targetTranslate) > 0.01) {
        const transform = isVertical
            ? `translateY(${currentTranslate}px)`
            : `translateX(${currentTranslate}px)`;
        items.style.transform = transform;

        const activeIndex = getImageIndicator();
        updatePreviewImage(activeIndex);
    } else {
        isClickMove = false;
    }

    requestAnimationFrame(animate);
}

container.addEventListener('wheel', (e) => {
    e.preventDefault();
    isClickMove = false;

    let delta = e.deltaY;
    const scrollVelocity = Math.min(Math.max(delta * 0.5, -20), 20);

    targetTranslate = Math.min(
        Math.max(targetTranslate - scrollVelocity, -maxTranslate), 0
    );
}, { passive: false });

let touchStartY = 0;
let touchStartX = 0;

container.addEventListener('touchstart', (e) => {
    if (isVertical) {
        touchStartY = e.touches[0].clientY;
    } else {
        touchStartX = e.touches[0].clientX;
    }
});

container.addEventListener('touchmove', (e) => {
    if (isVertical) {
        let touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        const delta = deltaY;
        const scrollVelocity = Math.min(Math.max(delta * 0.5, -20), 20);
        targetTranslate = Math.min(
            Math.max(targetTranslate - scrollVelocity, -maxTranslate), 0
        );
        touchStartY = touchY;
        e.preventDefault();
    } else {
        let touchX = e.touches[0].clientX;
        const deltaX = touchStartX - touchX;
        const delta = deltaX;
        const scrollVelocity = Math.min(Math.max(delta * 0.5, -20), 20);
        targetTranslate = Math.min(
            Math.max(targetTranslate - scrollVelocity, -maxTranslate), 0
        );
        touchStartX = touchX;
        e.preventDefault();
    }
}, { passive: false });

itemElement.forEach((item, index) => {
    item.addEventListener('click', () => {
        isClickMove = true;
        targetTranslate = -index * dimensions.itemSize +
            (dimensions.indicatorSize - dimensions.itemSize) / 2;

        targetTranslate = Math.max(Math.min(targetTranslate, 0), -maxTranslate);
    });
});

window.addEventListener('resize', () => {
    dimensions = updateDimension();
    maxTranslate = dimensions.containerSize - dimensions.indicatorSize;

    targetTranslate = Math.min(Math.max(targetTranslate, -maxTranslate), 0);
    currentTranslate = targetTranslate;

    const transform = isVertical
        ? `translateY(${currentTranslate}px)`
        : `translateX(${currentTranslate}px)`;

    items.style.transform = transform;
});

itemImage[0].style.opacity = activeOpacity;
updatePreviewImage(0);
animate();