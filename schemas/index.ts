import * as z from "zod";

// If ever development for Credential Login/Register will be executed.

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const TagSchema = z.object({
  label: z
    .string()
    .min(3, {
      message: "Name should be minimum 3 characters",
    })
    .max(20, {
      message: "Name should not exceed 20 characters",
    }),
  description: z
    .string()
    .min(20, {
      message: "Description should be minimum 20 characters",
    })
    .max(120, {
      message: "Description should not exceed 120 characters",
    }),
});
