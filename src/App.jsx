import './App.css'
import data from './assets/data.json'
import Card from './components/Card'
import { useCallback, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Modal from './components/Modal';

function App() {
  const [cardArray1,setCardArray1] = useState(data.slice(0,3));
  const [cardArray2,setCardArray2] = useState(data.slice(3,5));
  const [showModal,setShowModal] = useState(false);
  const [modalTitle,setModalTitle] = useState('');
  const [modalPosition,setModalPosition] = useState(0);

  const onDragEnd = (result) => {
    const {destination,source} = result;

    if(!destination) return;
    if(source.droppableId==='container1' && source.droppableId === destination.droppableId){
      const modifiedCardArray = [...cardArray1];
      const [draggedObjCard] = modifiedCardArray.splice(source.index,1);
      modifiedCardArray.splice(destination.index,0,draggedObjCard);
      setCardArray1(modifiedCardArray);
    }
    else if(source.droppableId==='container2' && source.droppableId === destination.droppableId){
      const modifiedCardArray = [...cardArray2];
      const [draggedObjCard] = modifiedCardArray.splice(source.index,1);
      modifiedCardArray.splice(destination.index,0,draggedObjCard);
      setCardArray2(modifiedCardArray);
    }
    else{
      if(source.droppableId==='container1'){
        const sourceObjCard = cardArray1[source.index];
        const destinationObjCard = cardArray2[destination.index];

        const modarray1 = [...cardArray1];
        modarray1.splice(source.index,1);
        const modarray2 = [...cardArray2];
        modarray2.splice(destination.index,1);
        modarray1.splice(source.index,0,destinationObjCard);
        modarray2.splice(destination.index,0,sourceObjCard);

        setCardArray1(modarray1);
        setCardArray2(modarray2);
      }
      else if(source.droppableId==='container2'){
        const sourceObjCard = cardArray2[source.index];
        const destinationObjCard = cardArray1[destination.index];

        const modarray1 = [...cardArray1];
        const modarray2 = [...cardArray2];
        modarray2.splice(source.index,1);
        modarray1.splice(destination.index,1);

        modarray2.splice(source.index,0,destinationObjCard);
        modarray1.splice(destination.index,0,sourceObjCard);

        setCardArray1(modarray1);
        setCardArray2(modarray2);
      }
    }
  };

  const handleClickOnCard = (title,position) => {
    setModalPosition(position);
    setModalTitle(title);
    console.log(title,position);
    setShowModal(true);
  }

  return (
  <div>
    <h1 className='heading'>NetixAI task - by SourabhSRK</h1>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='container1' direction='horizontal'>
        {(provided)=>(
          <div 
          className='card-container'
          ref={provided.innerRef}
          {...provided.droppableProps}
          >
          {cardArray1.map((d,i)=>{
            return (
              <Card
              key={d.position}
              index={i} 
              title={d.title} 
              position={d.position}
              handleClickOnCard={handleClickOnCard}
              />
            )
          })}
          {provided.placeholder}
          </div>
        )} 
      </Droppable>

      <Droppable droppableId='container2' direction='horizontal'>
        {(provided)=>(
          <div 
          className='card-container'
          ref={provided.innerRef}
          {...provided.droppableProps}
          >
          {cardArray2.map((d,i)=>{
            return (
              <Card
              key={d.position}
              index={i} 
              title={d.title} 
              position={d.position}
              handleClickOnCard={handleClickOnCard}
              />
            )
          })}
          {provided.placeholder}
          </div>
        )} 
      </Droppable>
    </DragDropContext>

    {/* Modal Code */}
    {showModal && <Modal title={modalTitle} position={modalPosition} setShowModal={setShowModal}/>}
  </div>
        
  )
}

export default App
