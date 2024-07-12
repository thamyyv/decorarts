// Função para alternar a visibilidade do menu
function toggleNavbar() {
  let menuMobile = document.querySelector(".navbar-nav");
  menuMobile.classList.toggle("open");
}

// Seletores para elementos do modal e tabela
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sCategoria = document.querySelector('#m-categoria')
const sImg = document.querySelector('#m-img')
const btnSalvar = document.querySelector('#btnSalvar')

let itens = []
let id = undefined

// Função para abrir o modal, seja para editar ou adicionar um novo item
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  // Fecha o modal ao clicar fora dele
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    // Preenche os campos do modal com os dados do item a ser editado
    sCategoria.value = itens[index].categoria
    sImg.value = itens[index].img
    id = index
  } else {
    // Limpa os campos do modal para adicionar um novo item
    sCategoria.value = ''
    sImg.value = ''
    id = undefined // Certifica-se de que id esteja undefined ao adicionar novo item
  }
}

// Função para editar um item existente
function editItem(index) {
  openModal(true, index)
}

// Função para deletar um item existente
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

// Função para inserir um item na tabela
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.categoria}</td>
    <td>${item.img}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

// Evento de clique no botão de salvar
btnSalvar.onclick = e => {
  e.preventDefault()

  // Verifica se os campos estão preenchidos
  if (sCategoria.value === '' || sImg.value === '') {
    return
  }

  if (id !== undefined) {
    // Atualiza o item existente
    itens[id].categoria = sCategoria.value 
    itens[id].img = sImg.value
    id = undefined // Redefine id após editar
  } else {
    // Adiciona um novo item
    itens.push({'categoria': sCategoria.value, 'img': sImg.value})
  }

  setItensBD()
  modal.classList.remove('active')
  loadItens()
}

// Função para carregar os itens do banco de dados local
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

// Funções para obter e definir itens no localStorage
const getItensBD = () => JSON.parse(localStorage.getItem('dbimg')) ?? []
const setItensBD = () => localStorage.setItem('dbimg', JSON.stringify(itens))

// Carrega os itens ao iniciar o script
loadItens()