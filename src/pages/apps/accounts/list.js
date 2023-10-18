import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  Dialog,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  useMediaQuery
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import {
  CSVExport,
  HeaderSort,
  IndeterminateCheckbox,
  SortingSelect,
  TableRowSelection
} from 'components/third-party/ReactTable';

import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// assets
import {  PlusOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { getListAccounts } from 'store/reducers/Accounts/listSlice';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { useSelector, useDispatch } from 'react-redux';
import AlertAccountDelete from 'sections/apps/accounts/AlertAccountDelete';
import AddUser from 'sections/apps/accounts/AddUser';
import UserView from 'sections/apps/accounts/UserView';
import { PAGE_ROWS } from 'config';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { getListRole } from 'store/reducers/Roles/listSlice';


// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps,
  renderRowSubComponent, handleAdd }) {
  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'username', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    page,
    state: { globalFilter, selectedRowIds, expanded },
    preGlobalFilteredRows,
    setGlobalFilter,
    setSortBy,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 10, sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    if (matchDownSM) {
      setHiddenColumns(['phone', 'visits', 'email', 'active']);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);



  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}
        >
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd} size="small">
              <FormattedMessage id="add-user" />
            </Button>
            <CSVExport data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original) : data} filename={'user-list.csv'} />
          </Stack>
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell key={index} {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell, index) => (
                      <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func,
  handleAdd: PropTypes.func,
  renderRowSubComponent: PropTypes.any,
  //setPage: PropTypes.any
};

// ==============================|| CUSTOMER - LIST ||============================== //

// Section Cell and Header
const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);


const NumberFormatCell = ({ value }) => <PatternFormat displayType="text" format="+237 # ## ## ## ##" mask="_" defaultValue={value} />;

const StatusCell = ({ value }) => {
  switch (value) {
    case false:
      return <Chip color="error" label={<FormattedMessage id='inactive' />} size="small" variant="light" />;
    case true:
      return <Chip color="success" label={<FormattedMessage id='active' />} size="small" variant="light" />;
  }
};

const ActionCell = (row, setCustomer, setCustomerDeleteId, handleAdd, handleClose, theme) => {
  
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      <Tooltip title="Edit">
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            setCustomer(row.values);
            handleAdd();
          }}
        >
          <EditTwoTone twoToneColor={theme.palette.primary.main} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
            setCustomerDeleteId(row.values.username);
          }}
        >
          <DeleteTwoTone twoToneColor={theme.palette.error.main} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

StatusCell.propTypes = {
  value: PropTypes.number
};

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


  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userDeleteId, setUserDeleteId] = useState();
  const [currentPage, setCurrentPage] = useState(1);


  const { listStatus, accountsTab, nbPages } = useSelector((state) => state.account.list)
  const { createStatus } = useSelector((state) => state.account.create)


  const handleAdd = () => {
    setAdd(!add);
    if (user && !add) setUser(null);
  };

  const handleClose = () => {
    setOpen(!open);
  };

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
        Cell: ({ row }) => ActionCell(row, setUser, setUserDeleteId, handleAdd, handleClose, theme)
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  useEffect(() => {
    dispatch(getListAccounts({ page: currentPage, nb: PAGE_ROWS }))
  }, [currentPage])
  useEffect(() => {}, [listStatus])

  useEffect(() => {
      dispatch(getListRole({ page: 1 }))
  }, [])
  
  useEffect(() =>{},[user])

  const handleChangePage = (event, newPage) => {setCurrentPage(newPage);};

  const renderRowSubComponent = useCallback(({ row }) => <UserView data={accountsTab[row.id]} />, [accountsTab]);

  if (listStatus == REQUEST_STATUS.loading || createStatus == REQUEST_STATUS.loading ) {
    return (
      <EmptyUserCard title={<FormattedMessage id='loading' />} />
    )
  }

  return (
    <MainCard content={false}>
      <ScrollX>
        {
          listStatus == REQUEST_STATUS.succeed &&
          <ReactTable
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
        <AddUser user={user} onCancel={handleAdd} />
      </Dialog>
    </MainCard>
  );
};

export default AccountListPage;
