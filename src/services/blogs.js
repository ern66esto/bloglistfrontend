import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = { 
    headers: {Authorization: token},
  };
  try {
    const response = await axios.get(baseUrl, config);
    return response.data;  
  } catch (error) {
    console.log('Error getAll: ', error);
    throw error;
  }
  
};

const create = async (newObject) => {
  const config = { 
    headers: {Authorization: token},
  };
  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.log('Error create: ', error);
    throw error;
  }
  
}

const update = async (id, newObject) => {
  const config = { 
    headers: {Authorization: token},
  };
  const request = await axios.put(`${ baseUrl }/${id}`, newObject, config);
  return request.then(response => response.data)
}


export default { getAll, create, update, setToken };