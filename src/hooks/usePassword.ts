import { useEffect, useMemo, useState } from "react";

type UsePassword = [string, (password: string) => void, boolean];

const usePassword = (): UsePassword => {
  const [password, setPassword] = useState("");
  const isPasswordValid: boolean = useMemo((): boolean => {
    return password.length >= 8
  }, [password]);

  return [password, setPassword, isPasswordValid];
}

export default usePassword;