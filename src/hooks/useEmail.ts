import { useEffect, useMemo, useState } from "react";

type UseEmail = [string, (email: string) => void, boolean];
const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useEmail = (): UseEmail => {
  const [email, setEmail] = useState<string>("");
  const isEmailValid: boolean = useMemo((): boolean => {
    return EMAIL_REGEX.test(email);
  }, [email]);


  return [email, setEmail, isEmailValid];
};

export default useEmail;