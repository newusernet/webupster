let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    total -= removedItem.price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.item} - R$ ${item.price.toFixed(2)}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => removeFromCart(index));
        
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

function sendOrder() {
    const deliveryOption = document.querySelector('input[name="delivery-option"]:checked').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const orderComments = document.getElementById('order-comments').value;

    let orderMessage = "Pedido:\n";
    cart.forEach(item => {
        orderMessage += `${item.item} - R$ ${item.price.toFixed(2)}\n`;
    });
    orderMessage += `Total: R$ ${total.toFixed(2)}\n`;
    orderMessage += `Opção de Entrega: ${deliveryOption}\n`;
    if (deliveryOption === "Entregar em Casa") {
        orderMessage += `Endereço: ${address}\n`;
    }
    orderMessage += `Método de Pagamento: ${paymentMethod}\n`;
    orderMessage += `Observações: ${orderComments}`;

    const whatsappUrl = `https://wa.me/5551998061961?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 2000);

    document.querySelectorAll('input[name="delivery-option"]').forEach((input) => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'Entregar em Casa') {
                document.getElementById('address-fields').style.display = 'block';
            } else {
                document.getElementById('address-fields').style.display = 'none';
            }
        });
    });

    // Adicione o ouvinte de eventos para abrir o modal quando uma imagem for clicada
    document.querySelectorAll('.product img').forEach((img) => {
        img.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const ingredients = product.getAttribute('data-ingredients');
            document.getElementById('ingredient-text').textContent = `Ingredientes: ${ingredients}`;
            document.getElementById('ingredient-modal').style.display = 'block';
        });
    });

    // O código para fechar o modal permanece o mesmo
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('ingredient-modal').style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('ingredient-modal')) {
            document.getElementById('ingredient-modal').style.display = 'none';
        }
    });
});
