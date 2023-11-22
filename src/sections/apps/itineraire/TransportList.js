
// project imports
import { Chip, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { EmptyTable } from 'components/third-party/ReactTable';
import { useDispatch, useSelector } from 'react-redux';
import { PopupTransition } from 'components/@extended/Transitions';
import { useEffect, useState } from 'react';
import { getTransportDetails } from 'store/reducers/itineraire/transportDetailSlice';
import TransportDetail from 'pages/apps/transport/detailTransport';
import { useIntl } from 'react-intl';

const TransportTable = ({ debut, fin }) => {

  const dispatch = useDispatch()
  const intl = useIntl();

  const [add, setAdd] = useState(false)
  const [transport, setTransport] = useState('')



  const { ListCamion } = useSelector((state) => state.transport.list);


  const handleAdd = () => {
    setAdd(!add);
  };

  const handleClick = (row) => {
    setTransport(row)
    handleAdd()
  }

  useEffect(() => {
    if (transport.matricule) dispatch(
      getTransportDetails({
        debut: debut, fin: fin,
        id: transport.id_supply,
        matricule: transport.matricule
      }))
  }, [transport])


  return (

    <>


      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}><FormattedMessage id='transport-type' /></TableCell>
              <TableCell sx={{ pl: 3 }}><FormattedMessage id='itineraire-matricule' /></TableCell>
              <TableCell><FormattedMessage id='itineraire-ville-provenance' /></TableCell>
              <TableCell><FormattedMessage id='itineraire-ville-destination' /></TableCell>
            </TableRow>
          </TableHead>
          {ListCamion.length > 0 ?
            <TableBody>
              {ListCamion.map((row, index) => (
                <TableRow hover key={index} onClick={() => handleClick(row)} >
                  <TableCell>
                    {intl.locale == 'fr' && row.type_transport?.nom}
                    {intl.locale == 'en' && row.type_transport?.nom_en}
                  </TableCell>

                  <TableCell sx={{ pl: 3 }}>
                    <Chip variant="outlined" color="primary" label={row.matricule} size="small" />
                  </TableCell>
                  <TableCell>{row.provenance}</TableCell>
                  <TableCell>{row.destination}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            :
            <TableBody>
              <EmptyTable msg={<FormattedMessage id='no-reports' />} colSpan={4} />
            </TableBody>
          }
        </Table>
      </TableContainer>
      <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
      >
        <TransportDetail onCancel={handleAdd} transport={transport} debut={debut} fin={fin} />
      </Dialog>

    </>

  );

};

export default TransportTable;

