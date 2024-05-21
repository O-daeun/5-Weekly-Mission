import Link from 'next/link';
import Image from 'next/image';
import * as S from '../../styles/Auth.styled';
import LogoIcon from '@/src/images/logo.svg';
import GoggleIcon from '@/src/images/login_google.svg';
import KakaotalkIcon from '@/src/images/login_kakaotalk.svg';
import EyeOnIcon from '@/src/images/eye_on.svg';
import EyeOffIcon from '@/src/images/eye_off.svg';
import { ChangeEvent, FormEvent, useState } from 'react';
import { postSignUp, postValidateSignUp } from '@/apis/api';
import { useRouter } from 'next/router';
import {
  validateEmail,
  validateSignUpPassword,
  validatePasswordConform,
} from '@/utils/validate';
import useAsync from '@/hooks/useAsync';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConform, setPasswordConform] = useState('');
  const [showError, setShowError] = useState({
    email: { error: false, message: '' },
    password: { error: false, message: '' },
    passwordConform: { error: false, message: '' },
  });
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisiblePasswordConform, setIsVisiblePasswordConform] =
    useState(false);
  const router = useRouter();
  const {
    pending: validateSignUpPending,
    error: validateSignUpError,
    requestFunction: validateSignUpRequest,
  } = useAsync(postValidateSignUp);
  const {
    pending: signUpPending,
    error: signUpError,
    requestFunction: signUpRequest,
  } = useAsync(postSignUp);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConformChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConform(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    validateEmail(email, setShowError);
    validateSignUpPassword(password, setShowError);
    validatePasswordConform(passwordConform, password, setShowError);

    if (
      (showError.email.error &&
        showError.email.message !== '이미 사용 중인 이메일입니다.') ||
      showError.password.error ||
      showError.passwordConform.error
    )
      return;

    const validateResult = await validateSignUpRequest(email);

    if (validateSignUpError) {
      setShowError((prev) => ({
        ...prev,
        email: {
          error: true,
          message: '이미 사용 중인 이메일입니다.',
        },
      }));
      return;
    }

    if (!validateResult) return;

    const signUpResult = await signUpRequest(email, password);

    if (signUpError) {
      setShowError((prev) => ({
        ...prev,
        email: {
          error: true,
          message: '이미 사용 중인 이메일입니다.',
        },
      }));
      return;
    }

    localStorage.setItem('accessToken', signUpResult?.data.data.accessToken);
    router.push('/folder');
  };

  const handleEmailBlur = () => {
    validateEmail(email, setShowError);
  };

  const handlePasswordBlur = () => {
    validateSignUpPassword(password, setShowError);
  };

  const handlePasswordConformBlur = () => {
    validatePasswordConform(passwordConform, password, setShowError);
  };

  const handlePasswordEyeButtonClick = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  const handlePasswordConformEyeButtonClick = () => {
    setIsVisiblePasswordConform((prev) => !prev);
  };

  return (
    <S.Layout>
      <S.Inner>
        <S.LogoLink href='/'>
          <Image src={LogoIcon} alt='Linkbrary logo' width='211' height='38' />
        </S.LogoLink>
        <S.TextWrap>
          <S.Text>이미 회원이신가요?</S.Text>
          <S.SignLink href='/signin'>로그인 하기</S.SignLink>
        </S.TextWrap>
        <S.Form onSubmit={handleSubmit}>
          <S.FormField>
            <S.Label htmlFor='email'>이메일</S.Label>
            <S.Input
              id='email'
              type='email'
              placeholder='이메일을 입력해 주세요.'
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              $iserror={showError.email.error.toString()}
            />
            {showError.email.error && (
              <S.ErrorMessage>{showError.email.message}</S.ErrorMessage>
            )}
          </S.FormField>
          <S.FormField>
            <S.Label htmlFor='password'>비밀번호</S.Label>
            <S.PasswordWrap>
              <S.Input
                id='password'
                type={isVisiblePassword ? 'text' : 'password'}
                placeholder='영문, 숫자를 조합해 8자 이상 입력해 주세요.'
                value={password}
                onChange={handlePasswordChange}
                $iserror={showError.password.error.toString()}
                onBlur={handlePasswordBlur}
              />
              <S.EyeButton type='button' onClick={handlePasswordEyeButtonClick}>
                <Image
                  src={isVisiblePassword ? EyeOnIcon : EyeOffIcon}
                  alt='비밀번호 눈 버튼'
                  width='16'
                  height='16'
                />
              </S.EyeButton>
            </S.PasswordWrap>
            {showError.password.error && (
              <S.ErrorMessage>{showError.password.message}</S.ErrorMessage>
            )}
          </S.FormField>
          <S.FormField>
            <S.Label htmlFor='passwordConfirm'>비밀번호 확인</S.Label>
            <S.PasswordWrap>
              <S.Input
                id='passwordConfirm'
                type='password'
                placeholder='비밀번호와 일치하는 값을 입력해 주세요.'
                value={passwordConform}
                onChange={handlePasswordConformChange}
                $iserror={showError.passwordConform.error.toString()}
                onBlur={handlePasswordConformBlur}
              />
              <S.EyeButton
                type='button'
                onClick={handlePasswordConformEyeButtonClick}
              >
                <Image
                  src={isVisiblePasswordConform ? EyeOnIcon : EyeOffIcon}
                  alt='비밀번호확인 눈 버튼'
                  width='16'
                  height='16'
                />
              </S.EyeButton>
            </S.PasswordWrap>
            {showError.passwordConform.error && (
              <S.ErrorMessage>
                {showError.passwordConform.message}
              </S.ErrorMessage>
            )}
          </S.FormField>
          <S.SubmitButton text='회원가입' type='submit' />
        </S.Form>
        <S.SnsWrap>
          <S.SnsTitle>다른 방식으로 가입하기</S.SnsTitle>
          <S.SnsList>
            <li>
              <Link href='https://www.google.com/'>
                <Image
                  src={GoggleIcon}
                  alt='구글 로그인'
                  width='42'
                  height='42'
                />
              </Link>
            </li>
            <li>
              <Link href='https://www.kakaocorp.com/page/'>
                <Image
                  src={KakaotalkIcon}
                  alt='카카오톡 로그인'
                  width='42'
                  height='42'
                />
              </Link>
            </li>
          </S.SnsList>
        </S.SnsWrap>
      </S.Inner>
    </S.Layout>
  );
}
