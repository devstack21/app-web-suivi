// material-ui
import { PlusOutlined } from '@ant-design/icons';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { EmptyTable } from 'components/third-party/ReactTable';
import SimpleBar from 'components/third-party/SimpleBar';
import { FormattedMessage } from 'react-intl';
import AddUser from './AddUser';
import { useEffect, useState } from 'react';
import { PopupTransition } from 'components/@extended/Transitions';




// ===========================|| DATA WIDGET - PRODUCT SALES ||=========================== //

const UserCheckpoint = ({ selectedTab, setSelectedTab }) => {

  const [add, setAdd] = useState(false)

  const handleAdd = () => {
    //dispatch(initListBetail())
    setAdd(!add);
  };

  useEffect(() => { }, [add])

  useEffect(() => { }, [selectedTab])

  return (

    <MainCard title={<FormattedMessage id="handle-agents" />} content={false}>
      <Grid sx={{ p: 2.5 }} container direction="row" justifyContent={"flex-end"} >
        <Button variant="contained" startIcon={<PlusOutlined />}  onClick={handleAdd} size="small">
          <FormattedMessage id="add-agents" />
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
                <TableCell sx={{ pl: 2 }}><FormattedMessage id='name' /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {
                selectedTab?.length > 0 ?
                  <>
                    {selectedTab?.map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell sx={{ pl: 3 }} align="center">
                          <span className={row.colorClass}>{row.username}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                  :
                  <EmptyTable msg={<FormattedMessage id='no-users' />} colSpan={3}  />
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
        <AddUser setSelectedTab={setSelectedTab} selectedTab={selectedTab} hanldeModal={handleAdd} />

      </Dialog>
    </MainCard>
  )
};

export default UserCheckpoint;
