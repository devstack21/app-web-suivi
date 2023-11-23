import { useEffect, useState } from 'react';

// material-ui
import {
  Grid, Button, Table, Dialog, TextField,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow,
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import { PopupTransition } from 'components/@extended/Transitions';


// Third party
import { FormattedMessage } from 'react-intl';
import { PlusOutlined } from '@ant-design/icons';
import AddBetails from './AddBetail';
import { EmptyTable } from 'components/third-party/ReactTable';



// ===========================|| DATA WIDGET - PRODUCT SALES ||=========================== //

const BetailCheckpoint = ({ selectedTab, setSelectedTab, setFormikAnimalTabs }) => {

  //const dispatch = useDispatch()

  const [add, setAdd] = useState(false)

  const handleAdd = () => {
    //dispatch(initListBetail())
    setAdd(!add);
  };

  useEffect(() => { }, [add])

  useEffect(() => { }, [selectedTab])

  const handleInputChange = (id, field, value) => {
    const newData = selectedTab.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setSelectedTab(newData);
    setFormikAnimalTabs('animalTabs', newData);
  };

  return (
    <MainCard title={<FormattedMessage id='handle-animals' />} content={false}  >
      <Grid sx={{ p: 2.5 }} container direction="row" justifyContent={"flex-end"} >
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd} size="small">
          <FormattedMessage id="add-animal" />
        </Button>
      </Grid>

      <SimpleBar
        sx={{
          height: 290
        }}
      >

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3 }} align="center"><FormattedMessage id='name' /></TableCell>
                <TableCell align="center"><FormattedMessage id='unit' /></TableCell>
                <TableCell align="center"><FormattedMessage id='limit' /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {
                selectedTab?.length > 0 ?
                  <>
                    {selectedTab?.map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell sx={{ pl: 3 }} align="center">
                          <span className={row.colorClass}>{row.name} / {row.name_english}</span>
                        </TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                          <span>{row.unit}</span>
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            value={row.max_animal || ''}
                            onChange={(e) => handleInputChange(row.id, 'max_animal', e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                  :
                  <EmptyTable msg={<FormattedMessage id='no-animals' />} colSpan={3} />
              }
            </TableBody>
          </Table>
        </TableContainer>
      </SimpleBar>
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
        <AddBetails setSelectedTab={setSelectedTab} selectedTab={selectedTab} hanldeModal={handleAdd} />

      </Dialog>

    </MainCard>
  )

}




export default BetailCheckpoint;
