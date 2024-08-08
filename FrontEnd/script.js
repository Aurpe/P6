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

//getWorks()



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

//getCategories();


/*function filterWorks(filterCategory) {
    const filterByCategoryId = (categoryId) => {
        return works.filter(work => work.categoryId === categoryId);
    };

}

document.querySelectorAll('filterCategory',filteredWorks);/*



/*function filterWorks() {
    // Sélectionne les éléments avec la classe 'filterCategory'
    const categories = document.querySelectorAll('.filterCategory');

    // Fonction pour afficher les travaux filtrés
    function displayWorks(works) {
    
        console.log("Displaying works:", works);
    }

    // Filtrer les catégories (ceci est un exemple de filtrage)
    const worksFilter = Array.from(categories).filter(category => {
        const categoryId = parseInt(category.getAttribute('data-category-id'), 10);
        return categoryId < 2;
    });

    // Affiche les travaux filtrés
    displayWorks(worksFilter);
}/*


/*function filterWorks(categoryId) {
    let filteredWorks;
    if (categoryId) {
        filteredWorks = allWorks.filter(work => work.categoryId === categoryId);
    } else {
        filteredWorks = allWorks; // Si categoryId est null, afficher toutes les œuvres
    }
    displayWorks(filteredWorks);*/

getWorks();
getCategories();


       

