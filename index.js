const products = [
  {
    name: "Sony Playstation 5",
    url: "images/playstation_5.png",
    category: "games",
    price: 499.99,
  },
  {
    name: "Samsung Galaxy",
    url: "images/samsung_galaxy.png",
    category: "smartphones",
    price: 399.99,
  },
  {
    name: "Cannon EOS Camera",
    url: "images/cannon_eos_camera.png",
    category: "cameras",
    price: 749.99,
  },
  {
    name: "Sony A7 Camera",
    url: "images/sony_a7_camera.png",
    category: "cameras",
    price: 1999.99,
  },
  {
    name: "LG TV",
    url: "images/lg_tv.png",
    category: "televisions",
    price: 799.99,
  },
  {
    name: "Nintendo Switch",
    url: "images/nintendo_switch.png",
    category: "games",
    price: 299.99,
  },
  {
    name: "Xbox Series X",
    url: "images/xbox_series_x.png",
    category: "games",
    price: 499.99,
  },
  {
    name: "Samsung TV",
    url: "images/samsung_tv.png",
    category: "televisions",
    price: 1099.99,
  },
  {
    name: "Google Pixel",
    url: "images/google_pixel.png",
    category: "smartphones",
    price: 499.99,
  },
  {
    name: "Sony ZV1F Camera",
    url: "images/sony_zv1f_camera.png",
    category: "cameras",
    price: 799.99,
  },
  {
    name: "Toshiba TV",
    url: "images/toshiba_tv.png",
    category: "televisions",
    price: 499.99,
  },
  {
    name: "iPhone 14",
    url: "images/iphone_14.png",
    category: "smartphones",
    price: 999.99,
  },
];

//   Select Dom Elements

const productsWrapper = document.getElementById('products-wrapper');
const checkboxs = document.querySelectorAll(".check");
const filtersConatiner = document.getElementById("filters-container");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

let cartitemCount = 0;
const productElements = [];

filtersConatiner.addEventListener('change',filterProducts);
searchInput.addEventListener('input',filterProducts);

products.forEach((product) => {
  
    const productElement = createproductelement(product);
    productElements.push(productElement);
    productsWrapper.appendChild(productElement);
});

function createproductelement(product){
  const productElement = document.createElement("div");
  productElement.className = "item space-y-2";
  productElement.innerHTML = `
    <div 
    class="bg-gray-200 flex justify-center relative overflow-hidden group cursor-pointer border 
    rounded-xl ">
    <img 
    src="${product.url}" 
    alt="${product.name}" 
    class="w-full h-full object-cover">
    <button
    class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 
    translate-y-full transition group-hover:translate-y-0">
        Add to Cart
    </button>
    </div>
    <p class="text-xl">${product.name}</p>
    <strong>$${product.price.toLocaleString()}</strong>
    `;
    productElement.querySelector('.status').addEventListener('click',updateCart);
    return productElement;
};

// update cart

function updateCart(e){
  const statusEl = e.target;
  if (statusEl.classList.contains('added')) {
    // remove from cart
    statusEl.classList.remove('added');
    statusEl.innerHTML = 'Add to Cart';
    statusEl.classList.remove('bg-red-600');
    statusEl.classList.add('bg-gray-800');
    cartitemCount--;

  } else {
    // add to cart
    statusEl.classList.add('added');
    statusEl.innerHTML = 'Remove from Cart';
    statusEl.classList.remove('bg-gray-800');
    statusEl.classList.add('bg-red-600');
    cartitemCount++;

  }
  cartCount.innerText = cartitemCount.toString();
}

// filter products

function filterProducts(){
  const searchTerm = searchInput.value.trim().toLowerCase();
  const checkedCategories = Array.from(checkboxs).filter(
    (check) => check.checked
  ).map((check) => check.id)
  console.log(checkedCategories); 

  // loop for products

  productElements.forEach((productElement,index) => { 
  const product = products[index];

  // check the product matches or in search item

  const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
  const isInCheckedCatogory = checkedCategories.length === 0 || checkedCategories.includes(product.category);
  
  if (matchesSearchTerm && isInCheckedCatogory) {
    productElement.classList.remove('hidden');
  } else {
    productElement.classList.add('hidden');
  }
});
}