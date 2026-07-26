import { Suspense } from "react";
import { AuthClient } from "./AuthClient";

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div style={{
          minHeight: "100dvh",
          backgroundColor: "var(--color-canvas-dark)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div className="skeleton" style={{ width: 440, height: 500, borderRadius: "var(--rounded-lg)" }} />
        </div>
      }
    >
      <AuthClient />
    </Suspense>
  );
}
