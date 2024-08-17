function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // données à envoyer
    const loginData = {
        email: email,
        password: password
    };

    // Envoi de la requête POST à l'API
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }
        return response.json();
    })
    .then(data => {

        const token= data.token;
        console.log(token)

        localStorage.setItem('token', data.token);

        // Appeler checkUserStatus pour afficher le mode édition
        checkUserStatus();
        
        window.location.href = 'index.html'
        
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur de connexion. Veuillez vérifier vos informations.');
    });
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    login()
});


function checkUserStatus() {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('token');

    if (token) {
        // Afficher le mode édition
        const editionMode = document.querySelector('.modeEdition');
        if (editionMode) {
            editionMode.style.display = 'block';
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

