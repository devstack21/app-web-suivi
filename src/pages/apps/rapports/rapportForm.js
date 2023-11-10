import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons'
import { Grid, Button, Box } from '@mui/material';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { FormattedMessage } from 'react-intl';
import MainCard from 'components/MainCard';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { formatDateToYYYYMMDD, getStartOfWeek } from 'utils/function';
import DateSelector from 'components/cards/date/DateSelector';
import { useDispatch, useSelector } from 'react-redux';
import { getRapportPDF } from 'store/reducers/rapports/rapportPdfSlice';
import { SpinnLoader } from 'components/cards/SpinnLoader';


export default function RapportFrom({ handleClose }) {

    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(formatDateToYYYYMMDD(getStartOfWeek()));
    const [endDate, setEndDate] = useState(formatDateToYYYYMMDD(new Date()));

    const { pdf, status, error } = useSelector((state) => state.rapport.pdf);



    const handleSubmit = () => {
        dispatch(getRapportPDF({ start: startDate, end: endDate }));
    }


    return (

        <MainCard
            title={<><FormattedMessage id='alerte-formRap-titre' /></>}
            content={false}
            secondary={
                <Box sx={{ position: 'relative', height: '50px', width: '100%' }}>
                    <Button color="primary" onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <CloseOutlined />
                    </Button>
                </Box>
            }

        >

            <Grid container spacing={3} alignItems="center">
            <DateSelector startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                <Grid item>
                    {pdf && (
                        <a href={URL.createObjectURL(pdf)} download="monFichier.pdf">
                            Télécharger le PDF
                        </a>
                    )}
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        <FormattedMessage id='detailrapport-valider' />
                    </Button>
                </Grid>
            </Grid>

            {status == REQUEST_STATUS.loading && <SpinnLoader title={'loading'} />}

            {status == REQUEST_STATUS.error && <EmptyUserCard title={<FormattedMessage id={error} />} />}



        </MainCard>
    )

}