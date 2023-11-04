import React from 'react';

import { Container  } from '@mui/material';
import TasksCard from './widgets/TasksCard';




const ItineraireCamion = ({itineraireList, onCancel}) => {

  return (
    <>
    <Container maxWidth="xl">
        <TasksCard itineraireList={itineraireList} onCancel={onCancel} />
    </Container>

    </>
  );
};

export default ItineraireCamion;