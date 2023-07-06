import React, {useEffect,useState} from 'react'
import cat1 from '../assets/cat1.gif'
import cat2 from '../assets/cat2.gif';
import cat3 from '../assets/cat3.webp';
import cat4 from '../assets/cat4.webp';
import cat5 from '../assets/cat5.webp';
import loading from '../assets/loading.gif';
import { Draggable } from 'react-beautiful-dnd';


const card = ({title,position,index}) => {
  const images = [cat1,cat2,cat3,cat4,cat5];
  const [isload,setIsload] = useState(true);
  useEffect(()=>{
    const timerid = setTimeout(()=>{
      setIsload(false);
    },1300);

    return ()=>{
      clearTimeout(timerid);
    }
  },[])
  return (
    <Draggable
    draggableId={`position${position}`}
    index={index}
    >
    {(provided)=>(
      <div 
      className='card' 
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      >
        <h2>{''+position+'-'+title}</h2>
        <img src={isload?loading:images[position]} alt='cat' height={190} width={320}/>
      </div>
    )}
    
    </Draggable>
  )
}

export default card
