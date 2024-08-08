document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //données à envoyer
    const loginData = {
        email: email,
        password: password
    };

    // Envoi de la requête POST à l'API
    fetch('http://localhost:5678/api/', {
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
        // Traitez les données de réponse ici, par exemple en redirigeant l'utilisateur
        console.log('Connexion réussie:', data);
        // Vous pouvez rediriger l'utilisateur, stocker le token, etc.
     
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur de connexion. Veuillez vérifier vos informations.');
    });
});