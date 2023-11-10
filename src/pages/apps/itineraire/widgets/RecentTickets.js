
// project imports
import MainCard from 'components/MainCard';
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, TextField, Button } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';

const RecentTickets = ({ handleAdd, ListeCamion, handleSubmit, startDate, setStartDate, endDate, setEndDate }) => {

  
  return (
      <MainCard
      style={{ width: '100%' }}
      title={<FormattedMessage id='itineraire-titre' />}
      secondary={
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <TextField
              // label="Date de début"
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
              // label="Date de fin"
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
            <Button variant="contained" color="primary" onClick={()=>handleSubmit(startDate, endDate)}>
              <FormattedMessage id='detailrapport-valider' />
            </Button>
          </Grid>
        </Grid>
      }
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}><FormattedMessage id='itineraire-matricule' /></TableCell>
              <TableCell><FormattedMessage id='itineraire-ville-provenance' /></TableCell>
              <TableCell><FormattedMessage id='itineraire-ville-destination' /></TableCell>
              <TableCell><FormattedMessage id='itineraire-type' /></TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                <FormattedMessage id='itineraire-periode' />
              </TableCell>
            </TableRow>
          </TableHead>
          {ListeCamion.length > 0 ?
          <TableBody>
            {ListeCamion.map((row, index) => (
              <TableRow hover key={index} onClick={() => handleAdd(row.matricule, row.id_supply)}>
                <TableCell sx={{ pl: 3 }}>
                <Chip variant="outlined" color="secondary" label={row.matricule} size="small" />
                  </TableCell>
                <TableCell>{row.provenance}</TableCell>
                <TableCell>{row.destination}</TableCell>
                <TableCell>{row.type_transport}</TableCell>
                {/* <TableCell align="right" sx={{ pr: 3 }}>
                  <Chip variant="outlined" color="secondary" label={format(new Date(row.heure), 'dd/MM/yyyy')} size="small" />
                </TableCell> */}
                <TableCell align="right">{format(new Date(startDate), 'dd/MM/yyyy')} - {format(new Date(endDate), 'dd/MM/yyyy')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          :
          <TableBody>
          <EmptyUserCard title={<FormattedMessage id='itineraire-no-camion' />} />
        </TableBody>
        }
        </Table>
      </TableContainer>
    </MainCard>
  );
};


export default RecentTickets;
