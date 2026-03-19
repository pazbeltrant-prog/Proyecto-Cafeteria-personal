/**
 * Formatea un valor numérico a Pesos Chilenos (CLP)
 * @param {number} value - El valor a formatear
 * @returns {string} - El valor formateado con signo $ y separador de miles
 */
export const formatCLP = (value) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(value);
};
