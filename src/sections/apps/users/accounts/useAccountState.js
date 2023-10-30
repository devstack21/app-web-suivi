// useAccountState.js
import { useState } from 'react';

const useAccountState = () => {
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userDeleteId, setUserDeleteId] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const handleAdd = () => {
    setAdd(!add);
    if (user && !add) setUser(null);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return { add, setAdd, open, setOpen, user, setUser, userDeleteId, setUserDeleteId, currentPage, setCurrentPage, handleAdd, handleClose };
};

export default useAccountState;
