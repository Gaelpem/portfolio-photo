"use strict"; 

let about = document.querySelector('.about'); 
let work = document.querySelector('.work'); 
let portrait = document.querySelector('.portrait'); 
let arrow = document.getElementById('arrow'); 



about.addEventListener('click',()=>{
    
    arrow.classList.toggle('turn'); 
    let isActive =  arrow.classList.contains('turn'); 
    
    if(isActive){
     arrow.style.transform = 'rotate(180deg)'; 
 }else{
     arrow.style.transform = 'rotate(0deg)'; 
 }

  
 work.classList.toggle('down'); 
 let isDown = work.classList.contains('down'); 
 if(isDown){
     work.style.bottom = '5rem'; 
 }else{
     work.style.bottom = '25rem'; 
 }
})


