"use client";

import { createContext, useContext, useState } from "react";
import { Note } from "@/interfaces/hookforms.interfaces";

interface NotesProviderProps {
  children: React.ReactNode;
}

const NoteContext = createContext<{
  notes: any[];
  loadNotes: () => Promise<void>;
  createNote: (note: Note) => void;
}>({ notes: [], loadNotes: async () => {}, createNote: () => {} });

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<Note[]>([]);

  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();

    setNotes(data);
  }

  async function createNote(note: Note) {
    const { title, content } = note;

    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newNote = await res.json();

    setNotes((notes) => [newNote, ...notes]);
  }

  return (
    <NoteContext.Provider value={{ notes, loadNotes, createNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NoteContext);

  if (context === null) {
    throw new Error("Notes context was used outside of a provider");
  }

  return context;
};
