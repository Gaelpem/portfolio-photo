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

imgPresentation.addEventListener('click', ()=>{
    container.classList.add('open'); 
    container.style.display = 'block'; 
})

back.addEventListener('click', ()=>{
    container.classList.remove('open'); 
    container.style.display = 'none'; 
})

// animation photo

let items  = document.querySelector('items'); 
let indicator = document.

