export type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

export interface IPromptItem {
  label: string;
  shRepr: string;
  fgColor: Color | number | null;
  bgColor: Color | number | null;
  bold?: boolean;
}
