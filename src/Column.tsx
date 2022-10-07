import React, { useRef } from 'react';
import { useDrop } from "react-dnd"
import { AddNewItem } from './AddNewItem';
import { ColumnContainer} from './styles';
import { useAppState } from "./AppStateContext"
import { CardFunc } from './CardFunc';
import { useItemDrag } from './useItemDrag'
import { DragItem } from './DragItem';
interface ColumnProps {
  text: string,
  index: number,
  id: string,
  isPreview?: boolean,
  desc:string
}

export const Column = ({
  text,
  desc,
  index,
  id,
  isPreview,
}: ColumnProps) => {
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: DragItem) {
      const dragIndex: number = item.index;
      const hoverIndex: number = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } })
      item.index = hoverIndex;
    }
  })

  drag(drop(ref)); 
  return (
    <>
      <ColumnContainer isPreview={isPreview} ref={ref}>
        <p>{text}</p>
        {state.lists[index].tasks.map((task, i) => (
          <CardFunc desc={task.desc} text={task.text} key={task.id} taskId={task.id} index={i} columnId={id} id={id} />
        ))}
        <AddNewItem
          toggleButtonText="➕New Task"
          onAdd={(text,desc) => dispatch({
            type: "ADD_TASK",
            payload: { 
              text,
              taskId: id,
              desc
            }})
          }
          dark
        />
      </ColumnContainer>
    </>
  )
}