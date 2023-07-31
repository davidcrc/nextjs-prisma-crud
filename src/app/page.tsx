"use client";

import { NoteCard, NoteForm } from "@/components";
import { useNotesContext } from "@/context/NoteContext";
import { useEffect } from "react";

export default function Home() {
  const { loading, notes, loadNotes } = useNotesContext();

  return (
    <div className="flex py-6 justify-center h-screen  ">
      <div className="flex flex-col h-full  w-full max-w-lg">
        <NoteForm />

        {
          <div className="text-base text-white">
            Notes:{" "}
            <span className="text-sm italic">
              {loading ? "loading... " : ""}
            </span>
          </div>
        }
        <div className="flex flex-col py-2 gap-2 overflow-y-auto">
          {notes?.map((note) => {
            return <NoteCard key={note.id} note={note} />;
          })}
        </div>
      </div>
    </div>
  );
}
