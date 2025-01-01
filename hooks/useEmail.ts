import { useEffect, useState } from "react";

type UseEmail = [string, (email: string) => void, boolean];
const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useEmail = (): UseEmail => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect((): void => {
    setIsEmailValid(EMAIL_REGEX.test(email) ? true : false);
  }, [email])

  return [email, setEmail, isEmailValid];
};

export default useEmail;