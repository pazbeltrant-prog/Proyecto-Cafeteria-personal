<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['back', 'select-room']);

const rooms = [
  {
    id: 1,
    name: 'Santuario Manga',
    description: 'Un espacio vibrante lleno de las últimas novedades, pufs cómodos y la mejor iluminación para sumergirte en tus historias favoritas.',
    capacity: 6,
    image: '/src/assets/images/manga-room.png',
    features: ['Pufs ergonómicos', 'Colección exclusiva', 'Luz regulable']
  },
  {
    id: 2,
    name: 'Refugio del Escritor',
    description: 'Diseñado para la máxima concentración. Silencioso, con mobiliario ergonómico y una vista inspiradora para que las palabras fluyan.',
    capacity: 4,
    image: '/src/assets/images/writers-haven.png',
    features: ['Escritorio amplio', 'Silla ergonómica', 'Ambiente silencioso']
  },
  {
    id: 3,
    name: 'Gran Club de Lectura',
    description: 'Nuestra sala más amplia, ideal para debates apasionados. Cuenta con una mesa central, rincón de sofás y estación de café propia.',
    capacity: 10,
    image: '/src/assets/images/book-club.png',
    features: ['Mesa de reuniones', 'Área de sofás', 'Estación de café']
  }
];

const selectRoom = (roomName) => {
  emit('select-room', roomName);
};
</script>

<template>
  <div class="container py-5">
    <div class="d-flex align-items-center mb-5">
      <button @click="$emit('back')" class="btn btn-outline-primary rounded-circle me-3">
        <i class="bi bi-arrow-left"></i>
      </button>
      <h2 class="display-6 fw-bold mb-0">Elige tu Sala Ideal</h2>
    </div>

    <div class="row g-4">
      <div v-for="room in rooms" :key="room.id" class="col-lg-4">
        <div class="card h-100 border-0 shadow-sm hover-card overflow-hidden rounded-4">
          <div class="room-image-container">
            <img :src="room.image" :alt="room.name" class="card-img-top room-img">
            <div class="capacity-badge">
              <i class="bi bi-people-fill me-1"></i> Hasta {{ room.capacity }}
            </div>
          </div>
          <div class="card-body p-4">
            <h4 class="fw-bold mb-3">{{ room.name }}</h4>
            <p class="text-muted mb-4 small">{{ room.description }}</p>
            
            <div class="features-list mb-4">
              <span v-for="feature in room.features" :key="feature" class="badge bg-light text-primary border me-2 mb-2 px-3 py-2 rounded-pill">
                {{ feature }}
              </span>
            </div>

            <button @click="selectRoom(room.name)" class="btn btn-primary w-100 rounded-pill py-2">
              Seleccionar esta Sala
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
}

.room-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.room-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.hover-card:hover .room-img {
  transform: scale(1.1);
}

.capacity-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(106, 17, 203, 0.9);
  color: white;
  padding: 5px 15px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
}

.btn-primary {
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  border: none;
}

.btn-primary:hover {
  opacity: 0.9;
}
</style>
