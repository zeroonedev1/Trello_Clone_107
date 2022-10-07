import React, { useState } from 'react';
import { FormContainer } from './styles'
import { useFocus } from "./utils/useFocus";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface NewItemFormProps {
  onAdd(text: string, desc: string): void
}
export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");
  const inputReference = useFocus()
  return (
    <FormContainer>

      <TextField
        ref={inputReference}
        value={text}
        onChange={e => setText(e.target.value)}
        label="Task Title "
        variant="filled"
      />

      <TextField sx={{ mt: 2, mb: 2 }}
        ref={inputReference}
        value={desc}
        label="Task Description"
        onChange={f => setDesc(f.target.value)}
        color="secondary" />
      <Button variant="contained" onClick={() => onAdd(text, desc)}>✅ Create</Button>
    </FormContainer>
  )
}
