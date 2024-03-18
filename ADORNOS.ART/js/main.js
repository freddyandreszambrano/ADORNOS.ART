class Carrito {
    constructor() {
        this.carticon = document.querySelector("#icono");
        this.cart = document.querySelector(".cart");
        this.cartclose = document.querySelector("#close-cart");
        this.contador_producto = 0;
        this.precio = 0;
        this.cantidad_articulos = "";
        this.name_articulos = [];
        this.num_of_articulos = [];
        this.conta_product = document.querySelector("#cantidad-productos");

        this.init();
    }

    init() {
        this.carticon.addEventListener('click', () => {
            this.cart.classList.add('active');
        });

        this.cartclose.addEventListener('click', (event) => {
            event.stopPropagation();
            this.cart.classList.remove('active');
        });

        if (document.readyState == "loading") {
            document.addEventListener('DOMContentLoaded', () => this.ready());
        } else {
            this.ready();
        }
    }

    ready() {
        var removecartbuttons = document.querySelectorAll('.cart-eliminar');
        removecartbuttons.forEach((button) => {
            button.addEventListener('click', (event) => this.removecartItem(event));
        });

        var quantityinputs = document.querySelectorAll('.cart-quantity');
        quantityinputs.forEach((input) => {
            input.addEventListener('change', (event) => this.quantitychanged(event));
        });

        var addcart = document.querySelectorAll('.add-cart');
        addcart.forEach((button) => {
            button.addEventListener('click', (event) => this.addcartcliked(event));
        });
    }
    // 
    removecartItem(event) {
        var buttonclicked = event.target;
        var productoeliminado = buttonclicked.parentElement.querySelector(".cart-titulo_producto").innerText;
        let indice_delete = this.name_articulos.indexOf(productoeliminado)
        this.name_articulos.splice(indice_delete, 1)
        buttonclicked.parentElement.remove();
        this.contador_producto--;
        this.conta_product.innerText = this.contador_producto;
        this.updatetotal();
    }

    quantitychanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        this.updatetotal();
    }

    addcartcliked(event) {
        var button = event.target;
        var shoproducto = button.parentElement;
        // console.log(shoproducto)
        var title = shoproducto.querySelector('.titulo-producto').innerText;
        var price = shoproducto.querySelector('.precio').innerText;
        var productimg = shoproducto.querySelector('.producto-img').src;
        this.addProductTocart(title, price, productimg);
        this.updatetotal();
    }


    addProductTocart(title, price, productimg) {
        var cartshopbox = document.createElement('div');
        cartshopbox.classList.add('cart-box');
        var cartitems = document.querySelector('.cart-conten');
        this.contador_producto++;
        for (var e = 0; e < this.name_articulos.length; e++) {
            if (this.name_articulos[e] === title) {
                Swal.fire('el adorno ya esta agregado en el carro de compras');
                this.contador_producto--;
                return;
            }
        }
        this.conta_product.innerText = this.contador_producto;
        this.name_articulos.push(title);
        var cartboxcontent = `
            <img src="${productimg}" class="cart-img">
            <div class="detail-box">
                <div class="cart-titulo_producto">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!-- eliminar compra -->
            <i class='bx bxs-trash-alt cart-eliminar' ></i>`;

        cartshopbox.innerHTML = cartboxcontent;

        cartitems.appendChild(cartshopbox);
        cartshopbox.querySelector('.cart-eliminar').addEventListener('click', (event) => this.removecartItem(event));
        cartshopbox.querySelector('.cart-quantity').addEventListener('change', (event) => this.quantitychanged(event));
    }

    updatetotal() {
        var cartcontent = document.querySelector('.cart-conten');
        var cartboxes = cartcontent.querySelectorAll('.cart-box');
        let total = 0;
        for (let e = 0; e < cartboxes.length; e++) {
            var cartbox = cartboxes[e];
            var princeelement = cartbox.querySelector('.cart-price');
            var quantityelement = cartbox.querySelector('.cart-quantity');
            var price = parseFloat(princeelement.innerText.replace("$", ""));
            var quantity = quantityelement.value;
            this.cantidad_articulos = quantity;
            total = total + (price * quantity);
        }
        total = Math.round(total * 100) / 100;
        this.precio = total;
        document.querySelector(".total-prince").innerText = '$' + total;
    }

    enviarMensaje() {
        if (this.precio !== 0) {
            const num_cell = "+593939129130";
            let name_y_cantidad = "";
            this.name_articulos.forEach((nombre_articulo, index) => {
                let inputCantidadArticulo = document.querySelectorAll(".cart-quantity")[index];
                let cantidadArticulo = parseInt(inputCantidadArticulo.value, 10);
                if (index !== this.name_articulos.length - 1) {
                    name_y_cantidad += `${nombre_articulo} - cantidad: ${cantidadArticulo}, `;
                } else {
                    name_y_cantidad += `${nombre_articulo} - cantidad: ${cantidadArticulo}. `;
                }
            });
            const mensaje = `El valor a pagar es: ${this.precio}\nEl pedido solicitado es: ${name_y_cantidad}`;
            window.open(`https://web.whatsapp.com/send?phone=${num_cell}&text=${encodeURIComponent(mensaje)}`, "_blank");
        } else {
            Swal.fire('El carrito está vacío');
        }
    }
}

// Crear una instancia del carrito
const carrito = new Carrito();
