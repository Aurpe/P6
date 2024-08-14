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
        localStorage.setItem('token', data.token);
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

function checkUserStatus () {
    const token = localStorage.getItem("token");
    let message = "mode édition activé";


    if (token) {
      const editionMode= document.querySelector ('.modeEdition');
    if (editionMode){
        editionMode.style.display = 'block';
    }
      return message 
    else
    displayCategories.display.none;
    }
    
 }
checkUserStatus();