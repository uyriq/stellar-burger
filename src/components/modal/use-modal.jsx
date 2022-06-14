import  { useState } from 'react';

export default function useModal() {
  const [isShow, setShow] = useState(false);

  const toggle = (e) => {
    setShow(!isShow);
    console.dir(`${isShow} was clicked  ${console.dir(Object(e.target))}  `)
  }
  return {
    isShow,
    toggle
  }
};