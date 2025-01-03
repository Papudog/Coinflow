import { useEffect, useState } from "react";

type UsePassword = [string, (password: string) => void, boolean];

const usePassword = (): UsePassword => {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);


  useEffect((): void => {
    setIsPasswordValid(password.length >= 8 ? true : false);
  }, [password]);

  return [password, setPassword, isPasswordValid];
}

export default usePassword;