import React from 'react';

import { Container  } from '@mui/material';
import TasksCard from '../../../sections/apps/itineraire/TasksCard';




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