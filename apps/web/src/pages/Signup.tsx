import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { authSchema } from "@/lib/schemas";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { signup, isLoading } = useAuth();

  const validateForm = () => {
    const result = authSchema.safeParse({ email, password });

    if (!result.success) {
      const formattedErrors = { email: "", password: "" };
      result.error.errors.forEach((error) => {
        const path = error.path[0] as "email" | "password";
        formattedErrors[path] = error.message;
      });
      setErrors(formattedErrors);
      return false;
    }

    setErrors({ email: "", password: "" });
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    signup({ email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <Card className="w-full max-w-sm p-6">
        <CardTitle className="text-center text-2xl mb-6">Sign Up</CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) validateForm();
                }}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) validateForm();
                }}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default Signup;
