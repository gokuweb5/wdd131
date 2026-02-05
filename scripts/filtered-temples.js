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

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Bern Switzerland Temple",
    location: "Bern, Switzerland",
    dedicated: "1955, September, 11",
    area: 35546,
    imageUrl:
    "images/bern-switzerland-temple.jpeg"
    },
  {
    templeName: "Asuncion Paraguay Temple",
    location: "Asuncion, Paraguay",
    dedicated: "2019, October, 12",
    area: 11906,
    imageUrl:
    "images/asuncion-paraguay-temple.jpeg"
    },
  {
    templeName: "Boise Idaho Temple",
    location: "Boise, Idaho",
    dedicated: "1984, May, 25",
    area: 35868,
    imageUrl:
    "images/boise-idaho-temple.jpeg"
  },
];

function createTempleCard(filteredTemples) {
    // Select the container where the cards will go
  const container = document.querySelector(".gallery");
  
    // clean the container so we don't duplicate when filter
  container.innerHTML = "";

    // go through each temple of the array that we receive
  filteredTemples.forEach(temple => {
    // Create the element <section> 
    let card = document.createElement("section");
    card.classList.add("temple-card"); // class to give style to it

      // we create the content using template literals
    card.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p><span class="label">Location:</span> ${temple.location}</p>
      <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
      <p><span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
    `;

      // we enter the card to the container
    container.appendChild(card);
  });
}

// call the function for the very firs time to show all the temples to load
createTempleCard(temples);

// select by ID
const homeLink = document.querySelector("#home");
const oldLink = document.querySelector("#old");
const newLink = document.querySelector("#new");
const largeLink = document.querySelector("#large");
const smallLink = document.querySelector("#small");

// filter: temples OLD, before 1900
oldLink.addEventListener("click", (e) => {
    e.preventDefault(); // avoid to reload the page
    const oldTemples = temples.filter(temple => {
    
        // getting the year of the string "1888, May, 21"
        const year = parseInt(temple.dedicated.split(",")[0]);
        return year < 1900;
    });
    createTempleCard(oldTemples);
    document.querySelector("main h1").textContent = "Old Temples";
});

// filter: LARGE (Area > 90,000)
largeLink.addEventListener("click", (e) => {
    e.preventDefault();
    const largeTemples = temples.filter(temple => temple.area > 90000);
    createTempleCard(largeTemples);
    document.querySelector("main h1").textContent = "Large Temples";
});

// Filter: Home (Show ALL)
homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    createTempleCard(temples);
});

// Filter: NEW (year >2000)
newLink.addEventListener("click", (e) => {
    e.preventDefault();
    const newTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(",")[0]);
        return year > 2000;
    });
    createTempleCard(newTemples);
    document.querySelector("main h1").textContent = "New Temples";
});

// filter: SMALL (Area <10,000)
smallLink.addEventListener("click", (e) => {
    e.preventDefault();
    const smallTemples = temples.filter(temple => temple.area < 10000);
    createTempleCard(smallTemples);
    document.querySelector("main h1").textContent = "Small Temples";
});

