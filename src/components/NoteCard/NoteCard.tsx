import React from "react";
import { NoteItem } from "@/interfaces/hookforms.interfaces";
import { useNotesContext } from "@/context/NoteContext";

const NoteCard = ({ note }: { note: NoteItem }) => {
  const { deleteNote, setSelectedNote } = useNotesContext();

  const handleClickDelete = async () => {
    if (confirm(`Are you sure you want to delete this note? - ${note.title}`)) {
      await deleteNote(note.id);
    }
  };

  const handleClickEdit = () => {
    //
    setSelectedNote?.(note);
  };

  return (
    <div key={note.id} className="bg-slate-400 p-4 my-2 flex justify-between">
      <div>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
      </div>
      <div className="flex gap-x-2">
        <button onClick={handleClickDelete}>Delete</button>
        <button onClick={handleClickEdit}>Edit</button>
      </div>
    </div>
  );
};

export default NoteCard;
