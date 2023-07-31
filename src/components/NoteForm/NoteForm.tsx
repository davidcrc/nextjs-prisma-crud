"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useNotesContext } from "@/context/NoteContext";

const NoteForm = () => {
  const { createNote, setSelectedNote, selectedNote, updateNote } =
    useNotesContext();

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onClearEdit = () => {
    setSelectedNote?.(undefined);
    reset({
      title: "",
      content: "",
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    setFocus("title");

    if (selectedNote) {
      await updateNote?.(selectedNote.id, data);
      onClearEdit();
    } else {
      await createNote(data);
      reset();
    }
  });

  React.useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  React.useEffect(() => {
    if (selectedNote) {
      setFocus("title");

      reset({
        title: selectedNote.title,
        content: selectedNote.content,
      });
    }
  }, [reset, selectedNote, setFocus]);

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

      <div className="flex justify-end gap-2">
        <button
          className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          type="submit"
        >
          Send
        </button>

        {selectedNote && (
          <button
            className="px-5 py-2 text-white bg-slate-400 rounded-md hover:bg-slate-500"
            type="button"
            onClick={onClearEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
