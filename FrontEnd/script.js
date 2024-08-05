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


function displayWorks(images) {
    const galleryDiv = document.querySelector('.gallery');
    galleryDiv.innerHTML = ''

    images.forEach(image => {
        const galleryItem = document.createElement('figure');
        galleryItem.classList.add('figure');

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


function displayCategories(categories) {
    const buttonsContainer = document.querySelector('.buttonCategories');

    const allButton = document.createElement('button');
    allButton.textContent = "Tous";
    allButton.classList.add ('filterCategory');
    buttonsContainer.appendChild(allButton);

    categories.forEach(category => {
        const btnCategories = document.createElement('button');
        btnCategories.classList.add('filterCategory');
        
        btnCategories.textContent = category.name; 
        buttonsContainer.appendChild(btnCategories)

    });
}

getCategories();



function filterWorks (){
    const arrayFilter = displayWorks.id;    //accès au tableau Display works notamment à la catégorie ID
    console.log(arrayFilter);

    document.querySelectorAll(filterCategory) // recuperation de tous les boutons avec la classe Filter Category
    console.log(filterCategory)

    constFiltered = displayWorks.id (categorie => filterCategoy.id <2);
    
}
1.// Seelectionner l'ID de la catégorie cliqué
    2.// Comparer grace à filter/sort avec la category ID au tableau des works
    3.// Quand on a reussi le filtrage, le nouveau Tableau filtered works est dans une constante
    4.// pour le réafficher, en appel la fonction DispkayWorks en lui passant en parametre le nouveu tableau;