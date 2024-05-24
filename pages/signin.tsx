import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { validateEmail, validateSignInPassword } from '@/utils/validate';
import useAsync from '@/hooks/useAsync';
import { UserContext } from '@/contexts/UserContext';
import { getUser, postSignIn } from '@/apis/api';
import * as S from '@/styles/Auth.styled';
import LogoIcon from '@/public/images/logo.svg';
import GoggleIcon from '@/public/images/login_google.svg';
import KakaotalkIcon from '@/public/images/login_kakaotalk.svg';
import EyeOnIcon from '@/public/images/eye_on.svg';
import EyeOffIcon from '@/public/images/eye_off.svg';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState({
    email: { error: false, message: '' },
    password: { error: false, message: '' },
    passwordConform: { error: false, message: '' },
  });
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const {
    pending: signInPending,
    error: signInError,
    requestFunction: signInRequest,
  } = useAsync(postSignIn);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    validateEmail(email, setShowError);
    validateSignInPassword(password, setShowError);
    if (
      (showError.email.error &&
        showError.email.message !== '이메일을 확인해 주세요.') ||
      (showError.password.error &&
        showError.password.message !== '비밀번호를 확인해 주세요.')
    ) {
      return;
    }
    const result = await signInRequest(email, password);
    if (signInError) {
      setShowError((prev) => ({
        ...prev,
        email: {
          error: true,
          message: '이메일을 확인해 주세요.',
        },
        password: {
          error: true,
          message: '비밀번호를 확인해 주세요.',
        },
      }));
      return;
    }
    if (!result) return;

    localStorage.setItem('accessToken', result.accessToken);
    const nextUser = await getUser();
    setUser(nextUser);

    router.push('/folder');
  };

  const handleEmailBlur = () => {
    validateEmail(email, setShowError);
  };

  const handlePasswordBlur = () => {
    validateSignInPassword(password, setShowError);
  };

  const handlePasswordEyeButtonClick = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      router.push('/folder');
    } else {
      return;
    }
  }, [user]);

  return (
    <S.Layout>
      <S.Inner>
        <S.LogoLink href='/'>
          <Image src={LogoIcon} alt='Linkbrary logo' width='211' height='38' />
        </S.LogoLink>
        <S.TextWrap>
          <S.Text>회원이 아니신가요?</S.Text>
          <S.SignLink href='/signup'>회원 가입하기</S.SignLink>
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
                placeholder='비밀번호를 입력해 주세요.'
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                $iserror={showError.password.error.toString()}
              />
              <S.EyeButton type='button' onClick={handlePasswordEyeButtonClick}>
                <Image
                  src={isVisiblePassword ? EyeOnIcon : EyeOffIcon}
                  alt='안 보이기'
                  width='16'
                  height='16'
                />
              </S.EyeButton>
            </S.PasswordWrap>
            {showError.password.error && (
              <S.ErrorMessage>{showError.password.message}</S.ErrorMessage>
            )}
          </S.FormField>
          <S.SubmitButton text='로그인' />
        </S.Form>
        <S.SnsWrap>
          <S.SnsTitle>소셜 로그인</S.SnsTitle>
          <S.SnsList>
            <li>
              <Link href='https://www.google.com/' target='_blank'>
                <Image
                  src={GoggleIcon}
                  alt='구글 로그인'
                  width='42'
                  height='42'
                />
              </Link>
            </li>
            <li>
              <Link href='https://www.kakaocorp.com/page/' target='_blank'>
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
