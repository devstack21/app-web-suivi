import React, { useState } from 'react';
import moment from 'moment';
import { CloseOutlined } from '@ant-design/icons'
import { Grid, TextField, Button, Box } from '@mui/material';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { FormattedMessage } from 'react-intl';
import MainCard from 'components/MainCard';


export default function RapportFrom ({handleSubmitRapport, handleClose, pdf, isLoading, error}) {

    const lastWeek = moment().subtract(1, 'weeks');
    const [startDate, setStartDate] = useState(lastWeek.startOf('week').format("YYYY-MM-DD HH:mm:ss"));
    const [endDate, setEndDate] = useState(lastWeek.endOf('week').format("YYYY-MM-DD HH:mm:ss"));

    if (isLoading) {
        return (
          <EmptyUserCard title={<FormattedMessage id='loading' />} />
        )
      }
    
      if (error) {
        return (
          <EmptyUserCard title={<FormattedMessage id={error} />} />
        )
      }

    return(
        
        <MainCard
            title={<><FormattedMessage id='alerte-formRap-titre' /></>}
            content={false}
            secondary={
                <>
                <Box sx={{ position: 'relative', height: '50px', width: '100%' }}>
                    <Button color="primary" onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <CloseOutlined />
                    </Button>
                </Box>
                <Grid container spacing={3} alignItems="center">
                <Grid item>
                    <TextField
                    label={<FormattedMessage id='detailrapport-dateDebut' />}
                    type="date"
                    defaultValue={moment(startDate).format('YYYY-MM-DD')}
                    onChange={(e) => {
                        const date = moment(e.target.value);
                        const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
                        setStartDate(formattedDate);
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                    label={<FormattedMessage id='detailrapport-dateFin' />}
                    type="date"
                    defaultValue={moment(endDate).format('YYYY-MM-DD')}
                    onChange={(e) => {
                        const date = moment(e.target.value);
                        const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
                        setEndDate(formattedDate);
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </Grid>
                <Grid item>
                    {pdf && (
                    <a href={URL.createObjectURL(pdf)} download="monFichier.pdf">
                        Télécharger le PDF
                    </a>
                    )}
                    <Button variant="contained" color="primary" onClick={()=>handleSubmitRapport(startDate, endDate)}>
                    <FormattedMessage id='detailrapport-valider' />
                    </Button>
                </Grid>
                </Grid>
            </>
            }
            >

        </MainCard>
    )

}