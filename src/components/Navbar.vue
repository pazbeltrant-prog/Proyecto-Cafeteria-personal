<script setup>
defineProps(['cartCount']);
defineEmits(['toggle-cart', 'search']);
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">
        <span class="text-primary">Biblioteca de Wan Shin Tong</span> 
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="#productos">Productos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#cafeteria">Cafetería</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#reservas">Reservas</a>
          </li>
        </ul>
        <div class="d-flex align-items-center gap-3">
          <div class="search-container d-none d-md-block">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-primary text-primary">
                <i class="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                class="form-control border-primary bg-dark text-white search-input" 
                placeholder="Buscar productos..."
                @input="$emit('search', $event.target.value)"
              >
            </div>
          </div>
          <button class="btn btn-outline-primary position-relative" @click="$emit('toggle-cart')">
            <i class="bi bi-cart3"></i> <span class="d-none d-sm-inline">Carrito</span>
            <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ cartCount }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.navbar-brand {
  font-size: 1.5rem;
}
.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
.search-input:focus {
  background-color: #2b3035;
  color: white;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.search-container {
  width: 250px;
}
</style>
