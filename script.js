// Selecionar elementos do DOM
const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productImageInput = document.getElementById('product-image');
const productGrid = document.querySelector('.product-grid');

// Caminhos dos ícones
const defaultImagePath = 'assets/foto.png';
const closeIconPath = 'assets/lixeira.png';

// Função para criar um cartão de produto
function createProductElement(name, price, imageUrl) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Imagem do produto
    const productImage = document.createElement('img');
    productImage.src = imageUrl || defaultImagePath;
    productImage.alt = name || 'Produto sem nome';
    productImage.onerror = () => (productImage.src = defaultImagePath);

    // Informações do produto
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    productInfo.innerHTML = `
        <p>${name || 'Produto sem nome'}</p>
        <p>${price ? `R$ ${price.toFixed(2)}` : 'Preço indisponível'}</p>
    `;

    // Botão de remoção
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = `<img src="${closeIconPath}" alt="Remover produto">`;
    removeButton.addEventListener('click', () => productCard.remove());

    // Montar o cartão
    productCard.append(productImage, productInfo, removeButton);
    return productCard;
}

// Função para adicionar produto ao grid
function addProduct(event) {
    event.preventDefault();

    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value);
    const imageUrl = productImageInput.value.trim();

    if (!name || isNaN(price) || price <= 0) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    const productCard = createProductElement(name, price, imageUrl);
    productGrid.appendChild(productCard);

    productForm.reset();
}

// Adicionar evento ao botão de salvar
document.getElementById('save-product').addEventListener('click', addProduct);

// Caminho do ícone de configurações
const settingsIconPath = 'assets/definicoes.png';

// Adiciona o ícone de configurações a cada cartão de produto
function addSettingsIcon(productCard) {
    const editButton = document.createElement('img');
    editButton.src = settingsIconPath;
    editButton.alt = 'Configurações';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => openEditModal(productCard));
    productCard.appendChild(editButton);
}

// Função para criar o modal dinamicamente
function createEditModal() {
    const modal = document.createElement('div');
    modal.id = 'edit-modal';
    modal.className = 'modal';

    modal.innerHTML = `
        <div class="modal-content">
            <h2>Editar Produto</h2>
            <form id="edit-product-form">
                <label for="edit-product-name">Nome do Produto:</label>
                <input type="text" id="edit-product-name" required>
                
                <label for="edit-product-price">Preço:</label>
                <input type="number" id="edit-product-price" step="0.01" required>
                
                <label for="edit-product-image">Imagem (URL):</label>
                <input type="text" id="edit-product-image">
                
                <div class="modal-buttons">
                    <button type="button" id="cancel-edit">Cancelar</button>
                    <button type="submit" id="save-edit">Salvar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Fechar modal ao clicar em "Cancelar"
    modal.querySelector('#cancel-edit').addEventListener('click', closeEditModal);

    // Salvar edições ao enviar o formulário
    modal.querySelector('#edit-product-form').addEventListener('submit', saveEdit);
}

// Variável para armazenar o modal e o cartão de produto atual
let editModal = null;
let currentProductCard = null;

// Abrir modal de edição
function openEditModal(productCard) {
    currentProductCard = productCard;

    const productName = productCard.querySelector('.product-info p:first-child').textContent;
    const productPrice = productCard.querySelector('.product-info p:last-child').textContent.replace('R$ ', '');
    const productImage = productCard.querySelector('img').src;

    document.getElementById('edit-product-name').value = productName;
    document.getElementById('edit-product-price').value = parseFloat(productPrice);
    document.getElementById('edit-product-image').value = productImage;

    editModal.classList.add('show');
}

// Fechar modal de edição
function closeEditModal() {
    editModal.classList.remove('show');
}

// Salvar edições
function saveEdit(event) {
    event.preventDefault();

    if (!currentProductCard) return;

    const updatedName = document.getElementById('edit-product-name').value.trim();
    const updatedPrice = parseFloat(document.getElementById('edit-product-price').value);
    const updatedImage = document.getElementById('edit-product-image').value.trim();

    if (!updatedName || isNaN(updatedPrice) || updatedPrice <= 0) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    currentProductCard.querySelector('.product-info p:first-child').textContent = updatedName;
    currentProductCard.querySelector('.product-info p:last-child').textContent = `R$ ${updatedPrice.toFixed(2)}`;
    currentProductCard.querySelector('img').src = updatedImage;

    closeEditModal();
}

// Modificar função de criação de produto para incluir o ícone de configurações
function createProductElement(name, price, imageUrl) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.src = imageUrl || defaultImagePath;
    productImage.alt = name || 'Produto sem nome';
    productImage.onerror = () => (productImage.src = defaultImagePath);

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    productInfo.innerHTML = `
        <p>${name || 'Produto sem nome'}</p>
        <p>${price ? `R$ ${price.toFixed(2)}` : 'Preço indisponível'}</p>
    `;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = `<img src="${closeIconPath}" alt="Remover produto">`;
    removeButton.addEventListener('click', () => productCard.remove());

    productCard.append(productImage, productInfo, removeButton);
    addSettingsIcon(productCard); // Adiciona o ícone de configurações
    return productCard;
}

// Inicializar modal
createEditModal();
editModal = document.getElementById('edit-modal');

function createProductElement(name, price, imageUrl) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Imagem do produto
    const productImage = document.createElement('img');
    productImage.src = imageUrl || defaultImagePath;
    productImage.alt = name || 'Produto sem nome';
    productImage.onerror = () => (productImage.src = defaultImagePath);

    // Informações do produto
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    productInfo.innerHTML = `
        <p>${name || 'Produto sem nome'}</p>
        <p>${price ? `R$ ${price.toFixed(2)}` : 'Preço indisponível'}</p>
    `;

    // Contêiner para os ícones de ação
    const productActions = document.createElement('div');
    productActions.classList.add('product-actions');

    // Botão de remoção
    const removeButton = document.createElement('img');
    removeButton.src = closeIconPath;
    removeButton.alt = "Remover produto";
    removeButton.addEventListener('click', () => productCard.remove());

    // Botão de configurações
    const settingsButton = document.createElement('img');
    settingsButton.src = settingsIconPath;
    settingsButton.alt = "Configurações";
    settingsButton.addEventListener('click', () => openEditModal(productCard));

    // Adicionar ícones ao contêiner de ações
    productActions.appendChild(removeButton);
    productActions.appendChild(settingsButton);

    // Montar o cartão
    productCard.append(productImage, productInfo, productActions);
    return productCard;
}
