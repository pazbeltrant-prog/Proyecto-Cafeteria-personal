<script setup>
import { formatCLP } from '../utils/formatters';

defineProps(['items', 'total']);
defineEmits(['close', 'remove', 'update-quantity', 'checkout']);
</script>

<template>
  <div class="d-flex flex-column h-100">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">Mi Carrito</h3>
      <button class="btn-close" @click="$emit('close')"></button>
    </div>

    <div v-if="items.length === 0" class="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-muted">
      <i class="bi bi-cart-x display-1 mb-3"></i>
      <p>Tu carrito está vacío</p>
    </div>

    <div v-else class="flex-grow-1 overflow-auto pe-2">
      <div v-for="item in items" :key="item.id" class="card mb-3 border-0 bg-light rounded-3">
        <div class="card-body p-2">
          <div class="row align-items-center g-2">
            <div class="col-3">
              <img :src="item.image" class="img-fluid rounded" :alt="item.name">
            </div>
            <div class="col-9">
              <div class="d-flex justify-content-between">
                <h6 class="mb-0 fw-bold">{{ item.name }}</h6>
                <button class="btn btn-sm text-danger p-0" @click="$emit('remove', item.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
              <p class="small text-muted mb-1">{{ formatCLP(item.price) }}</p>
              
              <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary py-0 px-2" @click="$emit('update-quantity', item.id, -1)">-</button>
                <span class="mx-3 fw-bold">{{ item.quantity }}</span>
                <button class="btn btn-sm btn-outline-secondary py-0 px-2" @click="$emit('update-quantity', item.id, 1)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="items.length > 0" class="mt-4 pt-4 border-top">
      <div class="d-flex justify-content-between mb-3">
        <span class="h5">Total:</span>
        <span class="h5 fw-bold text-primary">{{ formatCLP(total) }}</span>
      </div>
      <button class="btn btn-primary w-100 btn-lg rounded-pill" @click="$emit('checkout')">
        Finalizar Compra
      </button>
    </div>
  </div>
</template>

<style scoped>
.overflow-auto::-webkit-scrollbar {
  width: 5px;
}
.overflow-auto::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
</style>
