const url = 'http://localhost:3000/auth/register/';

window.onload = function() {
    //Lista o retorno dos dados
    populateTable();
};

function getFormUserValues() {
    return {
        name: document.getElementById("name").value,
        cpf: document.getElementById("cpf").value,
        birthDate: document.getElementById("birthDate").value
    }
}

function userCreate(){
    fetch(url, {
        method: 'post', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getFormUserValues())
    })
    .then(response => console.log(response.json()))
    .then(data => populateTable()) 
    .catch((err)=>{
        console.log(err)
    }); 

    populateTable();

}
   
function limparCampos() {
    const name = document.querySelector("#name");
    const cpf = document.querySelector("#cpf");
    const birthDate = document.querySelector("#birthDate");

    name.value = '';
    cpf.value = '';
    birthDate.value = '';

    document.getElementById("userForm").setAttribute("method", "POST");
    document.getElementById("userForm").setAttribute("data-id", '');
    document.getElementById('cadastro').innerHTML = 'Cadastrar';
    document.getElementById('formButton').innerHTML = 'Cadastrar';

}

//Altera o usuário selecionado
function atribuirCampos(data) {
    const name = document.querySelector("#name");
    const cpf = document.querySelector("#cpf");
    const birthDate = document.querySelector("#birthDate");

    let date = new Date(data.birthDate);
    let dataFormatada = (date.getFullYear()) + "-" + (("0" + (date.getMonth() + 1)).slice(-2)    ) + "-" + (("0" + (date.getDate() + 1)).slice(-2));

    name.value = data.name;
    cpf.value = data.cpf;
    birthDate.value = dataFormatada;

    document.getElementById("userForm").setAttribute("method", "PUT");
    document.getElementById("userForm").setAttribute("data-id", data._id);
    document.getElementById('cadastro').innerHTML = 'Atualizar ' + name.value;
    document.getElementById('formButton').innerHTML = 'Atualizar';

}

function populateUserInfo(id){
    fetch(url+id).then(response =>{
        return response.json();
            })
        .then(data => atribuirCampos(data))
        .catch(()=>{
        alert('Falha ao carregar usuário');
        }); 
}

//Deleta o usuário selecionado
function userDelete(id){
    fetch(url+id,{
        method:'delete',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          }
    }).then(()=>{
        alert('Usuário excluido com Sucesso!');})
        .then(data => populateTable()) 
        .catch(()=>{
           alert('Falha ao exlucir usuário');
        })
}

function userUpdate(id) {
    fetch(url+id, {
        method: 'put', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getFormUserValues())
    })
    .then(response => console.log(response.json()))
    .then(data => populateTable()) 
    .catch((err)=>{
        console.log(err)
    }); 
}

function populateTable(){
    fetch(url)
        .then(response => response.json())
        .then(json => {
            let li = ``;
            json.forEach(user => {
                let date = new Date(user.birthDate);
                let dataFormatada = (("0" + (date.getDate() + 1)).slice(-2)) + "/" + (("0" + (date.getMonth() + 1)).slice(-2)) + "/" + date.getFullYear(); 
                li += `<tr>
                        <td>${user.name} </td>
                        <td>${user.cpf}</td>
                        <td>${dataFormatada}</td>
                        <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" id="update" type="submit" viewBox="0 0 16 16" onClick ="populateUserInfo('${user._id}');">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                        </svg></td>
                        <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" id="delete" type="submit" viewBox="0 0 16 16" onClick ="userDelete('${user._id}');">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg></td>           
                    </tr>`;
            });
        document.getElementById("userList").innerHTML = li;
    });
}

function onSubmit(event){
    event.preventDefault();
    let isCpf =  isValidCPF();
    let isName = isValidName();

    let method = event.target.getAttribute('method');
    let userId = event.target.getAttribute('data-id');

    if (isCpf && isName) {
        if (method == 'POST') {
            return userCreate();
        } else {
            return userUpdate(userId);
        }
    }

    return alert('Erro ao enviar formulario')
   
    //document.location.reload(true);
}