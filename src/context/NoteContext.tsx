"use client";

import { createContext, useContext, useState } from "react";
import { Note, NoteItem } from "@/interfaces/hookforms.interfaces";

interface NotesProviderProps {
  children: React.ReactNode;
}

const NoteContext = createContext<{
  notes: NoteItem[];
  loadNotes: () => Promise<void>;
  createNote: (note: Note) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  selectedNote?: NoteItem;
  setSelectedNote?: (note?: NoteItem) => void;
  updateNote?: (id: number, note: Note) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async () => {},
  deleteNote: async () => {},
});

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteItem>();

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

  async function deleteNote(id: number) {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });

    const deletedNote = await res.json();

    setNotes(notes.filter((note) => note.id !== deletedNote.id));
  }

  async function updateNote(id: number, note: Note) {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedNote = await res.json();

    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        loadNotes,
        createNote,
        deleteNote,
        selectedNote,
        setSelectedNote,
        updateNote,
      }}
    >
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
