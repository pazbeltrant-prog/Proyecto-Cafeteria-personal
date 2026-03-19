<script setup>
import { ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import ProductCard from './components/ProductCard.vue';
import Cart from './components/Cart.vue';
import Cafeteria from './components/Cafeteria.vue';
import ReservationForm from './components/ReservationForm.vue';
import RoomSelection from './components/RoomSelection.vue';
import Footer from './components/Footer.vue';
import { products } from './data/products';

const cart = ref([]);
const isCartOpen = ref(false);
const currentView = ref('home');
const selectedRoom = ref('');

const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }
};

const removeFromCart = (productId) => {
  cart.value = cart.value.filter(item => item.id !== productId);
};

const updateQuantity = (productId, delta) => {
  const item = cart.value.find(item => item.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    }
  }
};

const cartCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const checkout = () => {
  alert('¡Compra simulada con éxito! Gracias por tu preferencia.');
  cart.value = [];
  isCartOpen.value = false;
};
</script>

<template>
  <div class="app-container">
    <Navbar :cartCount="cartCount" @toggle-cart="isCartOpen = !isCartOpen" />
    
    <main v-if="currentView === 'home'">
      <!-- Hero Section -->
      <header class="hero-section text-center py-5 mb-5">
        <div class="container">
          <h1 class="display-3 fw-bold mb-3">Manga & Books Heaven</h1>
          <p class="lead mb-4">Tu rincón favorito para la lectura, el café y la creatividad.</p>
          <a href="#productos" class="btn btn-primary btn-lg px-5">Explorar Catálogo</a>
        </div>
      </header>

      <!-- Products Section -->
      <section id="productos" class="py-5 bg-light">
        <div class="container">
          <h2 class="text-center mb-5 section-title">Nuestros Productos</h2>
          <div class="row g-4">
            <div v-for="product in products" :key="product.id" class="col-12 col-md-6 col-lg-4">
              <ProductCard :product="product" @add-to-cart="addToCart" />
            </div>
          </div>
        </div>
      </section>

      <!-- Cafeteria Section -->
      <Cafeteria />

      <!-- Reservation Section -->
      <section id="reservas" class="py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <h2 class="display-5 fw-bold mb-4">Salas de Reunión</h2>
              <p class="lead mb-4">Reserva un espacio diseñado para clubes de lectura, talleres de manualidades o simplemente para compartir con amigos apasionados por las historias.</p>
              <ul class="list-unstyled mb-4">
                <li class="mb-2"><i class="bi bi-check-circle-fill text-primary me-2"></i> Capacidad hasta 10 personas</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-primary me-2"></i> Equipamiento audiovisual</li>
                <li class="mb-2"><i class="bi bi-check-circle-fill text-primary me-2"></i> Café y snacks incluidos</li>
              </ul>
              <button @click="currentView = 'rooms'" class="btn btn-outline-primary btn-lg rounded-pill px-4">
                <i class="bi bi-eye me-2"></i> Ver Salas y Elegir
              </button>
            </div>
            <div class="col-lg-6">
              <ReservationForm :selectedRoom="selectedRoom" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <main v-else-if="currentView === 'rooms'">
      <RoomSelection @back="currentView = 'home'" @select-room="(room) => { selectedRoom = room; currentView = 'home'; }" />
    </main>

    <Footer />

    <!-- Shopping Cart Sidebar/Modal -->
    <div v-if="isCartOpen" class="cart-overlay" @click="isCartOpen = false"></div>
    <div :class="['cart-sidebar', { 'open': isCartOpen }]">
      <Cart 
        :items="cart" 
        :total="cartTotal"
        @close="isCartOpen = false" 
        @remove="removeFromCart"
        @update-quantity="updateQuantity"
        @checkout="checkout"
      />
    </div>
  </div>
</template>

<style>
.section-title {
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 3rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 2px;
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/Img/fondo la biblioteca.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 120px 0;
  border-radius: 0 0 50px 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100%;
  background: white;
  z-index: 1050;
  transition: right 0.3s ease;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
  padding: 2rem;
}

.cart-sidebar.open {
  right: 0;
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 1040;
}

@media (max-width: 576px) {
  .cart-sidebar {
    width: 100%;
    right: -100%;
  }
}
</style>
