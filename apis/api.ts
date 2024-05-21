import axios from 'axios';

const BASIC_URL = 'https://bootcamp-api.codeit.kr/api';

export async function getUser() {
  const response = await axios.get(`${BASIC_URL}/users`, {
    headers: {
      Authorization: localStorage.accessToken,
    },
  });
  if (response.status < 200 || response.status >= 300) {
    throw new Error('사용자 데이터를 불러오는데 실패했습니다.');
  }
  const result = response.data.data[0];
  return result;
}

export async function postValidateSignUp(id: string) {
  const response = await axios.post(`${BASIC_URL}/check-email`, {
    email: id,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error('이미 사용 중인 이메일입니다.');
  }
  // const result = response.data.isUsableNickname;

  return response;
}

export async function postSignUp(id: string, pw: string) {
  const response = await axios.post(`${BASIC_URL}/sign-up`, {
    email: id,
    password: pw,
  });
  console.log(response);

  if (response.status < 200 || response.status >= 300) {
    throw new Error('회원가입에 실패했습니다.');
  }
  // const result = response.data.data;
  return response;
}

export async function postSignIn(id: string, pw: string) {
  const response = await axios.post(`${BASIC_URL}/sign-in`, {
    email: id,
    password: pw,
  });
  if (response.status < 200 || response.status >= 300) {
    throw new Error('로그인에 실패했습니다.');
  }
  const result = response.data.data;
  return result;
}

export async function getFolders(userId: number | null, folderId: number) {
  const queryParam = folderId === 0 ? '' : `/${folderId}`;
  const response = await axios.get(
    `${BASIC_URL}/users/${userId}/folders${queryParam}`
  );
  if (response.status < 200 || response.status >= 300) {
    throw new Error('사용자 데이터를 불러오는데 실패했습니다.');
  }
  const result = response.data.data;
  return result;
}

export async function getLinks(userId: number | null, folderId: number) {
  const queryParam = folderId === 0 ? '' : `?folderId=${folderId}`;
  const response = await axios.get(
    `${BASIC_URL}/users/${userId}/links${queryParam}`
  );
  if (response.status < 200 || response.status >= 300) {
    throw new Error('사용자 데이터를 불러오는데 실패했습니다.');
  }
  const data = response.data.data;
  return data;
}
