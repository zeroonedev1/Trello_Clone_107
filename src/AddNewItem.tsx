import React, { useState } from 'react';
import { NewItemForm } from './NewItemForm';
import Button from '@mui/material/Button';


interface AddNewItemProps {
  onAdd(text: string, desc:string): void
  toggleButtonText: string
  dark?: boolean
}

export const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText } = props;
  if (showForm) {
    return (
      <>
        <NewItemForm
          onAdd={(text,desc) => {
            onAdd(text, desc)
            setShowForm(false)
          }}
        />
      </>
    )
  }
  return <Button variant="contained" onClick={() => setShowForm(true)}>{toggleButtonText}</Button>
}