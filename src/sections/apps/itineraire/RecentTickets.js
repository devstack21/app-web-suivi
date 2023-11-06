
// project imports
import MainCard from 'components/MainCard';
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import moment from 'moment';

const RecentTickets = ({ handleAdd, ListeCamion }) => {


  const lastWeek = moment().subtract(1, 'weeks');
  const startDate = lastWeek.startOf('week').format("YYYY-MM-DD HH:mm:ss");
  const endDate = lastWeek.endOf('week').format("YYYY-MM-DD HH:mm:ss");
  return (
      <MainCard
      title="Liste des Camions"
      content={false}
      // secondary={
      //   <Link component={RouterLink} to="#" color="primary">
      //     View all
      //   </Link>
      // }
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Matricule</TableCell>
              <TableCell>Ville provenance</TableCell>
              <TableCell>Ville destination</TableCell>
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
