import React from "react";
import { NoteItem } from "@/interfaces/hookforms.interfaces";
import { useNotesContext } from "@/context/NoteContext";
import { formatDate } from "@/utils/formatDate";
import { HiTrash, HiPencil } from "react-icons/hi";

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
        <h1 className="text-lg font-bold">{note.title}</h1>
        <p>{note.content}</p>
        <p>{formatDate(note.createdAt)}</p>
      </div>
      <div className="flex gap-x-2 items-center ">
        <div
          className="hover:bg-slate-500 rounded-md p-1 cursor-pointer"
          onClick={handleClickDelete}
        >
          <HiTrash className="text-2xl text-red-600 " />
        </div>

        <div
          className="hover:bg-slate-500 rounded-md p-1 cursor-pointer"
          onClick={handleClickEdit}
        >
          <HiPencil className="text-2xl " />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
