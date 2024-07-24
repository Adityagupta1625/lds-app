"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { CreateUserFormInputs, signUpSchema, userRoles } from "@/lib/schema";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser } from "@/lib/helpers/createUser";

const CreateUserForm: React.FC = () => {
  const form = useForm<CreateUserFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      console.log(error);
      toast.error("Error Creating User");
    },
    onSuccess: (data) => {
      toast.success("User Created successfully");
    },
  });

  const onSubmit = (data: CreateUserFormInputs) => {
    mutation.mutate(data);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
        <CardDescription>Create a new user account</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input autoComplete="off" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
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
                      autoComplete="off"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Role</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select user role" />
                      </SelectTrigger>
                      <SelectContent>
                        {userRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => {
                form.reset({
                  email: "",
                  password: "",
                });
              }}
              variant="outline"
              type="reset"
            >
              Cancel
            </Button>
            <Button
              className="mt-0"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating User" : "Create User"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CreateUserForm;
