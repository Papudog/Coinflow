import { Router, useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router: Router = useRouter();

  useEffect((): void => {
    setTimeout((): void => {
      router.replace("/login"), [router];
    }, 0);
  }, [router]);

  return null;
}
