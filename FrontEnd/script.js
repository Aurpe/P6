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


function checkUserStatus () {
   const token = localStorage.getItem("token");
   if (token) {
     document.querySelector ('.modeEdition');
   }
   else
   displayCategories= display.none;
   
}

/*function checkUserStatus() {
    const token = localStorage.getItem("token");

    if (token) {
        // Si un token est présent, affiche l'élément avec la classe 'modeEdition'
        document.querySelector('.modeEdition').style.display = 'block';
    } else {
        // Si aucun token n'est présent, masque les catégories (assumant qu'il y a un élément avec la classe 'displayCategories')
        const displayCategories = document.querySelector('.displayCategories');
        if (displayCategories) {
            displayCategories.style.display = 'none';
        }
    }
}*/





       

