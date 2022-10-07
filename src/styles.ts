import styled from "styled-components"

interface DragPreviewProps {
  isPreview?: boolean
}

export const AppContainer = styled.div`
align-items: flex-start;
background-color: white;
display: flex;
flex-direction: row;
min-height:700px;
// height: 100%;
padding: 20px;
width: 100%;
`;
export const DragPrev = styled.div<DragPreviewProps>`
transform:${props => (props.isPreview ? "rotate(10deg" : undefined)}
`
export const ColumnContainer = styled(DragPrev)`
background-color: #ebecf0;
width: 300px;
min-height: 40px;
margin-right: 20px;
border-radius: 5px;
padding: 10px;
flex-grow: 0;
`;

export const FormContainer = styled.div`
max-width: 300px;
display: flex;
flex-direction: column;
width: 100%;
align-items: flex-start;
`
export const DragLayer = styled.div`
height:100%;
left:0;
pointer-events:none;
position:fixed;
top:0;
width:100%
z-index:100;
`

