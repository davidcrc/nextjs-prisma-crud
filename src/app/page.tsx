import { NoteForm } from "../components";

async function loadNotes() {
  const res = await fetch("http://localhost:3000/api/notes");
  const data = await res.json();

  return data;
}

export default async function Home() {
  const notes = await loadNotes();
  console.log("dd", notes);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <NoteForm />

        <div className="flex flex-col py-2 gap-2">
          {notes?.map((note, index) => {
            return (
              <div key={note.id} className="bg-slate-400 p-4">
                {note.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
