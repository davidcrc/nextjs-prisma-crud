export interface Note {
  title: string;
  content?: string;
}

export type NoteItem = Note & {
  id: number;
};
