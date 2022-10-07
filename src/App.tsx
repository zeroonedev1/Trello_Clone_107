// import React, { useState } from 'react';
import React from 'react';
import './App.css';
import { AppContainer } from './styles'
import { Column } from './Column';
import { AddNewItem } from "./AddNewItem"
import { useAppState } from './AppStateContext'
import { CustomDragLayer } from './CustomDragLayer'
function App() {

  const { state, dispatch } = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
      { state.lists.map((list, i) => (
        <Column desc={list.desc} text={list.text} key={list.id} id={list.id} index={i} />
      ))}
      <AddNewItem toggleButtonText="➕Add List"
        onAdd={text => dispatch({ type: "ADD_LIST", payload: text })}
         />
    </AppContainer >
  );
}

export default App;
