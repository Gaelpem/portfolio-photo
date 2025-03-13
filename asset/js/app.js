"use strict"; 


let about = document.querySelector('.about'); 
let work = document.querySelector('.work'); 
let fashion = document.querySelector('.fashion'); 
let street = document.querySelector('.street')
let arrow = document.getElementById('arrow');
let arrow1 = document.getElementById('arrow1');  
let arrow2 = document.getElementById('arrow2');  

// Fonction pour basculer la rotation et la position
function toggleElement(element, property, value1, value2) {
    element.style[property] = element.style[property] === value1 ? value2 : value1;
}

about.addEventListener('click', () => {
    toggleElement(arrow, "transform", "rotate(180deg)", "rotate(0deg)");
    toggleElement(work, "bottom", "5rem", "25rem");
    toggleElement(fashion, "bottom", "20rem", "40rem");
});

work.addEventListener('click', () => {
    toggleElement(arrow1, "transform", "rotate(180deg)", "rotate(0deg)");
    toggleElement(fashion, "bottom", "30rem", "40rem");
});

fashion.addEventListener('click', () => {
    toggleElement(arrow2, "transform", "rotate(180deg)", "rotate(0deg)");
    toggleElement(street, "bottom", "40rem", "45rem");
});
// animation introduction main
// Crée l’IntersectionObserver
// Crée l’IntersectionObserver

// animation text

let paragraphes = document.querySelectorAll('.paragraphes')

gsap.registerPlugin(ScrollTrigger)


paragraphes.forEach((paragraphe, index)=>{


    let selection = Splitting({target : paragraphe})

    gsap.set(selection[0].chars, { color: "rgba(0, 0, 0, 0.340)" }); // Définit le noir au départ
   gsap.to(selection[0].chars, {
    color: "white",
    stagger: 0.05,
    scrollTrigger: {
        trigger: paragraphe,
        start: "top 27%",
        end: "bottom 20%",
        scrub: true,
    }
});
    
})


const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

//animation footer
// Enregistre ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Sélectionne tous les éléments .demo
let demo = document.querySelectorAll('.demo');

// Parcourt chaque élément .demo
demo.forEach((demos, index) => {
    // Récupère et découpe le texte de l’élément actuel
    const srtText = demos.textContent;
    const splitText = srtText.split('');
    demos.textContent = ""; // Vide l’élément actuel

    // Ajoute les <span> pour chaque lettre
    for (let i = 0; i < splitText.length; i++) {
        demos.innerHTML += "<span>" + splitText[i] + "</span>";
    }

    // Anime les <span> de cet élément avec GSAP
    gsap.fromTo(
        demos.querySelectorAll('span'), // Cible les <span> de cet élément
        {
            y: 50, // Départ : 50px en bas
            opacity: 0 // Invisible
        },
        {
            y: 0, // Arrivée : position normale
            opacity: 1, // Visible
            stagger: 0.05, // Décalage entre lettres
            duration: 1, // Durée par lettre
            ease: "ease-in-out",
            scrollTrigger: {
                trigger: demos, // Déclencheur : cet élément .demo
                start: "top 80%",
                end: "bottom 60%",
                scrub: true,
                markers: false // Pour déboguer
            }
        }
    );
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
// heure

const afficheHeure = () =>{
    const $date = new Date(); 
    let heures = $date.getHours(); 
    let minutes = $date.getMinutes(); 
    let secondes = $date.getSeconds(); 

heures = heures < 10 ? "0" + heures : heures; 
minutes = minutes < 10 ? "0" + minutes : minutes; 
secondes = secondes < 10 ? "0" + secondes : secondes; 

const heureActuelle = heures + ":" + minutes + ":" + secondes; 
document.getElementById("heure").textContent = "Paris,Fr" + "——"+ heureActuelle ; 

setTimeout(afficheHeure, 1000); 
}

afficheHeure()
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
