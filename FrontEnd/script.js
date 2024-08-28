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
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem("token");

    if (token) {
        // Afficher le mode édition
        const editionMode = document.querySelector(".modeEdition");
        const editionButton = document.querySelector(".modeModify");
        const deconnexion = document.querySelector (".logout");
        const connexion= document.querySelector(".login");

        if (editionMode) {
            editionMode.style.display = "block";
            editionButton.style.display = "block";
            deconnexion.style.display= "block";
            connexion.style.display = "none";
        }

        // Masquer les catégories
        const categoriesContainer = document.querySelector(".buttonCategories");
        if (categoriesContainer) {
            categoriesContainer.style.display = "none";
        }


        // Afficher le message d'activation
        console.log("Mode Edition connecté");
    } else {
        // Masquer le mode édition
        const editionMode = document.querySelector(".modeEdition");
        if (editionMode) {
            editionMode.style.display = "none";
            deconnexion.style.display= "none";
        }

        // Afficher les catégories
        const categoriesContainer = document.querySelector(".buttonCategories");
        if (categoriesContainer) {
            categoriesContainer.style.display = "block";
        }
        // Afficher un message indiquant que le mode édition n'est pas activé
        console.log("Mode Edition déconnecté");
    }

    // Ajout de l'événement de déconnexion
    if (deconnexion) {
        deconnexion.addEventListener('click', function() {
            localStorage.removeItem("token");  // Supprimer le token
            checkUserStatus();  // Rafraîchir l'état de l'interface
            console.log("Déconnexion effectuée");
        });
    }

}

// Fermer le modal quand on clique en dehors du contenu du modal
window.addEventListener('click', function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
});


//Fonction pour gérer la soumission du formulaire
async function postWork(event) {
    event.preventDefault(); // Empêcher le comportement par défaut de la soumission du formulaire

    const objetCategory= document.createElement('option');
    const appartementCategory= document.createElement('option');
    const hotelCategory= document.createElement('option');

    objetCategory.textContent(displayCategories);
    appartementCategory.textContent(displayCategories);
    hotelCategory.textContent(displayCategories);

    objetCategory.appendChild ('#categorySelect')
    appartementCategory.appendChild ('#categorySelect')
    hotelCategory.appendChild('#categorySelect')

    const imageModal = document.querySelector('#photoInput').files[0];
    const titleModal= document.querySelector('#titleInput').value;
    const categoryModal = document.querySelector('#categorySelect').value;


    const formData = new FormData(); // Créer un objet FormData avec les données du formulaire
    formData.append('image',imageModal);
    formData.append('title',titleModal);
    formData.append('category',categoryModal)

    try {
        // Envoyer la requête POST avec les données du formulaire
        let response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: formData

        });
    
        // Déclarer le contenu de l'API à l'intérieur
        let result = await response.json();
    
        // Gérer la réponse (par exemple, afficher une alerte avec le message du résultat)
        if (response.ok) {
            alert("Photo ajoutée avec succès : " + result.message);
          
            fermerModal(); // Fermer le modal après la soumission réussie
        } else {
            alert("Erreur : " + result.message);
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la requête :", error);
        alert("Une erreur est survenue lors du téléchargement de la photo.");
    }
}
const clikHere= document.querySelector('#validation')
clikHere.addEventListener("click", postWork);


   
   










  









       

