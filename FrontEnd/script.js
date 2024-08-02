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
        galleryItem.classList.add('figure')

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



function getCategories (){
    return fetch (`${API_BASE_URL}categories`)
    .then (response => response.json())
    .then(data => {
        console.table(data);
        displayCategories(data);
    
    })
    .catch(error =>{
        console.log(error)
    })
}

/*function displayCategories (categories){
    
    const galleryCategories= document.createElement ('gallery');
     galleryCategories.innerHTML = ''

     categories.forEach(categories => {
        const btnCategories= document.createElement('button');
        btnCategories.classList.add(button);

        buttonElement.textContent = category.name;

        galleryCategories.appendChild(buttonElement);
    });
}*/

function displayCategories(category){

    const galleryCategories= document.createElement ('gallery');
     galleryCategories.innerHTML = ''

    const buttonElement = document.createElement('button');
    buttonElement.textContent = category.name;
    buttonElement.classList.add('category-button');

    // Ajouter le bouton à la galerie
    galleryDiv.appendChild(buttonElement);

    const allButton = document.createElement('button');
    allButton.textContent = "Tous";
    btnDiv.appendChild(allButton); // Ajoute le bouton "Tous" à la div btnCategories
}

function filterWorks(category) {
    console.log(`Filtrage par catégorie : ${category}`);
    // Ajoutez ici le code pour filtrer les images en fonction de la catégorie sélectionnée
}

getCategories();





/*const btnCategories= {
    url:"http://localhost:5678/api/categories",
    title:"Categories",
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

