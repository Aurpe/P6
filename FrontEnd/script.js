const API_BASE_URL = "http://localhost:5678/api/";

function getWorks (){
    return fetch (`${API_BASE_URL}works`) //Route pour recuperer Works via l'api
    .then (response => response.json()) // on demande à la réponse d'être traduite en json
    .then(data => {
        console.table(data);
        displayWorks(data);
    })
    .catch(error =>{
        console.log()
    })
}

const image = {
    url: "http://localhost:5678/api/works",
    title: "Images"
};

function displayWorks(images) {
    const galleryDiv = document.querySelector('.gallery');
    galleryDiv.innerHTML = ''

    images.forEach(image => {
        const galleryItem = document.createElement('figure');

        const imgElement = document.createElement('img');
        imgElement.src = image.imageUrl;
        imgElement.alt = image.title;

        const titleElement = document.createElement('h3');
        titleElement.textContent = image.title;

        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(titleElement);
        galleryDiv.appendChild(galleryItem);
    });
}

getWorks()

const galleryData = [
    { src:"assets/images/abajour-tahina.png ",title: "Abat-jour Tahina" },
    { src: "assets/images/appartement-paris-v.png", title: "Appartement Paris V" },
    { src: "assets/images/restaurant-sushisen-londres.png", title: "Restaurant Sushi Zen" },
    { src: "assets/images/la-balisiere.png", title: "Villa la Balisière" },
    { src: "assets/images/structures-thermopolis.png", title: "Structure Thermopolis" },
    { src: "assets/images/appartement-paris-x.png", title: "Appartement Paris X " },
    { src: "assets/images/le-coteau-cassis.png", title: "Pavillon, 'Le Coteau',Cassis" },
    { src: "assets/images/villa-ferneze.png", title: "Villa Ferneze- Isola d'Elba" },
    { src: "assets/images/appartement-paris-xviii.png", title: "Appartement Paris XVIII" },
    { src: "assets/images/bar-lullaby-paris.png", title: "Bar Lullaby" },
    { src: "assets/images/hotel-first-arte-new-delhi.png", title: "Hotel First Arte - New Delhi" },
]; // Tableau avec les images et les titres 

const galleryMedia = document.querySelector(".gallery");

if (galleryMedia) {
    // Boucle pour créer et ajouter chaque élément de la galerie
    for (let i = 0; i < galleryData.length; i++) { // 
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-img");

        const imgElement = document.createElement("img"); //Ajout des imgs 
        imgElement.src = galleryData[i].src;
        imgElement.alt = galleryData[i].title;

        const titleElement = document.createElement("h3"); // Creation de l'elément titre
        titleElement.textContent = galleryData[i].title;

        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(titleElement); 

        galleryDiv.appendChild(galleryItem);
    }
}

titleButton= ["Tous","Objets","Appartements","Hotel & restaurants"]

const galleryDiv = document.querySelector(".gallery");

if (galleryDiv) {

for (let i = 0; i < titleButton.length; i++) {
    const buttonElement = document.createElement ("button");
    buttonElement.innerHTML = titleButton[i];

galleryDiv.appendChild(buttonElement)
}}


getCategories();

/*const btnCategories= {
    url:"http://localhost:5678/api/categories",
    title:"Categories",
}

function getCategories (){
    return fetch (`${API_BASE_URL}categories`)
    .then (response => response.json())
    .then(data => {
        console.log(data);
        createCategoryButtons(data);
    })
    .catch(error =>{
        console.log()
    })
}

function createCategoryButtons(categories) {
    const filtersDiv = document.querySelector('#filters');
    filtersDiv.innerHTML = ''; 

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.dataset.category = category.name; // Utilisation de data-category pour la gestion des filtres
        button.addEventListener('click', () => filterWorks(category.name)); // Gestionnaire d'événements pour le clic
        filtersDiv.appendChild(button); 
    });
}*/

