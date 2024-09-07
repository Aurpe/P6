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
    allButton.addEventListener('click', function() {
        getWorks()
    })
   
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
        if (categoriesContainer) categoriesContainer.style.display = "flex";
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

function switchModal() {
    const iconArrow = document.querySelector('#myModal .iconsArrow');
    
    if (iconArrow) {
        iconArrow.addEventListener('click', function() {
            // Fermer myModal
            const myModal = document.getElementById('myModal');
            if (myModal) {
                myModal.style.display = 'none';
            }
            
            // Ouvrir modaleGalerie
            const modaleGalerie = document.getElementById('modaleGalerie');
            if (modaleGalerie) {
                modaleGalerie.style.display = 'block';
            }
        });
    }
}

switchModal();

// Fonction générique pour ouvrir un modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Fonction générique pour fermer un modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Événement pour fermer les modals quand on clique en dehors d'eux ou sur le bouton "fermer"
window.addEventListener('click', function(event) {
    const myModal = document.getElementById('myModal');
    const modaleGalerie = document.getElementById('modaleGalerie');
    const closeMyModal = document.querySelector('#myModal .close');
    const closeModaleGalerie = document.querySelector('#modaleGalerie .close');
    

    // Fermer "myModal" si on clique en dehors ou sur le bouton de fermeture
    if (event.target === myModal || event.target === closeMyModal) {
        closeModal('myModal');
    }

    // Fermer "modaleGalerie" si on clique en dehors ou sur le bouton de fermeture
    if (event.target === modaleGalerie || event.target === closeModaleGalerie) {
        closeModal('modaleGalerie');
    }
});
// Ouverture du modal "myModal"
const openMyModalButton = document.querySelector('#openMyModalButton');
if (openMyModalButton) {
    openMyModalButton.addEventListener('click', function() {
        openModal('myModal');
    });
}

// Ouverture du modal "modaleGalerie"
const openModaleGalerieButton = document.querySelector('#openModaleGalerieButton');
if (openModaleGalerieButton) {
    openModaleGalerieButton.addEventListener('click', function() {
        openModal('modaleGalerie');
    });
}


//Gestion du modal
function openModal() {
    const modal = document.getElementById('myModal');
    if (modal) modal.style.display = 'block';
}


// Fonction générique pour fermer un modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Événement pour fermer les modals quand on clique en dehors d'eux ou sur le bouton "fermer"
window.addEventListener('click', function(event) {
    const myModal = document.getElementById('myModal');
    const modaleGalerie = document.getElementById('modaleGalerie');
    const closeMyModal = document.querySelector('#myModal .close');
    const closeModaleGalerie = document.querySelector('#modaleGalerie .close');

    // Fermer "myModal" si on clique en dehors ou sur le bouton de fermeture
    if (event.target === myModal || event.target === closeMyModal) {
        closeModal('myModal');
    }

    // Fermer "modaleGalerie" si on clique en dehors ou sur le bouton de fermeture
    if (event.target === modaleGalerie || event.target === closeModaleGalerie) {
        closeModal('modaleGalerie');
    }
});


function getImg() {
            const fileInput = document.getElementById('photoInput');
            const photoContainer = document.querySelector('.photoContainer');
            const buttonAdd = document.getElementById('customPhotoButton');
            const preview = document.querySelector('.previewImg');
            const iconsImage = document.querySelector('.iconsImage');
            const formatImg = document.querySelector('.formatImage');
        
            fileInput.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.innerHTML = `<img src="${e.target.result}" alt="Image preview" class="preview-image">`;
                        preview.style.display = 'block';
                        buttonAdd.style.display = 'none';
                        //fileInput.style.display = 'none';
                        preview.style.display = 'block';
                        iconsImage.style.display = 'none';
                        formatImg.style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        // Appel direct de la fonction
        getImg();

        async function postWork(event) {
            event.preventDefault(); // Empêcher le comportement par défaut de la soumission du formulaire
            
            // Sélectionner les éléments nécessaires
            const categorySelect = document.querySelector('#categorySelect');
            const fileInputElement = document.querySelector('#photoInput'); // Vérifiez si l'input file existe
            const titleModal = document.querySelector('#titleInput').value;
            const categoryModal = categorySelect.value;
        
            // Vérification si l'input file existe
            if (!fileInputElement) {
                console.error("L'élément #photoInput est introuvable.");
                alert("Impossible de trouver l'input file.");
                return;
            }
        
            const fileInput = fileInputElement.files[0]; // Vérifiez si un fichier a été sélectionné
        
            // Vérifier si un fichier a été sélectionné
            if (!fileInput) {
                alert("Veuillez sélectionner un fichier avant de soumettre.");
                return; // Ne pas continuer si aucun fichier n'est sélectionné
            }
        
            const formData = new FormData();
            formData.append('image', fileInput);
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
                    closeModal('myModal'); // Fermer la modal
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



      























