"use client";

import { NoteCard, NoteForm } from "@/components";
import { useNotesContext } from "@/context/NoteContext";
import { useEffect } from "react";

export default function Home() {
  const { notes, loadNotes } = useNotesContext();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <NoteForm />

        <div className="flex flex-col py-2 gap-2">
          {notes?.map((note) => {
            return <NoteCard key={note.id} note={note} />;
          })}
        </div>
      </div>
    </div>
  );
}
