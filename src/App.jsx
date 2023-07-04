import './App.css'
import data from './assets/data.json'
import Card from './components/Card'
import { useCallback, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function App() {
  const [cardArray,setCardArray] = useState(data);
  const onDragEnd = useCallback((result) => {
    const {destination,source} = result;

    if(!destination) return;
    if(destination.index===source.index) return;

    const modifiedCardArray = [...cardArray];
    const draggedObjCard = cardArray[source.index];
    console.log(draggedObjCard);
    modifiedCardArray.splice(source.index,1);
    console.log('before',modifiedCardArray);
    modifiedCardArray.splice(destination.index,0,draggedObjCard);
    console.log('after',modifiedCardArray);
    setCardArray(modifiedCardArray);
  }, []);

  return (
  <div>
    <h1 className='heading'>NetixAI task - by SourabhSRK</h1>
    <DragDropContext 
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId='container'>
        {(provided)=>(
          <div 
          className='card-container'
          ref={provided.innerRef}
          {...provided.droppableProps}
          >
          {cardArray.map((d,i)=>{
            return (
              <Card
              key={d.position}
              index={i} 
              title={d.title} 
              position={d.position}
              />
            )
          })}
          {provided.placeholder}
          </div>
        )} 
      </Droppable>
    </DragDropContext>
  </div>
        
  )
}

export default App
