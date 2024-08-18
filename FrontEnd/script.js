const API_BASE_URL = "http://localhost:5678/api/";

function getWorks (){
    return fetch (`${API_BASE_URL}works`) //Route pour recuperer Works via l'api
    .then (response => response.json()) // on demande à la réponse d'être traduite en json
    .then(data => {
        console.table(data);
        displayWorks(data);
        displayWorksInModale(data)
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

function displayWorksInModale(images) {
    const galleryDiv = document.querySelector('.galleryInModale');
    galleryDiv.innerHTML = ''

    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('workInModale');

        const imgElement = document.createElement('img');
        imgElement.src = image.imageUrl;
        imgElement.alt = image.title;

        const trash = document.createElement('i');
        trash.classList.add('fa-solid');
        trash.classList.add('fa-trash');
        trash.id = image.id;

        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(trash);
        galleryDiv.appendChild(galleryItem);
    });
}

// fetch delete : 
// on prend l'id de l'élément cliqué, et on le supprime.
// elementcliqué.parentNode.remove

//getWorks()

// Post Work : 
// au lieu de mettre l'objet dans une constante et lui envoyer l'objet, on le met dans un FormData

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
    allButton.classList.add('filterCategory');
    buttonsContainer.appendChild(allButton);
    // Faire en sorte que si on clic sur le button "tous", on réaffiche le tableau complet
    categories.forEach(category => {
        const btnCategories = document.createElement('button');
        btnCategories.classList.add('filterCategory');

        btnCategories.textContent = category.name;
        buttonsContainer.appendChild(btnCategories);
        btnCategories.addEventListener('click', function() {
            getWorks().then(works => {
                const filteredWorks = filterWorks(category.id, works);
                console.log(filteredWorks)
                displayWorks(filteredWorks)
            })
        })
    });
}

function filterWorks(categoryId, works) {
    return works.filter(work => work.categoryId === categoryId)
}

getWorks();
getCategories();

// Préparer en HTML ET CSS le mode admin
// -> si ok, display none le mode admin

// function checkUserStatus -> vérifier si il y a un token dans le LS,
// Si oui -> afficher le mode admin + display none les filtres.

// modales en HTML CSS.

// bonus : mettre un bouton logout a la place de login dans le header si on est connecté.
// au clic sur logout -> remove le token du localStorage. 



function checkUserStatus() {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('token');

    if (token) {
        // Afficher le mode édition
        const editionMode = document.querySelector('.modeEdition');
        const editionButton = document.querySelector('.modeModify');
        if (editionMode) {
            editionMode.style.display = 'block';
            editionButton.style.display = 'block';
        }
        
        // Masquer les catégories
        const categoriesContainer = document.querySelector('.buttonCategories');
        if (categoriesContainer) {
            categoriesContainer.style.display = 'none';
        }
        
        // Afficher le message d'activation
        console.log("Mode Edition connecté");
    } else {
        // Masquer le mode édition
        const editionMode = document.querySelector('.modeEdition');
        if (editionMode) {
            editionMode.style.display = 'none';
        }
        
        // Afficher les catégories
        const categoriesContainer = document.querySelector('.buttonCategories');
        if (categoriesContainer) {
            categoriesContainer.style.display = 'block';
        }
        
        // Afficher un message indiquant que le mode édition n'est pas activé
        console.log("Mode Edition déconnecté");
    }
}

// Appeler la fonction pour vérifier le statut de l'utilisateur
checkUserStatus();

const modifier = document.querySelector('.modifier');
modifier.addEventListener('click', function() {
    const modaleGalerie = document.querySelector('.displaymodal');
    modaleGalerie.style.display = "block"

});



  









       

