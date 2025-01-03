"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import axios from "axios";
import { convertAmount } from "@/lib/utils";
import { useEffect, useState } from "react";

const formSchema = z.object({
  address: z.string(),
  block: z.string(),
});

type TForm = z.infer<typeof formSchema>;

const AccountBalanceForm = () => {

 

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset({ address: "", block: "" });
  }, []);

  const router = useRouter();

  const { data, mutate } = useMutation({
    mutationKey: ["getAccountBalance"],
    mutationFn: async ({ address }: { address: string }) => {
      const res = await axios.post("/api/getBalance", {
        address, 
      });
      console.log('ddaa is',res);
      return convertAmount(res.data.data);
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: TForm) => {
    
   console.log(values);
    mutate({
      address: values.address,
    });
  };

  return (
    <section className="flex-1">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-gray-500 w-max">
            Fetch Account Balance
          </CardTitle>

          {data && (
            <div className="flex gap-2 opacity-75">
              <p>Balance</p>
              <p className="font-bold ">{data}</p>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*<FormField
                control={control}
                name="block"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Block</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="latest">Latest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />*/}
              <div className="flex items-center gap-4 justify-end">
                <Button
                  onClick={() => {
                    form.reset({ address: "", block: "" });
                  }}
                  variant={"outline"}
                  type="button"
                >
                  Reset
                </Button>
                <Button type="submit">Fetch</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default AccountBalanceForm;
