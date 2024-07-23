const API_Data_Base = "http://localhost:5678/api-docs/"

function getWorks() {
    return fetch(`${API_Data_Base}works`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}
