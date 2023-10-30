import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';

// material-ui
import {  useTheme } from '@mui/material/styles';
import {Dialog,Grid,Pagination,} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { PopupTransition } from 'components/@extended/Transitions';
import { IndeterminateCheckbox,} from 'components/third-party/ReactTable';


// assets
import { FormattedMessage } from 'react-intl';
import { getListAccounts } from 'store/reducers/Accounts/listSlice';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { useSelector, useDispatch } from 'react-redux';
import AlertAccountDelete from 'sections/apps/users/accounts/AlertAccountDelete';
import AddUser from 'sections/apps/users/accounts/AddUser';
import UserView from 'sections/apps/users/accounts/UserView';
import { PAGE_ROWS } from 'config';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { getListRole } from 'store/reducers/Roles/listSlice';
import AccountsTable from 'sections/apps/users/accounts/AccountsTable';
import ActionCell from 'sections/apps/users/accounts/ActionCell';
import StatusCell from 'sections/apps/users/accounts/StatusCell';
import useAccountState from 'sections/apps/users/accounts/useAccountState';



// ==============================|| CUSTOMER - LIST ||============================== //

// Section Cell and Header
const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);


const NumberFormatCell = ({ value }) => <PatternFormat displayType="text" format="+237 # ## ## ## ##" mask="_" defaultValue={value} />;


NumberFormatCell.propTypes = {
  value: PropTypes.string
};

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

const AccountListPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const {
    add,
    open,
    user,
    setUser,
    userDeleteId,
    setUserDeleteId,
    currentPage,
    setCurrentPage,
    handleAdd,
    handleClose
  } = useAccountState();



  const { listStatus, accountsTab, nbPages } = useSelector((state) => state.account.list)
  const { createStatus } = useSelector((state) => state.account.create)

  const { editStatus } = useSelector((state) => state.account.edit)

 
  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: SelectionHeader,
        accessor: 'selection',
        Cell: SelectionCell,
        disableSortBy: true
      },
      {
        Header: '#',
        accessor: 'id',
        className: 'cell-center'
      },
      {
        Header: 'User Name',
        accessor: 'username',
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Contact',
        accessor: 'phone',
        Cell: NumberFormatCell
      },
      {
        Header: 'Status',
        accessor: 'active',
        Cell: StatusCell
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => (
          <ActionCell
            row={row}
            setCustomer={setUser}
            setCustomerDeleteId={setUserDeleteId}
            handleAdd={handleAdd}
            handleClose={handleClose}
            theme={theme}
          />
        ),
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  useEffect(() => {
    dispatch(getListAccounts({ page: currentPage, nb: PAGE_ROWS }))
  }, [currentPage])


  useEffect(() => { dispatch(getListRole({ page: 1 })) }, [])


  const handleChangePage = (event, newPage) => { setCurrentPage(newPage); };

  const renderRowSubComponent = useCallback(({ row }) => <UserView data={accountsTab[row.id]} />, [accountsTab]);

  if (listStatus == REQUEST_STATUS.loading || createStatus == REQUEST_STATUS.loading
    || editStatus == REQUEST_STATUS.loading) {
    return (
      <EmptyUserCard title={<FormattedMessage id='loading' />} />
    )
  }

  return (
    <MainCard content={false}>
      <ScrollX>
        {
          listStatus == REQUEST_STATUS.succeed &&
          <AccountsTable
            columns={columns}
            data={accountsTab}
            handleAdd={handleAdd}
            getHeaderProps={(column) => column.getSortByToggleProps()}
            renderRowSubComponent={renderRowSubComponent}
          />
        }

      </ScrollX>
      <Grid sx={{ p: 2, py: 3 }} colSpan={9} >
        <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
          <Pagination
            count={nbPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            variant="combined"
          />
        </Grid>
      </Grid>


      <AlertAccountDelete title={userDeleteId} open={open} handleClose={handleClose} />
      {/* add user dialog */}
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
        <AddUser user={user} onCancel={handleAdd} page={currentPage} />
      </Dialog>
    </MainCard>
  );
};

export default AccountListPage;
