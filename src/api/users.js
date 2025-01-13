import api from './api';
const API_URL = "http://192.168.56.1:3000";


export const editarUsuario = async (registro,id) => {
    try {
      const response = await api.put(`/edituser/${id}`, {registro});
  
      return response.data;
    } catch (error) {
      console.error("Error al editar usuario:", error.response ? error.response.data : error.message);
      throw error;
    }
  }

export const getUsuario = async (boleta) => {
    try {
      const response = await api.get(`/usuario/${boleta}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuario:", error.response ? error.response.data : error.message);
      throw error;
    }
  }
  
  export const getUsuarios = async () => {
    try {
      const response = await api.get(`/usuarios`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error.response ? error.response.data : error.message);
      throw error;
    }
  }
  
  export const deleteUsuario = async (boleta) => {
    try {
        const response = await api.delete(`${API_URL}/deleteuser/${boleta}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar usuario:", error.response ? error.response.data : error.message);
        throw error;
    }
};
