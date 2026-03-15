import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useIsAdmin } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export function AdminLoginPage() {
  const { login, isLoggingIn, isLoginError, isInitializing, identity } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isAdmin, navigate]);

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 green-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold">Admin Access</h1>
          <p className="text-muted-foreground mt-2">
            Connect with Internet Identity to access the dashboard.
          </p>
        </div>

        <Card className="border-0 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="font-display">Secure Login</CardTitle>
            <CardDescription>
              Only authorized administrators can access this panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {isInitializing || checkingAdmin ? (
              <div
                data-ocid="admin.loading_state"
                className="flex items-center justify-center py-8"
              >
                <Loader2 className="w-6 h-6 animate-spin text-forest" />
                <span className="ml-2 text-muted-foreground">
                  Checking authentication...
                </span>
              </div>
            ) : identity && !isAdmin ? (
              <div
                data-ocid="admin.error_state"
                className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive"
              >
                Your account does not have administrator privileges.
              </div>
            ) : (
              <>
                <Button
                  onClick={() => login()}
                  disabled={isLoggingIn}
                  data-ocid="admin.login.button"
                  size="lg"
                  className="w-full green-gradient text-white border-0 hover:opacity-90 font-semibold"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Login with Internet Identity"
                  )}
                </Button>

                {isLoginError && (
                  <p
                    data-ocid="admin.login.error_state"
                    className="text-sm text-destructive text-center"
                  >
                    Authentication failed. Please try again.
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
