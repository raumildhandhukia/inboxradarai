"use client";
import React, { useState, useTransition } from "react";
import Card from "@/components/auth/card";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { BeatLoader } from "react-spinners";

const TheForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<String>("");
  const [success, setSuccess] = useState<String>("");
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    startTransition(async () => {
      const prom = new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      await prom;
    });
  };

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="gap-y-4 flex flex-col">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your Email"
                    type="email"
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="123456"
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center items-center">
            {isPending && <BeatLoader color="rgba(255, 255, 255, 0.125)" />}
            <Button variant="secondary" className="mt-5 w-full" type="submit">
              Login
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

const LoginForm = () => {
  return (
    <Card
      headerLabel="Login"
      backToLabel="Dont have an account?"
      backToHref="/auth/signup"
    >
      <TheForm />
    </Card>
  );
};

export default LoginForm;
