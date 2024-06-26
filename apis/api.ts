import axios from 'axios';

const BASIC_URL = 'https://bootcamp-api.codeit.kr/api/linkbrary/v1';

export async function getUser() {
  let response;
  if (localStorage.accessToken) {
    response = await axios.get(`${BASIC_URL}/users`, {
      headers: {
        Authorization: localStorage.accessToken,
      },
    });
  } else {
    return;
  }
  const result = response.data[0];
  return result;
}

export async function getFolderUser(id: number) {
  const response = await axios.get(`${BASIC_URL}/users/${id}`);
  const result = response.data[0];
  return result;
}

export async function postCheckDuplicateEmail(id: string) {
  const response = await axios.post(`${BASIC_URL}/check-email`, {
    email: id,
  });
  return response;
}

export async function postSignUp(id: string, pw: string) {
  const response = await axios.post(`${BASIC_URL}/auth/sign-up`, {
    email: id,
    password: pw,
  });
  return response;
}

export async function postSignIn(id: string, pw: string) {
  const response = await axios.post(`${BASIC_URL}/auth/sign-in`, {
    email: id,
    password: pw,
  });
  const result = response.data;
  return result;
}

export async function getFolders(folderId: number) {
  const queryParam = folderId === 0 ? '' : `/${folderId}`;
  const response = await axios.get(`${BASIC_URL}/folders${queryParam}`, {
    headers: {
      Authorization: localStorage.accessToken,
    },
  });
  const result = response.data;
  return result;
}

export async function getLinks(folderId: number) {
  const queryParam = folderId === 0 ? '/links' : `/folders/${folderId}/links`;
  const response = await axios.get(`${BASIC_URL}${queryParam}`, {
    headers: {
      Authorization: localStorage.accessToken,
    },
  });
  const data = response.data;
  return data;
}

export async function addFolder(newFolderName: string) {
  const response = await axios.post(
    `${BASIC_URL}/folders`,
    {
      name: newFolderName,
    },
    {
      headers: {
        Authorization: localStorage.accessToken,
      },
    }
  );
}
