
// project imports
import MainCard from 'components/MainCard';
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, TextField, Button } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

const RecentTickets = ({ handleAdd, ListeCamion, handleSubmit, startDate, setStartDate, endDate, setEndDate }) => {

  

  // const startDate = lastWeek.startOf('week').format("YYYY-MM-DD HH:mm:ss");
  // const endDate = lastWeek.endOf('week').format("YYYY-MM-DD HH:mm:ss");
  return (
      <MainCard
      style={{ width: '100%' }}
      title={<FormattedMessage id='list-transport' />}
      secondary={
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <TextField
              label="Date de début"
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
              label="Date de fin"
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
              Soumettre
            </Button>
          </Grid>
        </Grid>
      }
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Immatriculation</TableCell>
              <TableCell>Ville provenance</TableCell>
              <TableCell>Ville destination</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                Période
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListeCamion.map((row, index) => (
              <TableRow hover key={index} onClick={() => handleAdd(row.matricule)}>
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
        </Table>
      </TableContainer>
    </MainCard>
  );
};


export default RecentTickets;
