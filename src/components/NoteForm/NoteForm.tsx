"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const NoteForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { title, content } = data;

    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reset();
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        {...register("title")}
        type="text"
        placeholder="Title"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-blue-600 my-2"
        autoFocus
      />
      <textarea
        {...register("content")}
        placeholder="content"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-blue-600 my-2"
        autoFocus
      />

      <button className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Send
      </button>
    </form>
  );
};

export default NoteForm;
