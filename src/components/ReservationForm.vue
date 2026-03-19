<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  selectedRoom: {
    type: String,
    default: ''
  }
});

const form = ref({
  name: '',
  email: '',
  date: '',
  time: '',
  groupSize: 2,
  roomType: ''
});

// Sincronizar roomType con el prop selectedRoom
watch(() => props.selectedRoom, (newRoom) => {
  if (newRoom) {
    form.value.roomType = newRoom;
  }
}, { immediate: true });

// Regla para el nombre: Solo minúsculas de la a-z y espacios
// Se activa cada vez que el usuario escribe
watch(() => form.value.name, (newValue) => {
  form.value.name = newValue
    .toLowerCase() // Fuerza minúsculas
    .replace(/[^a-z\s]/g, ''); // Elimina cualquier cosa que NO sea a-z o espacio
});

const submitReservation = () => {
  // Validación extra de correo antes de enviar
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|yahoo|icloud|.*)\.(com|cl)$/;
  
  if (!emailRegex.test(form.value.email)) {
    alert("Por favor, usa un correo que termine en .com o .cl");
    return;
  }

  alert(`Reserva solicitada para ${form.value.name} en la sala "${form.value.roomType || 'No especificada'}" el día ${form.value.date} a las ${form.value.time}. Nos contactaremos pronto.`);
  
  // Reset del formulario
  form.value = { name: '', email: '', date: '', time: '', groupSize: 2, roomType: props.selectedRoom };
};
</script>

<template>
  <div class="card border-0 shadow-lg p-4 rounded-4">
    <h4 class="fw-bold mb-4">Solicitud de Reserva</h4>
    <form @submit.prevent="submitReservation">
      
      <div class="mb-3">
        <label class="form-label">Nombre Completo (solo minúsculas)</label>
        <input 
          v-model="form.name" 
          type="text" 
          class="form-control" 
          placeholder="ej: juan perez"
          pattern="[a-z\s]+" 
          title="Solo se permiten letras minúsculas sin acentos ni números"
          required
        >
      </div>

      <div class="mb-3">
        <label class="form-label">Correo Electrónico (.com o .cl)</label>
        <input 
          v-model="form.email" 
          type="email" 
          class="form-control" 
          placeholder="tu@email.com"
          pattern="^.*(\.com|\.cl)$"
          title="El correo debe terminar en .com o .cl"
          required
        >
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Fecha</label>
          <input v-model="form.date" type="date" class="form-control" required>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Hora</label>
          <input v-model="form.time" type="time" class="form-control" required>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">Sala Seleccionada</label>
        <select v-model="form.roomType" class="form-select" required>
          <option value="" disabled>Selecciona una sala</option>
          <option value="Santuario Manga">Santuario Manga</option>
          <option value="Refugio del Escritor">Refugio del Escritor</option>
          <option value="Gran Club de Lectura">Gran Club de Lectura</option>
        </select>
        <div v-if="!form.roomType" class="form-text text-danger">
          Tip: Puedes ver fotos detalladas haciendo clic en "Ver Salas y Elegir" arriba.
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">Tamaño del Grupo</label>
        <select v-model="form.groupSize" class="form-select">
          <option v-for="n in 10" :key="n" :value="n">{{ n }} personas</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary w-100 btn-lg rounded-pill">Enviar Solicitud</button>
    </form>
  </div>
</template>

<style scoped>
/* Tu estilo se mantiene igual */
.form-control, .form-select {
  padding: 0.8rem 1rem;
  border-radius: 10px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
}

/* Estilo visual para cuando el campo es inválido mientras escribes */
.form-control:invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.1);
}
</style>