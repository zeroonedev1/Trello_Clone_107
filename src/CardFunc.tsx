import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from './AppStateContext';
import { CardDragItem } from './DragItem';
// import { CardContainer } from './styles'
import { useItemDrag } from './useItemDrag';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';


interface CardProps {
  text: string,
  index: number,
  id: string,
  columnId: string,
  desc:string,
  taskId:string
}

export const CardFunc = ({ text,desc, index, id,taskId ,columnId }: CardProps) => {
  const { dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "CARD", id, index, text,columnId });
  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }
      const targetColumn = columnId
   
      item.index = index;
      item.columnId = targetColumn;
    }
  })
  drag(drop(ref));    
  return <Card sx={{ mb: 4, p: 1 }} >
    {text}
    <p>{desc}</p>
    <CardActions >
      <Button size="small" onClick={() =>dispatch({
        type: "DELETE_TASK",
        payload:{
          taskId:taskId,
          columnId:columnId
        }
      })}>Delete</Button>
    </CardActions>
  </Card>
}