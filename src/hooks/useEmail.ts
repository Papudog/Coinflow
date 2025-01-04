import { useEffect, useState } from "react";

type UseEmail = [string, (email: string) => void, boolean];
const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useEmail = (): UseEmail => {
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  useEffect((): void => {
    setIsEmailValid(EMAIL_REGEX.test(email) ? true : false);
  }, [email])

  return [email, setEmail, isEmailValid];
};

export default useEmail;