import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';

// project import
//import Loader from 'components/Loader';
import MainCard from 'components/MainCard';


// assets
import { EditOutlined, PrinterFilled } from '@ant-design/icons';
import { REQUEST_STATUS } from 'utils/apiConfig';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import LogoSection from 'components/logo';
import Loader from 'components/Loader';
import { format } from 'date-fns';
import { FormattedMessage } from 'react-intl';
import { PatternFormat } from 'react-number-format';
import { initEditCheckpoint } from 'store/reducers/checkpoints/editSlice';
import { initCreateCheckpoint } from 'store/reducers/checkpoints/createSlice';

// ==============================|| INVOICE - DETAILS ||============================== //

const Details = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch()

  const componentRef = useRef(null);

  const { detailStatus, checkpoint, detailError } = useSelector((state) => state.checkpoint.detail)

  const responsable = checkpoint.users?.find((element) => element.responsable == true)


  if (detailStatus == REQUEST_STATUS.loading) return <Loader />;

  if (detailStatus == REQUEST_STATUS.error) return <EmptyUserCard title={ <FormattedMessage id={detailError}/> } />;

  const handleClick = () => {
    dispatch(initEditCheckpoint())
    dispatch(initCreateCheckpoint())
    navigation(`/apps/checkpoints/edit/${id}`)
  }

  console.log(checkpoint)

  return (
    <MainCard content={false}>
      <Stack spacing={2.5}>
        <Box sx={{ p: 2.5, pb: 0 }}>
          <MainCard content={false} sx={{ p: 1.25, bgcolor: 'primary.lighter', borderColor: theme.palette.primary[100] }}>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <IconButton onClick={handleClick }>
                <EditOutlined style={{ color: theme.palette.grey[900] }} />
              </IconButton>
              <ReactToPrint
                trigger={() => (
                  <IconButton>
                    <PrinterFilled style={{ color: theme.palette.grey[900] }} />
                  </IconButton>
                )}
                content={() => componentRef.current}
              />
            </Stack>
          </MainCard>
        </Box>
        <Box sx={{ p: 2.5 }} id="print" ref={componentRef}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center">

                <Box>
                  <Stack direction="row" spacing={2}>
                    <LogoSection />
                  </Stack>
                </Box>

              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
                <Box>
                  <Typography variant="h1" align='center' >{checkpoint.libelle} #{checkpoint.code}</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5"><FormattedMessage id='location' /></Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Typography color="secondary">{checkpoint.district[0].name} - {checkpoint.district[0].ville}</Typography>
                    <Typography color="secondary">{checkpoint.district[0].departement} - {checkpoint.district[0].region}</Typography>
                    <Typography color="secondary">Lon: {checkpoint.longitude} , Lat: {checkpoint.latitude}</Typography>
                  </FormControl>
                </Stack>
              </MainCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5"><FormattedMessage id='responsable' /></Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Typography color="secondary">{responsable.username}</Typography>
                    <Typography color="secondary">{responsable.email}</Typography>
                    <Typography color="secondary">{responsable.phone}</Typography>
                  </FormControl>
                </Stack>
              </MainCard>
            </Grid>
            <Grid item xs={12}  >
              <Typography variant="subtitle1"><FormattedMessage id='checkpoint-agents' /></Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="center"><FormattedMessage id='name' /></TableCell>
                      <TableCell align="center"><FormattedMessage id='email' /></TableCell>
                      <TableCell align="right"><FormattedMessage id='phone' /></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {checkpoint?.users?.map((row) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.username}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="right"><PatternFormat displayType="text" format="+237 # ## ## ## ##" mask="_" defaultValue={row.phone} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="subtitle1"><FormattedMessage id='checkpoint-animals' /></Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="center"><FormattedMessage id='code' /></TableCell>
                      <TableCell align="center"><FormattedMessage id='name' /></TableCell>
                      <TableCell align="right"><FormattedMessage id='unit' /></TableCell>
                      <TableCell align="center"><FormattedMessage id='limit' /></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {checkpoint?.animals?.map((row) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell align="right">{row.code}</TableCell>
                        <TableCell align="center">{row.name} / {row.name_english}</TableCell>
                        <TableCell align="center">{row.unit}</TableCell>
                        <TableCell align="center">{row.max_animal}</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ p: 2.5, a: { textDecoration: 'none', color: 'inherit' } }}>
          <Box>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Typography color="secondary"><FormattedMessage id='created-on' /></Typography>
              <Typography variant="subtitle1">{format(new Date(checkpoint?.createat), 'dd/MM/yyyy')}</Typography>
            </Stack>
          </Box>
        </Stack>

      </Stack>
    </MainCard>
  );
};

export default Details;


/*

              <PDFDownloadLink document={<ExportPDFView checkpoint={checkpoint} />} fileName={`${checkpoint?.libelle}-${checkpoint?.code}.pdf`}>
                <Button variant="contained" color="primary">
                  <FormattedMessage id='download' />
                </Button>
              </PDFDownloadLink>
              */