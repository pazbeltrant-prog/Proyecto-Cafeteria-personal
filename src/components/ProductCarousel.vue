<script setup>
import { computed } from 'vue';
import ProductCard from './ProductCard.vue';

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

defineEmits(['add-to-cart']);

// Función para agrupar productos de a 3 (o el tamaño que desees)
const chunkedProducts = computed(() => {
  const chunks = [];
  const chunkSize = 3;
  for (let i = 0; i < props.products.length; i += chunkSize) {
    chunks.push(props.products.slice(i, i + chunkSize));
  }
  return chunks;
});
</script>

<template>
  <div id="productCarousel" class="carousel slide product-carousel" data-bs-ride="carousel">
    <!-- Indicators -->
    <div class="carousel-indicators" v-if="chunkedProducts.length > 1">
      <button 
        v-for="(_, index) in chunkedProducts" 
        :key="'indicator-' + index"
        type="button" 
        data-bs-target="#productCarousel" 
        :data-bs-slide-to="index" 
        :class="{ active: index === 0 }"
        aria-current="index === 0 ? 'true' : 'false'" 
        :aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>

    <div class="carousel-inner p-4">
      <div 
        v-for="(chunk, index) in chunkedProducts" 
        :key="'slide-' + index"
        :class="['carousel-item', { active: index === 0 }]"
      >
        <div class="container">
          <div class="row g-4 justify-content-center">
            <div 
              v-for="product in chunk" 
              :key="product.id" 
              class="col-12 col-md-6 col-lg-4"
            >
              <ProductCard :product="product" @add-to-cart="$emit('add-to-cart', product)" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- No results message inside carousel style -->
      <div v-if="products.length === 0" class="text-center py-5">
        <div class="no-results">
          <i class="bi bi-search display-1 text-muted mb-4 d-block"></i>
          <h3>No se encontraron productos</h3>
          <p class="text-muted">Intenta con otros términos de búsqueda.</p>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <template v-if="chunkedProducts.length > 1">
      <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon-custom p-3 rounded-circle bg-primary" aria-hidden="true">
          <i class="bi bi-chevron-left text-white"></i>
        </span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon-custom p-3 rounded-circle bg-primary" aria-hidden="true">
          <i class="bi bi-chevron-right text-white"></i>
        </span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </template>
  </div>
</template>

<style scoped>
.product-carousel {
  min-height: 400px;
}

.carousel-inner {
  overflow: visible; /* Para que las sombras de las cards no se corten */
}

.carousel-indicators {
  bottom: -30px;
}

.carousel-indicators [button] {
  background-color: #6a11cb;
}

.carousel-control-prev,
.carousel-control-next {
  width: 5%;
  opacity: 1;
}

.carousel-control-prev {
  left: -2%;
}

.carousel-control-next {
  right: -2%;
}

.carousel-control-prev-icon-custom,
.carousel-control-next-icon-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
}

.carousel-control-prev-icon-custom:hover,
.carousel-control-next-icon-custom:hover {
  transform: scale(1.1);
  background-color: #2575fc !important;
}

.no-results {
  opacity: 0.7;
}

@media (max-width: 992px) {
  .carousel-control-prev {
    left: -10px;
  }
  .carousel-control-next {
    right: -10px;
  }
}
</style>
