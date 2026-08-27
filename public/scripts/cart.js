const cartToast = document.querySelector('.js-cart-toast');
const cartToastMessage = document.querySelector(
    '.js-cart-toast-message'
);

let toastTimeout;

function showCartToast(message) {

    clearTimeout(toastTimeout);

    cartToastMessage.textContent = message;
    cartToast.classList.add('show');

    toastTimeout = setTimeout(() => {
        cartToast.classList.remove('show');
    }, 3000);

}


document.querySelectorAll(
    '.js-increase-button, .js-decrease-button'
).forEach((button) => {

    button.addEventListener('click', async () => {
        try {
            const { productId } = button.dataset;

            const quantityChange =
                button.classList.contains('js-increase-button')
                    ? 1
                    : -1;

            const response = await fetch(`/cart/${productId}`, {
                method: 'PATCH',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    quantityChange
                })
            });

            const data = await response.json();

            if (data.updated) {

                // Update this product's quantity
                document.querySelector(
                    `.js-quantity-${productId}`
                ).textContent = data.itemQuantity;

                // Update header cart quantity
                document.querySelector(
                    '.js-cart-quantity'
                ).textContent = data.cartQuantity;

                // update bottom subtotal item count
                document.querySelector(
                    '.js-bottom-cart-quantity'
                ).textContent = data.cartQuantity;

                // update bottom subtotal price
                document.querySelector(
                    '.js-bottom-subtotal'
                ).textContent = data.subtotal

                // update right-side subtotal item count 
                document.querySelector(
                    '.js-right-cart-quantity'
                ).textContent = data.cartQuantity;

                // update right-side subtotal price
                document.querySelector(
                    '.js-right-subtotal'
                ).textContent = data.subtotal;
                
            }

        } catch (error) {
            console.error(
                'Update quantity error:',
                error
            );
        }
    });

});





document.querySelectorAll('.js-delete-button')
    .forEach((button) => {

        button.addEventListener('click', async () => {

            try {
                const { productId } = button.dataset;

                // Prevent multiple clicks
                button.disable = true;

                const response = await fetch(
                    `/cart/${productId}`,
                    {
                        method: 'DELETE'
                    }
                );

                const data = await response.json();

                if (!data.deleted) {
                    button.disable = false;
                    return;
                }

                const cartItem = document.querySelector(`.js-cart-item-${productId}`);

                // Start smooth removal animation
                cartItem.classList.add('removing');

                // Wait for the animation to finish
                setTimeout(() => {

                    // Remove item completely from the document
                    cartItem.remove();

                    // If cart is now empty, reload to show empty cart
                    if (data.cartQuantity === 0) {
                        window.location.reload();
                        return;
                    }

                    // Update header cart quantity
                    document.querySelector(
                        '.js-cart-quantity'
                    ).textContent = data.cartQuantity;


                    // Update bottom subtotal item count
                    document.querySelector(
                        '.js-bottom-cart-quantity'
                    ).textContent = data.cartQuantity;


                    // Update bottom subtotal price
                    document.querySelector(
                        '.js-bottom-subtotal'
                    ).textContent = data.subtotal;


                    // Update right-side subtotal item count
                    document.querySelector(
                        '.js-right-cart-quantity'
                    ).textContent = data.cartQuantity;


                    // Update right-side subtotal price
                    document.querySelector(
                        '.js-right-subtotal'
                    ).textContent = data.subtotal;

                    // Show confirmation toast
                    showCartToast('Item removed from your cart');

                }, 300);


            } catch (error) {
                console.error(
                    'Delete cart item error:',
                    error
                );

                button.disable = false;
            }

        });

    });