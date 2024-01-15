
fetch("https://memin.io/public/api/v2/users").then(result => {
    return result.json();
}).then(data => {
    let tbody = document.getElementById('tbody');
    data.data.forEach(function(element){
       
        let tr = document.createElement('tr');
        tbody.appendChild(tr);

        let td_id = document.createElement('td')
        td_id.innerText = element.id
        tr.appendChild(td_id);

        let td_name = document.createElement('td')
        td_name.innerText = element.name
        tr.appendChild(td_name);

        let td_email = document.createElement('td')
        td_email.innerText = element.email
        tr.appendChild(td_email);

        let td_button = document.createElement('td')
        tr.appendChild(td_button);

        let button_eliminar = document.createElement("button");
        button_eliminar.classList.add("btn","btn-danger","btn-sm")
        button_eliminar.innerText = "Eliminar";
        button_eliminar.setAttribute("onclick", "destroy("+element.id+")")
        td_button.appendChild(button_eliminar);

        let button_editar = document.createElement("button");
        button_editar.classList.add("btn","btn-warning","btn-sm")
        button_editar.innerText = "Editar";
        button_editar.setAttribute("onclick", "edit("+element.id+")")
        td_button.appendChild(button_editar);
    })
})

//Guardar un usuario
function store(){
    let name = document.getElementById('name_create');
    let email = document.getElementById('email_create');
    let password = document.getElementById('password_create');

    let data_user = {
        name : name.value,
        email: email.value,
        password: password.value
    }

    fetch("https://memin.io/public/api/v2/users",{
        method: "POST",
        body : JSON.stringify(data_user),
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(result => result.json())
        .then(data => {
        location.href = "";
        console.log(data)
    })
}

function destroy(id){

    fetch("https://memin.io/public/api/v2/users/"+id,{
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(result => result.json()).then(data => {
        location.href = "";
    })
}

function edit(id){
    fetch("https://memin.io/public/api/v2/users/"+id)
    .then(result => result.json()).then(data => {
        document.getElementById('name_edit').value = data.name
        document.getElementById('email_edit').value = data.email
        document.getElementById('password_edit').value = data.password
        document.getElementById('id_edit').value = data.id
    });
}

function update(){
    let name = document.getElementById('name_edit');
    let email = document.getElementById('email_edit');
    let password = document.getElementById('password_edit');
    let id = document.getElementById('id_edit');

    let data_user = {
        name : name.value,
        email :email.value,
        password : password.value
    }

    fetch("https://memin.io/public/api/v2/users/"+id.value,{
        method : "PUT",
        body: JSON.stringify(data_user),
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(result => result.json()).then(data => {
        location.href = "";
    })
}

function search(){
    q = document.getElementById('search').value;
    fetch("https://memin.io/public/api/v2/users/search/" + q)
    .then(result => result.json())
    .then(data => {

        let tbody = document.getElementById('tbody');
        tbody.innerHTML = "";
        data.forEach(function(element){
           
            let tr = document.createElement('tr');
            tbody.appendChild(tr);
    
            let td_id = document.createElement('td')
            td_id.innerText = element.id
            tr.appendChild(td_id);
    
            let td_name = document.createElement('td')
            td_name.innerText = element.name
            tr.appendChild(td_name);
    
            let td_email = document.createElement('td')
            td_email.innerText = element.email
            tr.appendChild(td_email);
    
            let td_button = document.createElement('td')
            tr.appendChild(td_button);
    
            let button_eliminar = document.createElement("button");
            button_eliminar.classList.add("btn","btn-danger","btn-sm")
            button_eliminar.innerText = "Eliminar";
            button_eliminar.setAttribute("onclick", "destroy("+element.id+")")
            td_button.appendChild(button_eliminar);
    
            let button_editar = document.createElement("button");
            button_editar.classList.add("btn","btn-warning","btn-sm")
            button_editar.innerText = "Editar";
            button_editar.setAttribute("onclick", "edit("+element.id+")")
            td_button.appendChild(button_editar);
        });
    });
}