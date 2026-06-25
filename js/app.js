const buttons = document.querySelectorAll(".card button");

buttons.forEach((button,index)=>{

button.addEventListener("click",()=>{

if(index===0){

window.location.href="games/snake/index.html";

}else{

alert("Coming Soon 🚀");

}

});

});