import React, { useRef } from 'react';

import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import TransportItinary from '../../../sections/apps/itineraire/TransportItinary';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { SpinnLoader } from 'components/cards/SpinnLoader';
import { CloseOutlined, PrinterFilled } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import { useTheme } from '@emotion/react';
import { format } from 'date-fns';

// const intl = useIntl();

const TitleCard = ({ transport, debut, fin }) => (
  
  <>
    <Typography>
      <FormattedMessage id='itineraire' />{' '}{useIntl().locale=='fr'? transport.type_transport?.nom: transport.type_transport?.nom_en}{' '}{transport.matricule}
    </Typography>
    <Typography>
      <FormattedMessage id='from' />{' '}{transport.provenance}{' '}
      <FormattedMessage id='to' />{' '}{transport.destination}
    </Typography>
    <Typography>
      {(format(new Date(debut), 'dd/MM/yyyy'))}{' - '}{(format(new Date(fin), 'dd/MM/yyyy'))}
    </Typography>
  </>
)

const CardSecondary = ({ onCancel, componentRef, theme }) => (
  <Grid flexDirection='row'>
    <Stack direction="row" justifyContent="flex-end">

      <ReactToPrint
        trigger={() => (
          <IconButton>
            <PrinterFilled style={{ color: theme.palette.grey[900] }} />
          </IconButton>
        )}
        content={() => componentRef.current}
      />
    </Stack>
    <Button color="primary" onClick={() => onCancel()}>
      <CloseOutlined />
    </Button>
  </Grid>
)


const TransportDetail = ({ onCancel, transport, debut, fin }) => {

  const { status } = useSelector((state) => state.transport.detail);

  const componentRef = useRef(null);
  const theme = useTheme()

  return (
      <Box id="print" ref={componentRef} padding={2}>
        <MainCard
          title={<TitleCard transport={transport} debut={debut} fin={fin} />}
          content={false}
          secondary={<CardSecondary onCancel={onCancel} componentRef={componentRef} theme={theme} />}>
          {status == REQUEST_STATUS.succeed && <TransportItinary />}
          {status == REQUEST_STATUS.loading && <SpinnLoader title='loading' />}
          {status == REQUEST_STATUS.error && <SpinnLoader title='error-network' />}
        </MainCard>
      </Box>

  );
};

export default TransportDetail;