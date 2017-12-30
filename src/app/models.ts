export interface Option {
  id?: string;
  text: string;
}

export interface Question {
  id?: string;
  text: string;
  answers?: Option[]
}