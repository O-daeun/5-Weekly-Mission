import Button from '@/components/Button/Button';
import Link from 'next/link';
import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding-top: 238px;
  padding-bottom: 20px;
  background: var(--Linkbrary-bg);
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 464px;
  padding: 0 32px;
`;

export const LogoLink = styled(Link)`
  width: fit-content;
  margin: 0 auto;
`;

export const TextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

export const Text = styled.p`
  font-size: 16px;
  line-height: 150%;
`;

export const SignLink = styled(Link)`
  border-bottom: 1px solid var(--Linkbrary-primary);
  font-weight: 600;
  font-size: 16px;
  color: var(--Linkbrary-primary);
`;

export const Form = styled.form`
  width: 100%;
  margin-top: 30px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  &:nth-child(1) {
    margin-top: 0;
  }
`;

export const PasswordWrap = styled.div`
  position: relative;
`;

export const Label = styled.label`
  margin-bottom: 12px;
  font-size: 14px;
`;

export const Input = styled.input<{ $iserror: string }>`
  width: 100%;
  padding: 18px 15px;
  border: ${({ $iserror: iserror }) =>
    iserror === 'true'
      ? '1px solid var(--Linkbrary-red)'
      : '1px solid var(--Linkbrary-gray20)'};
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #373740;

  &::placeholder {
    color: var(--Linkbrary-gray20);
  }

  &:focus {
    border: 1px solid var(--Linkbrary-primary);
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 6px;
  color: var(--Linkbrary-red);
`;

export const EyeButton = styled.button`
  position: absolute;
  top: 22px;
  right: 22px;
  width: 16px;
  height: 16px;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 30px;
`;

export const SnsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 32px;
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid var(--Linkbrary-gray20);
  background: var(--Linkbrary-gray10);
`;

export const SnsTitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: #373740;
`;

export const SnsList = styled.ul`
  display: flex;
  gap: 16px;
`;
