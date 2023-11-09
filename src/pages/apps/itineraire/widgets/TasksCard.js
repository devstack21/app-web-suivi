// import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { CardContent, Grid, Typography, Button } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
import { CarOutlined } from '@ant-design/icons'; //, ClockCircleFilled, BugFilled, MobileFilled, WarningFilled 
import { CloseOutlined } from '@ant-design/icons'
import { format } from 'date-fns';
import { FormattedMessage } from 'react-intl';


const TasksCard = ({itineraireList, onCancel, startDate, endDate, matriculeCamion}) => (
  // const titre = `Itinéraire du ${startDate} au ${endDate}`;
  <MainCard
    // title={<FormattedMessage id='itineraire-titre-matricule' />+ matriculeCamion+ <FormattedMessage id='itineraire-titre-periode' /> + format(new Date(startDate), 'dd/MM/yyyy') + ' - '+ format(new Date(endDate), 'dd/MM/yyyy')}
    title={
      <>
        <FormattedMessage id='itineraire-titre-matricule' />
        {matriculeCamion}
        <FormattedMessage id='itineraire-titre-periode' />
        {format(new Date(startDate), 'dd/MM/yyyy')}
        {' - '}
        {format(new Date(endDate), 'dd/MM/yyyy')}
      </>
    }
    content={false}
    secondary={
      <Button color="primary" onClick={() => onCancel('')}>
        <CloseOutlined />
      </Button>
    }
  >
    <CardContent maxWidth="xl">
      <Grid
        container
        spacing={2.75}
        alignItems="center"
        sx={{
          position: 'relative',
          '&>*': {
            position: 'relative',
            zIndex: '5'
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 10,
            left: 38,
            width: 2,
            height: '100%',
            background: '#ebebeb',
            zIndex: '1'
          }
        }}
      >

        {itineraireList.map((item) => (
          <Grid item xs={12} md={12} key={item.pk}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar type="filled" color="success" size="sm" sx={{ top: 10 }}>
                  <CarOutlined />
                </Avatar>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Typography align="left" variant="caption" color="secondary">
                      {new Date(item.createat).toLocaleDateString()}

                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="left" variant="body2">
                      {item.libelle}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}

      </Grid>
    </CardContent>
  </MainCard>
);

export default TasksCard;
