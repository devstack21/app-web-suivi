import PropTypes from 'prop-types';
import { useMemo, useEffect, Fragment, useState, useRef } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import {
  Box,
//   Typography,
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
  Button
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { EditTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons';

import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';
import { CSVExport, HeaderSort, IndeterminateCheckbox, TableRowSelection } from 'components/third-party/ReactTable';

import { dispatch, useSelector } from 'store';
import { renderFilterTypes, GlobalFilter, DateColumnFilter } from 'utils/react-table';

import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { FormattedMessage } from 'react-intl';
import { REQUEST_STATUS } from 'utils/apiConfig';

import { getListAxeparcours } from 'store/reducers/axeparcours/listeAxeparcoursSlice';
import { PAGE_ROWS } from 'config';
import { initCreateAxeparcours } from 'store/reducers/axeparcours/createAxeparcoursSlice';
import { initEditAxeparcours } from 'store/reducers/axeparcours/editAxeparcoursSlice';
import { getDetailAxeparcours } from 'store/reducers/axeparcours/detailAxeparcoursSlice';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const theme = useTheme();
  const navigate = useNavigate()
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

          <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => {
            dispatch(initEditAxeparcours())
            dispatch(initCreateAxeparcours())
            navigate("/apps/axeparcours/create")
          }} size="small">
            <FormattedMessage id="add-axeparcours" />
          </Button>
          <CSVExport data={data} filename={'axeparcours-list.csv'} />
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

const ActionCell = (row, navigation, theme) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="left" spacing={0}>
      <Tooltip title={<FormattedMessage id='view' />}>
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(initEditAxeparcours())
            dispatch(initCreateAxeparcours())
            dispatch(getDetailAxeparcours({id: row.values.id, page: 1, nbre_ligne: PAGE_ROWS}))
            navigation('/apps/axeparcours/details/',{state: row.original});
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
            navigation('/apps/axeparcours/edit/',{state: row.original});
          }}
        >
          <EditTwoTone twoToneColor={theme.palette.primary.main} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};


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

const ListAxeparcours = () => {

  const navigation = useNavigate();
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState(1);

  const { status, ListAxe, nbPages, error } = useSelector((state) => state.axeparcours.list);


  useEffect(() => { dispatch(getListAxeparcours({page: currentPage, nbre_ligne: PAGE_ROWS})) }, [currentPage])

  useEffect(() => { }, [status])

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
        Header: ' Id',
        accessor: 'id',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: <FormattedMessage id='libelle' />,
        accessor: 'libelle',
        disableFilters: true,
      },
      {
        Header: <FormattedMessage id='description' />,
        accessor: 'description',
        disableFilters: true,
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

  if (status == REQUEST_STATUS.loading) {
    return (
      <EmptyUserCard title={<FormattedMessage id='loading' />} />
    )
  }

  if (status == REQUEST_STATUS.error) {
    return (
      <EmptyUserCard title={<FormattedMessage id={error} />} />
    )
  }


  return (
    <>
      <MainCard content={false}>
        {
          ListAxe?.length > 0 ?
            <>
              <ScrollX>
                <ReactTable columns={columns} data={ListAxe} />
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
            <>

              <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ p: 2, }}>

                <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigation("/apps/axeparcours/create")} size="small">
                  <FormattedMessage id="add-axeparcours" />
                </Button>
              </Stack>
              <EmptyUserCard title={<FormattedMessage id='no-axeparcours' />} />

            </>

        }
      </MainCard>
    </>
  );
};


export default ListAxeparcours;
