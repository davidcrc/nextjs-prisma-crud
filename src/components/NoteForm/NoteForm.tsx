"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useNotesContext } from "@/context/NoteContext";

const NoteForm = () => {
  const { createNote } = useNotesContext();

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    createNote(data);
    setFocus("title");
    reset();
  });

  React.useEffect(() => {
    setFocus("title");
  }, [setFocus]);

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
