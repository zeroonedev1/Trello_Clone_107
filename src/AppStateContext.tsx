import * as uuid from 'uuid'
import React, { createContext, useReducer, useContext } from 'react';
import { findItemIndexById } from './utils/findItemIndexById'
import { moveItem } from './utils/moveItem'
import { DragItem } from './DragItem'
import _ from 'lodash';

interface Task {
  id: string
  text: string,
  desc: string
}

interface List {
  id: string
  text: string
  tasks: Task[]
  desc: string
}

export interface AppState {
  lists: List[],
  draggedItem: DragItem | undefined
}

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      desc: '',
      tasks: [{ id: "task1", text: "This is Task Title", desc: "This is some Description" }]
    },
    {
      id: "1",
      text: "In Progress",
      desc: '',
      tasks: [{ id: "task2", text: "Another Title", desc: "Default description" }]
    },
    {
      id: "2",
      text: "Complete",
      desc: '',
      tasks: [{ id: "task3", text: "Another Title", desc: " Task DEscription" }]
    }
  ],
  draggedItem: undefined
}
let storedStringData = localStorage.getItem('data')
let parsedStoredData = JSON.parse(storedStringData) || appData;
localStorage.setItem('data', JSON.stringify(parsedStoredData));

type Action =
  | {
    type: "ADD_LIST"
    payload: string
  }
  | {
    type: "ADD_TASK"
    payload: {
      text: string; taskId: string; desc: string
    }
  }
  |
  {
    type: "DELETE_TASK"
    payload: { taskId: string, columnId: string }
  }
  | {
    type: 'MOVE_LIST',
    payload: {
      dragIndex: number
      hoverIndex: number
    }
  } | {
    type: "SET_DRAGGED_ITEM"
    payload: DragItem | undefined
  } 

interface AppStateContextProps {
  state: AppState
  dispatch(action: Action): void
}

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_LIST': {
      let stringData = localStorage.getItem('data');
      let storedAppData = JSON.parse(stringData);
      storedAppData.lists.push({ id: uuid.v1(), text: action.payload, tasks: [], desc: action.payload })
      localStorage.setItem('data', JSON.stringify(storedAppData))
      return {
        ...state,
        lists: [
          ...state.lists, {
            id: uuid.v1(), text: action.payload, tasks: [], desc: action.payload
          }
        ]
      }
    }

    case 'ADD_TASK': {
      const targedtLaneIndex = findItemIndexById(state.lists, action.payload.taskId);

      let stringData = localStorage.getItem('data');
      let storedAppData = JSON.parse(stringData);
      storedAppData.lists[targedtLaneIndex].tasks.push({
        id: uuid.v1(),
        text: action.payload.text,
        desc: action.payload.desc
      })
      localStorage.setItem('data', JSON.stringify(storedAppData))

      state.lists[targedtLaneIndex].tasks.push({
        id: uuid.v1(),
        text: action.payload.text,
        desc: action.payload.desc
      });
      return {
        ...state
      }
    }

    case 'DELETE_TASK': {
      const targedtLaneIndex = findItemIndexById(state.lists, action.payload.columnId);
      let stringData = localStorage.getItem('data');
      let storedAppData = JSON.parse(stringData);
      const taskList = storedAppData.lists[targedtLaneIndex]['tasks'];
       _.remove(taskList, (n) => n.id === action.payload.taskId);
      // const removedItem = _.remove(taskList, (n) => n.id === action.payload.taskId);
      storedAppData.lists[targedtLaneIndex]['tasks'] = taskList;
      localStorage.setItem('data', JSON.stringify(storedAppData))
      state.lists[targedtLaneIndex]['tasks'] = taskList;
      return {
        ...state
      }
    }

    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload;
      state.lists = moveItem(state.lists, dragIndex, hoverIndex);
      return { ...state }
    }
    case 'SET_DRAGGED_ITEM': {
      return { ...state, draggedItem: action.payload }
    }
    default: {
      return state;
    }
  }
}


const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  let stringData = localStorage.getItem('data');
  let storedData = JSON.parse(stringData);
  const [state, dispatch] = useReducer(appStateReducer, storedData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}

