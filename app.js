'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - create read update delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const saveClientKeyPress = (event) => {
   if(event.key == 'Enter'){
      saveClient();
   };
};

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tbClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tbClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const restartFields = () => {
   document.getElementById('nome').value = '';
   document.getElementById('email').value = '';
   document.getElementById('celular').value = '';
   document.getElementById('cidade').value = '';
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.getElementById('form')
   .addEventListener('keypress', saveClientKeyPress);    
   
document.getElementById('cancelar')
   .addEventListener('click', restartFields);    

document.querySelector('#tbClient>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)




































// 'use strict'

// const openModal = () => document.getElementById('modal')
//    .classList.add('active');
   
// const closeModal = () => {
//    clearFields();
//    document.getElementById('modal').classList.remove('active'); 
// } 

// const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClientes')) ?? [];
// const setLocalStorage = (dbClient) => localStorage.setItem('dbClientes', JSON.stringify(dbClient));

// // CRUD - Create read update delete

// // CRUD - CREATE
// const createClient = (client) => {
//     const dbClient = getLocalStorage(); 
//     dbClient.push (client);
//     setLocalStorage(dbClient);    
// }

// // CRUD - READ 
// const readClient = () => getLocalStorage();

// // CRUD - UPDATE
// const updateClient =  (index, client) => {
//    const dbClient = readClient();
//    dbClient[index] = client;
//    setLocalStorage(dbClient);
// };

// // CRUD - DELETE 
// const deleteClient = (index) => {
//    const dbClient = readClient();
//    dbClient.splice(index,1);
//    setLocalStorage(dbClient); 
// }
// // Eventos   

// // Interação com o layout

// const isValidfields = () => {
//    return document.getElementById('form').reportValidity();
// };

// const clearFields = () => {
//    const fields = document.querySelectorAll('.modal-field');
//    fields.forEach(field => field.value = '');
// };



// const saveClient = () => {
//     if(isValidfields()){
//       const client = {
//          nome: document.getElementById('nome').value,
//          email: document.getElementById('email').value,
//          celular: document.getElementById('celular').value,
//          cidade: document.getElementById('cidade').value,
//       };
//       const index = document.getElementById('nome').dataset.index;
//       if(index == 'new'){
//          createClient(client); 
//          updateTable();
//          closeModal(); 
//       }else{
//          updateClient(index,client);
//          updateTable();
//          closeModal();
//       };
//    }; 
// }; 

// const createRow = (client, index) => {
//    const newRow = document.createElement('tr');
//    newRow.innerHTML = `
//       <td>${client.nome}</td>
//       <td>${client.email}</td>
//       <td>${client.celular}</td>
//       <td>${client.cidade}</td>
//        <td>
//          <button type="button" id="edit-${index}" class="button green">Editar</button>
//          <button type="button" id="delete-${index}" class="button red">Excluir</button>
//        </td> 
//    `;

//    document.querySelector('#tbClient>tbody').appendChild(newRow);
// };

// const clearTable = () => {
//    const rows = document.querySelectorAll('#tbClient>tbody tr');
//    rows.forEach(row => row.parentNode.removeChild(row)); 
// };

// const updateTable = () => {
//    const dbClient = readClient();
//    clearTable();
//    dbClient.forEach(createRow);
// }

// const filFields = (client) => {
//     document.getElementById('nome').value = client.nome;
//     document.getElementById('email').value = client.email;
//     document.getElementById('celular').value = client.celular;
//     document.getElementById('cidade').value = client.cidade;
//     document.getElementById('nome').dataset.index = client.index;
// }


// const editClient = (index) => {
//    const client = readClient()[index];
//    client.index = index;
//    filFields(client);
//    openModal();
// }

// const editDelete = (event) => {
//     if(event.target.type == 'button'){
//       const [action, index] = event.target.id.split('-');
      
//       if(action == 'edit') {
//          editClient(index);
//       }else{
//          const client = readClient()[index];
//          const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`);
//          if(response){
//             deleteClient(index);
//             updateTable();
//          }
//       }
//    } 
// }

// updateTable();

// document.getElementById('cadastrarCliente')
//    .addEventListener('click', openModal);
 
// document.getElementById('modalClose')
//    .addEventListener('click', closeModal);   

// document.getElementById('salvar')
//    .addEventListener('click', saveClient);
   


// document.querySelector('#tbClient>tbody')
//    .addEventListener('click', editDelete);   