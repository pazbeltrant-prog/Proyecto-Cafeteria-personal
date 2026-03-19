<script setup>
import { formatCLP } from '../utils/formatters';

defineProps(['product']);
defineEmits(['add-to-cart']);
</script>

<template>
  <div class="card h-100 product-card border-0 shadow-sm">
    <div class="image-container">
      <img :src="product.image" class="card-img-top" :alt="product.name">
      <div class="category-badge">{{ product.category }}</div>
    </div>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fw-bold">{{ product.name }}</h5>
      <p class="card-text text-muted small flex-grow-1">{{ product.description }}</p>
      <div class="d-flex justify-content-between align-items-center mt-3">
        <span class="h5 mb-0 fw-bold text-primary">{{ formatCLP(product.price) }}</span>
        <button class="btn btn-primary" @click="$emit('add-to-cart', product)">
          Agregar al Carrito
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border-radius: 15px;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
  background-color: #f8f9fa;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-img-top {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.product-card:hover .card-img-top {
  transform: scale(1.1);
}

.category-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(106, 17, 203, 0.8);
  color: white;
  padding: 0.2rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
}
</style>
