import { Suspense } from "react";
import ResetPasswordPage from "../../_components/reset-password/ResetPassword";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
