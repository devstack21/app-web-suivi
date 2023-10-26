import PropTypes from 'prop-types';
import { useMemo, useEffect, Fragment, useState, useRef } from 'react';

// material-ui
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  Tooltip,
  Pagination,
  Grid,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// third-party
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import {  EditTwoTone, EyeTwoTone } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';
import { CSVExport, HeaderSort, IndeterminateCheckbox, TableRowSelection } from 'components/third-party/ReactTable';

import { dispatch, useSelector } from 'store';
import { renderFilterTypes, GlobalFilter, DateColumnFilter } from 'utils/react-table';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { FormattedMessage } from 'react-intl';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { format } from 'date-fns';
import { getDetailCheckpoint } from 'store/reducers/checkpoints/detailSlice';
import { getListAgentCheckpoints } from 'store/reducers/checkpoints/listAgentSlice';
import { useNavigate } from 'react-router';
import { initEditCheckpoint } from 'store/reducers/checkpoints/editSlice';
import { initCreateCheckpoint } from 'store/reducers/checkpoints/createSlice';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultColumn = useMemo(() => ({ Filter: DateColumnFilter }), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'status', value: '' }],
      pageIndex: 0,
      pageSize: 5
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { globalFilter, selectedRowIds },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      defaultColumn,
      initialState
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const componentRef = useRef(null);

  // ================ Tab ================

  return (
    <>

      <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 3 }}>
        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
        </Stack>
        <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={matchDownSM ? 1 : 0}>
          <TableRowSelection selected={Object.keys(selectedRowIds).length} />
          <CSVExport data={data} filename={'checkpoints-list.csv'} />
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column, x) => (
                  <TableCell key={x} align='center'  {...column.getHeaderProps([{ className: column.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell, i) => (
                      <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

// ==============================|| INVOICE - LIST ||============================== //


const UserCell = ({ value }) => {
  return (
    <Typography variant="subtitle1">
      {value.length > 0 ? (value.find((element) => element.responsable == true)).username : ""}
    </Typography>)
};
const DateCell = ({ value }) => { return (<Typography variant="subtitle1">{format(new Date(value), 'dd/MM/yyyy')}</Typography>) };
const ActionCell = (row,  navigation, theme) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      <Tooltip title={<FormattedMessage id='view' />}>
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(initEditCheckpoint())
            dispatch(initCreateCheckpoint())
            dispatch(getDetailCheckpoint({ id: row.values['checkpoint.id']}))
            navigation(`/apps/checkpoints/details/${row.values['checkpoint.id']}`);
          }}
        >
          <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
        </IconButton>
      </Tooltip>
      <Tooltip title={<FormattedMessage id='edit' />}>
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(initEditCheckpoint())
            dispatch(initCreateCheckpoint({ id: row.values['checkpoint.id']}))
            navigation(`/apps/checkpoints/edit/${row.values['checkpoint.id']}`);
          }}
        >
          <EditTwoTone twoToneColor={theme.palette.primary.main} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};


UserCell.propTypes = { value: PropTypes.array };
DateCell.propTypes = { value: PropTypes.string };


// Action Cell

ActionCell.propTypes = {
  row: PropTypes.array,
  navigation: PropTypes.func,
  theme: PropTypes.object
};

// Section Cell and Header
const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

const AgentList = () => {

  const navigation = useNavigate();
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState(1);

  const { listStatus, agentsTab, nbPages, listError } = useSelector((state) => state.checkpoint.agentList)


  useEffect(() => { dispatch(getListAgentCheckpoints({ page: currentPage, nb: 5 })) }, [currentPage])

  useEffect(() => { }, [listStatus])

  const handleChangePage = (event, newPage) => { setCurrentPage(newPage); };


  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: SelectionHeader,
        accessor: 'selection',
        Cell: SelectionCell,
        disableSortBy: true,
        disableFilters: true
      },
      {
        Header: ' Id Checkpoint',
        accessor: 'checkpoint.id',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: <FormattedMessage id='name' />,
        accessor: 'username',
      },
      {
        Header: <FormattedMessage id='email' />,
        accessor: 'email',
      },
      {
        Header: <FormattedMessage id='phone' />,
        accessor: 'phone',
      },
      {
        Header: <FormattedMessage id='chekpoint' />,
        accessor: 'checkpoint.libelle',
      },
      {
        Header: <FormattedMessage id='city' />,
        accessor: 'checkpoint.district[0].ville',
      },
      {
        Header: <FormattedMessage id='region' />,
        accessor: 'checkpoint.district[0].region',
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => ActionCell(row, navigation, theme)
      }
    ],
    []
  );

  if (listStatus == REQUEST_STATUS.loading) {
    return (
      <EmptyUserCard title={<FormattedMessage id='loading' />} />
    )
  }

  if (listStatus == REQUEST_STATUS.error) {
    return (
      <EmptyUserCard title={<FormattedMessage id={listError} />} />
    )
  }

  return (
    <>
      <MainCard content={false}>
        {
          agentsTab?.length > 0 ?
            <>
              <ScrollX>
                <ReactTable columns={columns} data={agentsTab} />
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
            </>
            :
            <EmptyUserCard title={<FormattedMessage id='no-checkpoint' />} />

        }
      </MainCard>
    </>
  );
};


export default AgentList;
