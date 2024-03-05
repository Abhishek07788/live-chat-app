import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const MiddlewareRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  if (!currentUser.userName) {
    router.push("/");
    return null;
  }
  return children;
};

export default MiddlewareRoute;
