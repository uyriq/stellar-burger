import  { useState } from 'react';

export default function useModal() {
  const [isShow, setShow] = useState(false);

  function toggle() {
    setShow(!isShow);
  }
  return {
    isShow,
    toggle
  }
};