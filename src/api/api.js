const API_BASE_URL = 'http://localhost:7777/api'; // Cambia esto a la URL de tu backend

// Obtener todas las programaciones
export const getProgramaciones = async () => {
  const response = await fetch(`${API_BASE_URL}/programacion`);
  return response.json();
};

// Obtener una programación por ID
export const getProgramacion = async (id) => {
  const response = await fetch(`${API_BASE_URL}/programacion/${id}`);
  return response.json();
};

// Obtener programaciones por sede
export const getProgramacionesPorSede = async (sede) => {
  const response = await fetch(`${API_BASE_URL}/programaciones/${sede}`);
  return response.json();
};

// Obtener programaciones por ficha
export const getProgramacionesPorFicha = async (ficha, cordinacion) => {
  const response = await fetch(`${API_BASE_URL}/programacion/ficha/${ficha}/cordinacion/${cordinacion}`);
  return response.json();
};

// Crear una nueva programación
export const createProgramacion = async (programacion) => {
  const response = await fetch(`${API_BASE_URL}/programacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(programacion),
  });
  return response.json();
};

// Actualizar una programación existente
export const updateProgramacion = async (id, programacion) => {
  const response = await fetch(`${API_BASE_URL}/programacion/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(programacion),
  });
  return response.json();
};

// Eliminar una programación
export const deleteProgramacion = async (id) => {
  const response = await fetch(`${API_BASE_URL}/programacion/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

// Talleres
export const getTalleres = async () => {
  const response = await fetch(`${API_BASE_URL}/taller`);
  return response.json();
};

export const getTaller = async (id) => {
  const response = await fetch(`${API_BASE_URL}/taller/${id}`);
  return response.json();
};

export const postTaller = async (taller) => {
  const response = await fetch(`${API_BASE_URL}/taller`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taller),
  });
  return response.json();
};

export const putTaller = async (id, taller) => {
  const response = await fetch(`${API_BASE_URL}/taller/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taller),
  });
  return response.json();
};

export const deleteTaller = async (id) => {
  await fetch(`${API_BASE_URL}/taller/${id}`, {
    method: 'DELETE',
  });
};

// Fichas
export const getFichas = async () => {
  const response = await fetch(`${API_BASE_URL}/ficha`);
  return response.json();
};

export const getFicha = async (id) => {
  const response = await fetch(`${API_BASE_URL}/ficha/${id}`);
  return response.json();
};

export const postFicha = async (ficha) => {
  const response = await fetch(`${API_BASE_URL}/ficha`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ficha),
  });
  return response.json();
};

export const putFicha = async (id, ficha) => {
  const response = await fetch(`${API_BASE_URL}/ficha/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ficha),
  });
  return response.json();
};

export const deleteFicha = async (numeroFicha) => {
  await fetch(`${API_BASE_URL}/ficha/${numeroFicha}`, {
    method: 'DELETE',
  });
};

// Capacitadores
export const getCapacitadores = async () => {
  const response = await fetch(`${API_BASE_URL}/capacitador`);
  return response.json();
};

export const getCapacitador = async (id) => {
  const response = await fetch(`${API_BASE_URL}/capacitador/${id}`);
  return response.json();
};

export const postCapacitador = async (capacitador) => {
  const response = await fetch(`${API_BASE_URL}/capacitador`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(capacitador),
  });
  return response.json();
};

export const putCapacitador = async (id, capacitador) => {
  const response = await fetch(`${API_BASE_URL}/capacitador/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(capacitador),
  });
  return response.json();
};
