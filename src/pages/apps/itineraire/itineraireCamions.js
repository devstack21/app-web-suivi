import React from 'react';

import { Container  } from '@mui/material';
import TasksCard from './widgets/TasksCard';




const ItineraireCamion = ({itineraireList, onCancel, startDate, endDate, matriculeCamion}) => {

  return (
    <>
    <Container maxWidth="xl">
        <TasksCard itineraireList={itineraireList} onCancel={onCancel} startDate={startDate} endDate={endDate} matriculeCamion={matriculeCamion} />
    </Container>

    </>
  );
};

export default ItineraireCamion;