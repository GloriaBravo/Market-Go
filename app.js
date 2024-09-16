// Obtener el contenedor de las cards
const containerCards = document.getElementById("containerCards");
const URL = "https://fakestoreapi.com/products";

// Función para obtener datos de la API
const getApi = async (URL) => {
  try {
    const response = await fetch(URL); // Hacer una solicitud GET a la URL
    const data = await response.json(); // Convertir la respuesta en formato JSON
    console.log(data); // Mostrar los datos en la consola para depuración
    return data; // Retornar los datos obtenidos
  } catch (error) {
    console.error("Error fetching data: ", error); // Manejo de errores
  }
};

// Carrito de compras como objeto, donde la clave es el id del producto
let cart = {};

// Método para agregar productos al carrito de compras
const addToCart = (product) => {
  if (cart[product.id]) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    cart[product.id].quantity += 1;
  } else {
    // Si el producto no está en el carrito, añádelo con cantidad 1
    cart[product.id] = { ...product, quantity: 1 };
  }
  console.log(cart); // Mostrar el carrito actualizado en la consola
  updateCartDisplay(); // Actualizar la interfaz del carrito
};

// Función para mostrar los productos en el carrito de compras
const updateCartDisplay = () => {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = ""; // Limpiar el contenido anterior del carrito
  let totalPrice = 0; // Variable para calcular el precio total del carrito

  for (const id in cart) {
    const product = cart[id];
    // Crear un elemento de lista para mostrar cada producto en el carrito
    const li = document.createElement("li");
    li.textContent = `${product.title} - $${product.price} x ${product.quantity} = $${(product.price * product.quantity).toFixed(2)}`;
    cartItems.appendChild(li); // Agregar el elemento a la lista del carrito
    totalPrice += product.price * product.quantity; // Calcular el precio total
  }

  // Mostrar el precio total en el carrito
  const totalLi = document.createElement("li");
  totalLi.textContent = `Total: $${totalPrice.toFixed(2)}`;
  totalLi.style.fontWeight = 'bold'; // Resaltar el total
  cartItems.appendChild(totalLi); // Agregar el total a la lista
};

// Función para vaciar el carrito de compras
const emptyCart = () => {
  cart = {}; // Limpiar el objeto del carrito de compras
  updateCartDisplay(); // Actualizar la interfaz para mostrar el carrito vacío
};

// Función para crear la card del producto
const createProduct = (product) => {
  // Crear el div contenedor del producto
  const card = document.createElement("div");
  card.classList.add("card-products");

  // Crear el título del producto
  const titleProduct = document.createElement("h1");
  titleProduct.textContent = product.title;

  // Crear la imagen del producto
  const imageProduct = document.createElement("img");
  imageProduct.src = product.image;
  imageProduct.alt = product.category;

  // Crear la descripción del producto
  const descriptionProduct = document.createElement("p");
  descriptionProduct.textContent = product.description;

  // Precio resaltado en un botón
  const priceButton = document.createElement("button");
  priceButton.classList.add("price-button");
  priceButton.textContent = "$" + product.price;

  // Crear un input para la cantidad
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = 1; // Valor inicial del input
  quantityInput.min = 1; // Valor mínimo permitido
  quantityInput.style.margin = "0.5rem 0"; // Margen para el input

  // Botón para agregar al carrito de compras
  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Agregar al carrito";
  addToCartButton.addEventListener("click", () => {
    // Obtener la cantidad del input y agregar al carrito
    const quantity = parseInt(quantityInput.value, 10);
    for (let i = 0; i < quantity; i++) {
      addToCart(product); // Añadir el producto al carrito la cantidad deseada
    }
  });

  // Agregar elementos a la card
  card.appendChild(titleProduct);
  card.appendChild(imageProduct);
  card.appendChild(descriptionProduct);
  card.appendChild(priceButton); // Precio resaltado
  card.appendChild(quantityInput); // Input para cantidad
  card.appendChild(addToCartButton); // Botón para agregar al carrito

  // Agregar la card al contenedor principal
  containerCards.appendChild(card);
};

// Renderizar los productos
const renderProducts = async () => {
  let products = await getApi(URL); // Obtener productos desde la API
  // Recorrer el arreglo de productos y crear una card para cada uno
  products.forEach((product) => {
    createProduct(product);
  });
};

// Llamada inicial para mostrar productos
renderProducts();

// Evento para proceder al pago
document.getElementById("checkoutButton").addEventListener("click", () => {
  if (Object.keys(cart).length > 0) {
    // Si el carrito no está vacío, mostrar la alerta con el número de productos y vaciar el carrito
    alert(`Has procedido al pago con ${Object.keys(cart).length} productos en tu carrito.`);
    emptyCart(); // Vaciar la bolsa después de proceder al pago
  } else {
    // Si el carrito está vacío, mostrar una alerta
    alert("Tu carrito de compras está vacío.");
  }
});

