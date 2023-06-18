import axios from 'axios';

const authURL = 'https://infinite-dawn-77240.herokuapp.com/api';

export const login = async ({ account, password }) => {
  try {
    const {
      data: { data },
    } = await axios.post(`${authURL}/users/signin`, {
      account,
      password,
    });

    const { token } = data;
    if (token) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};

export const adminLogin = async ({ account, password }) => {
  try {
    const {
      data: { data },
    } = await axios.post(`${authURL}/admin/signin`, {
      account,
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

export const register = async ({
  name,
  account,
  password,
  checkPassword,
  email,
}) => {
  try {
    const { data } = await axios.post(`${authURL}/users`, {
      name,
      account,
      password,
      checkPassword,
      email,
    });

    console.log(data);

    if (data.account) {
      return { success: true };
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
