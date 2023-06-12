import axios from 'axios';

const authURL = 'https://infinite-dawn-77240.herokuapp.com/api';

export const login = async ({ useremail, password }) => {
  try {
    const {
      data: { data },
    } = await axios.post(`${authURL}/signin`, {
      email: useremail,
      password,
    });

    console.log(data);

    const { token } = data;
    if (token) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const {
      data: { data },
    } = await axios.post(`${authURL}/register`, {
      username,
      email,
      password,
    });
    const { token } = data;

    if (token) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error('[Register Failed]: ', error);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authURL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};
