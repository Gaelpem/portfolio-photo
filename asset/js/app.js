"use strict"; 

let about = document.querySelector('.about'); 
let work = document.querySelector('.work'); 
let portrait = document.querySelector('.portrait'); 
let arrow = document.getElementById('arrow');
let arrow1 = document.getElementById('arrow1');  



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

 portrait.classList.toggle('down'); 
 let isDown2 = portrait.classList.contains('down'); 
 if(isDown2){
     portrait.style.bottom = '20rem'; 
 }else{
     portrait.style.bottom = '40rem'; 
 }



})  









work.addEventListener('click',()=>{
    
    arrow1.classList.toggle('turn'); 
    let isActive =  arrow1.classList.contains('turn'); 
    
    if(isActive){
     arrow1.style.transform = 'rotate(180deg)'; 
 }else{
     arrow1.style.transform = 'rotate(0deg)'; 
 }

  
 portrait.classList.toggle('down'); 
 let isDown = portrait.classList.contains('down'); 
 if(isDown){
     portrait.style.bottom = '30rem'; 
 }else{
     portrait.style.bottom = '40rem'; 
 }




})  


