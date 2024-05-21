import axios from 'axios';

const BASIC_URL = 'https://bootcamp-api.codeit.kr/api';

export async function getUser() {
  const response = await axios.get(`${BASIC_URL}/users`, {
    headers: {
      Authorization: localStorage.accessToken,
    },
  });
  const result = response.data.data[0];
  return result;
}

export async function postValidateSignUp(id: string) {
  const response = await axios.post(`${BASIC_URL}/check-email`, {
    email: id,
  });
  return response;
}

export async function postSignUp(id: string, pw: string) {
  const response = await axios.post(`${BASIC_URL}/sign-up`, {
    email: id,
    password: pw,
  });
  return response;
}

export async function postSignIn(id: string, pw: string) {
  const response = await axios.post(`${BASIC_URL}/sign-in`, {
    email: id,
    password: pw,
  });
  const result = response.data.data;
  return result;
}

export async function getFolders(userId: number | null, folderId: number) {
  const queryParam = folderId === 0 ? '' : `/${folderId}`;
  const response = await axios.get(
    `${BASIC_URL}/users/${userId}/folders${queryParam}`
  );
  const result = response.data.data;
  return result;
}

export async function getLinks(userId: number | null, folderId: number) {
  const queryParam = folderId === 0 ? '' : `?folderId=${folderId}`;

  const response = await axios.get(
    `${BASIC_URL}/users/${userId}/links${queryParam}`
  );
  const data = response.data.data;
  return data;
}
