import { Dispatch, FocusEvent, SetStateAction } from 'react';

export function validateEmail(
  e: FocusEvent<HTMLInputElement>,
  setter: Dispatch<
    SetStateAction<{
      email: { error: boolean; message: string };
      password: { error: boolean; message: string };
      passwordConform: { error: boolean; message: string };
    }>
  >
) {
  if (!e.target.value) {
    setter((prev) => ({
      ...prev,
      email: { error: true, message: '이메일을 입력해 주세요.' },
    }));
    return;
  }
  const emailPattern: RegExp =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  if (!emailPattern.test(e.target.value)) {
    setter((prev) => ({
      ...prev,
      email: { error: true, message: '올바른 이메일 주소가 아닙니다.' },
    }));
    return;
  }
  setter((prev) => ({
    ...prev,
    email: { error: false, message: '' },
  }));
}

export function validateSignUpPassword(
  e: FocusEvent<HTMLInputElement>,
  setter: Dispatch<
    SetStateAction<{
      email: { error: boolean; message: string };
      password: { error: boolean; message: string };
      passwordConform: { error: boolean; message: string };
    }>
  >
) {
  const passwordPattern: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  if (e.target.value.length < 8 || !passwordPattern.test(e.target.value)) {
    setter((prev) => ({
      ...prev,
      password: {
        error: true,
        message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
      },
    }));
    return;
  }
  setter((prev) => ({
    ...prev,
    password: { error: false, message: '' },
  }));
}

export function validateSignInPassword(
  e: FocusEvent<HTMLInputElement>,
  setter: Dispatch<
    SetStateAction<{
      email: { error: boolean; message: string };
      password: { error: boolean; message: string };
      passwordConform: { error: boolean; message: string };
    }>
  >
) {
  if (!e.target.value) {
    setter((prev) => ({
      ...prev,
      password: { error: true, message: '비밀번호를 입력해 주세요.' },
    }));
    return;
  }
  setter((prev) => ({
    ...prev,
    password: { error: false, message: '' },
  }));
}

export function validatePasswordConform(
  e: FocusEvent<HTMLInputElement>,
  password: string,
  setter: Dispatch<
    SetStateAction<{
      email: { error: boolean; message: string };
      password: { error: boolean; message: string };
      passwordConform: { error: boolean; message: string };
    }>
  >
) {
  if (e.target.value !== password) {
    setter((prev) => ({
      ...prev,
      passwordConform: {
        error: true,
        message: '비밀번호가 일치하지 않아요.',
      },
    }));
    return;
  }
  setter((prev) => ({
    ...prev,
    passwordConform: { error: false, message: '' },
  }));
}
