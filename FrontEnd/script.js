const API_BASE_URL = "http://localhost:5678/api/";

function getWorks (){
    return fetch (`${API_BASE_URL}works`) //Route pour recuperer Works via l'api
    .then (response => response.json()) // on demande à la réponse d'être traduite en json
    .then(data => {
        console.table(data);
        displayWorks(data);
        displayWorksInModale(data)
        return data;
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
        console.log(trash.id);


       trash.addEventListener('click', () => deleteWork(image.id));

        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(trash);
        galleryDiv.appendChild(galleryItem);
    });


}
async function deleteWork(id) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API_BASE_URL}works/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const elementToRemove = document.getElementById(id);
            if (elementToRemove) {
                elementToRemove.parentNode.remove();
            }
            // Rafraîchir l'affichage des works
            getWorks();
        } else {
            console.log("La suppression a échoué");
        }
    } catch (error) {
        console.log("Erreur lors de la suppression :", error);
    }
}


// fetch delete : 
// on prend l'id de l'élément cliqué, et on le supprime.
// elementcliqué.parentNode.remove


function getCategories (){
    return fetch (`${API_BASE_URL}categories`)
    .then (response => response.json())
    .then(data => {
        console.table(data);
        displayCategories(data);
        displayCategoriesInModale(data);

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
                console.log ('ICI'+works)
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
    const token = localStorage.getItem("token");
    const editionMode = document.querySelector(".modeEdition");
    const editionButton = document.querySelector(".modeModify");
    const deconnexion = document.querySelector(".deconnexion");
    const connexion = document.querySelector(".connexion");
    const categoriesContainer = document.querySelector(".buttonCategories");
    const validation = document.querySelector("#submitBtn");

    if (token) {
        // Mode connecté
        if (editionMode) editionMode.style.display = "block";
        if (editionButton) editionButton.style.display = "block";
        if (deconnexion) deconnexion.style.display = "block";
        if (connexion) connexion.style.display = "none";
        if (categoriesContainer) categoriesContainer.style.display = "none";
        console.log("Mode Edition connecté");


    } else {
        // Mode déconnecté
        if (editionMode) editionMode.style.display = "none";
        if (editionButton) editionButton.style.display = "none"; 
        if (deconnexion) deconnexion.style.display = "none";
        if (connexion) connexion.style.display = "block"; 
        if (categoriesContainer) categoriesContainer.style.display = "block";
        console.log("Mode Edition déconnecté");
    }

    if (validation) {
        validation.addEventListener('click', openModal);
    }

    // Gestion de la déconnexion
    if (deconnexion) {
        deconnexion.addEventListener('click', function() {
            localStorage.removeItem("token");
            checkUserStatus();
            console.log("Déconnexion effectuée");
        });
    }
}
const editionButton = document.querySelector(".modeModify");
editionButton.addEventListener('click', function () {
    const modalToOpen = document.querySelector('#modaleGalerie');
    modalToOpen.style.display = "block";
})

// Appel initial pour vérifier le statut
checkUserStatus();

// Gestion du modal
function openModal() {
    const modal = document.getElementById('myModal');
    if (modal) modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) modal.style.display = 'none';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('myModal');
    const closeSpan = document.querySelector('#myModal .close');

    if (event.target == modal || event.target == closeSpan) {
        closeModal();
    }
});

const closeSpan = document.querySelector('#myModal .close');
if (closeSpan) {
    closeSpan.addEventListener('click', closeModal);
}

// Fonction pour gérer la soumission du formulaire
async function postWork(event) {
    event.preventDefault(); // Empêcher le comportement par défaut de la soumission du formulaire

    const categorySelect = document.querySelector('#categorySelect');
    const imageModal = document.querySelector('#photoInput').files[0];
    const titleModal = document.querySelector('#titleInput').value;
    const categoryModal = categorySelect.value;

    const photoContainer = document.querySelector('.photoContainer');

    if (imageModal) {
        imageModal.style.display = "block";
        imageModal.appendChild(photoContainer);

        imageModal.src = image.imageUrl;
        imageModal.alt = image.title;
    
}
    /*const photo= document.querySelector('photoContainer')
     if (imageModal) imageModal.style.display = "block";
     imageModal.appendChild('photoContainer')
     imageModal.src = image.imageUrl;
     imageModal.alt = image.title;*/


    const formData = new FormData();
    formData.append('image', imageModal);
    formData.append('title', titleModal);
    formData.append('category', categoryModal);


    try {
        // Récupérer le token depuis le localStorage
        const token = localStorage.getItem('token');

        // Envoyer la requête POST avec les données du formulaire
        let response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        // Gérer la réponse
        if (response.ok) {
            let result = await response.json();
            alert("Photo ajoutée avec succès !");
            getWorks(); // Rafraîchir la galerie
            closeModal(); // Ferme la modal
        } else {
            alert("Erreur lors de l'ajout de la photo.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la requête :", error);
        alert("Une erreur est survenue lors du téléchargement de la photo.");
    }
}

function displayCategoriesInModale(categories) {
    const optionsContainer = document.querySelector('#categorySelect');
    //selectCategories.classList.add('catego');
   
    categories.forEach(category => {
        const selectCategories = document.createElement('option');
        selectCategories.textContent = category.name;
        selectCategories.value = category.id;
        optionsContainer.appendChild(selectCategories);
    });
}


// Ajout de l'écouteur d'événements
const submitButton = document.querySelector('#validation');
submitButton.addEventListener("click", postWork);


/* Fonction pour gérer la soumission du formulaire
async function postWork(event) {
    event.preventDefault(); // Empêcher le comportement par défaut de la soumission du formulaire

    const objetCategory= document.createElement('option');
    const appartementCategory= document.createElement('option');
    const hotelCategory= document.createElement('option');

    objetCategory.value = "1";
    appartementCategory.value = "2";
    hotelCategory.value = "3";

    const hotelValue = hotelCategory.value;
    const appartementValue  = appartementCategory.value;
    const objetValue = objetCategory.value;

    objetCategory.textContent(Objets);
    appartementCategory.textContent(Appartements);
    hotelCategory.textContent(Hotels);

    document.querySelector('#categorySelect').appendchild(objetCategory)
    document.querySelector('#categorySelect').appendchild(appartementCategory)
    document.querySelector('#categorySelect').appendchild(hotelCategory)

    const imageModal = document.querySelector('#photoInput').files[0];
    const titleModal = document.querySelector('#titleInput').value;
    const categoryModal = categorySelect.value;

    const formData = new FormData();
    formData.append('image', imageModal);
    formData.append('title', titleModal);
    formData.append('category', categoryModal);

    displayCategories()

    try {
        // Récupérer le token depuis le localStorage
        const token = localStorage.getItem('token');

        // Envoyer la requête POST avec les données du formulaire
        let response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        // Gérer la réponse
        if (response.ok) {
            let result = await response.json();
            alert("Photo ajoutée avec succès !");
            displayWorksInModale()
            closeModal(); // Assurez-vous que cette fonction existe
        } else {
            alert("Erreur lors de l'ajout de la photo.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la requête :", error);
        alert("Une erreur est survenue lors du téléchargement de la photo.");
    }
}

// Ajout de l'écouteur d'événements
const submitButton = document.querySelector('#validation');
submitButton.addEventListener("click", postWork);*/