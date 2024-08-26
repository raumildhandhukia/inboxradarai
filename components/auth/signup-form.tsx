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
import { RegisterSchema } from "@/schemas";
import { BeatLoader } from "react-spinners";

const TheForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<String>("");
  const [success, setSuccess] = useState<String>("");

  const onSubmit = (values: any) => {
    startTransition(async () => {
      const prom = new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      await prom;
    });
  };
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your Email" {...field} />
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
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-center items-center">
            {isPending && <BeatLoader color="rgba(255, 255, 255, 0.125)" />}
            <Button variant="destructive" className="mt-5 w-full" type="submit">
              Register
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

const SignUpForm = () => {
  return (
    <div>
      <Card>
        <TheForm />
      </Card>
    </div>
  );
};

export default SignUpForm;
