import React, {useEffect} from 'react'
import cat1 from '../assets/cat1.gif'
import cat2 from '../assets/cat2.gif';
import cat3 from '../assets/cat3.webp';
import cat4 from '../assets/cat4.webp';
import cat5 from '../assets/cat5.webp';

const Modal = ({title,position,setShowModal}) => {
  const images = [cat1,cat2,cat3,cat4,cat5];

  useEffect(()=>{
    const handleEvent = (e) => {
        if(e.key==='Escape'){
            setShowModal(false);
        }
    }
    document.addEventListener('keydown',handleEvent);
  },[]);

  return (
    <div className='modalWrapper'>
      <div className='modal'>
        <h2>{''+position+'-'+title}</h2>
        <img src={images[position]} alt='cat' height={250} width={400} />
      </div>
    </div>
  )
}

export default Modal
