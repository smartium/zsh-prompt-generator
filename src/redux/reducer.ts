import { Color, IPromptItem, PromptID } from '../types';
import { createSlice, PayloadAction } from 'redux-starter-kit';
import uuid from 'uuid/v4';

export interface State {
  prompt: Required<IPromptItem>[];
  rprompt: Required<IPromptItem>[];
  selectedPrompt: 'prompt' | 'rprompt';
}

const initialState: State = {
  prompt: [],
  rprompt: [],
  selectedPrompt: 'prompt',
};

const promptReducer = createSlice({
  initialState,
  reducers: {
    initialize: () => initialState,
    selectPrompt: (state: State, { payload }: PayloadAction<'prompt' | 'rprompt'>) => {
      Object.assign(state, { selectedPrompt: payload });
    },
    selectPromptItem: (state: State, { payload }: PayloadAction<PromptID>) => {
      const id = payload;
      Object.assign(state, {
        prompt: state.prompt.map(p => Object.assign(p, { selected: p.id === id })),
      });
      Object.assign(state, {
        rprompt: state.rprompt.map(p => Object.assign(p, { selected: p.id === id })),
      });
    },
    addPromptItem: (
      state: State,
      { payload }: PayloadAction<{ displayStr: string; shStr: string; promptStr: string }>
    ) => {
      state[state.selectedPrompt].push({
        id: uuid(),
        fgColor: null,
        bgColor: null,
        bold: false,
        selected: false,
        ...payload,
      });
    },
    movePromptItem: (
      state: State,
      { payload: { srcIdx, dstIdx } }: PayloadAction<{ srcIdx: number; dstIdx: number }>
    ) => {
      const moved = state[state.selectedPrompt].splice(srcIdx, 1);
      state[state.selectedPrompt].splice(dstIdx, 0, ...moved);
    },
    deletePromptItem: (state: State, { payload }: PayloadAction<PromptID>) => {
      Object.assign(state, { prompt: state.prompt.filter(p => p.id !== payload) });
      Object.assign(state, { rprompt: state.rprompt.filter(p => p.id !== payload) });
    },
    changeFgColor: (state: State, { payload }: PayloadAction<Color | number>) => {
      const promptItem = [...state.prompt, ...state.rprompt].find(p => p.selected);
      if (!!promptItem) {
        Object.assign(promptItem, { fgColor: payload });
      }
    },
    changeBgColor: (state: State, { payload }: PayloadAction<Color | number>) => {
      const promptItem = [...state.prompt, ...state.rprompt].find(p => p.selected);
      if (!!promptItem) {
        Object.assign(promptItem, { bgColor: payload });
      }
    },
    toggleBold: (state: State) => {
      const promptItem = [...state.prompt, ...state.rprompt].find(p => p.selected);
      if (!!promptItem) {
        Object.assign(promptItem, { bold: !promptItem.bold });
      }
    },
  },
});

export const {
  reducer,
  actions: {
    initialize,
    selectPrompt,
    selectPromptItem,
    addPromptItem,
    movePromptItem,
    deletePromptItem,
    changeFgColor,
    changeBgColor,
    toggleBold,
  },
} = promptReducer;
