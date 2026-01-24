
//console.log('JavaScript loaded'); 

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');


    if (navigation.classList.contains('open')) {
        hamButton.textContent = '❎'; 
    } else {
        hamButton.innerHTML = '&#9776;'; 
    }
});

const yearElement = document.querySelector("#currentyear");
const today = new Date();
yearElement.innerHTML = today.getFullYear();


const lastModifiedElement = document.querySelector("#lastModified");
lastModifiedElement.innerHTML = `Last Modification: ${document.lastModified}`;