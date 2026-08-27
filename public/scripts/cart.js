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

                const response = await fetch(
                    `/cart/${productId}`,
                    {
                        method: 'DELETE'
                    }
                );

                const data = await response.json();

                if (data.deleted) {

                    // Remove the product from the page
                    document.querySelector(
                        `.js-cart-item-${productId}`
                    ).remove();

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

                }

            } catch (error) {
                console.error(
                    'Delete cart item error:',
                    error
                );
            }

        });

    });