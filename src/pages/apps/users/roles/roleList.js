import PropTypes from 'prop-types';
import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import {
  Chip,
  Typography,
  Stack,
  Pagination,
  Grid,
  Button
} from '@mui/material';
import {  useTheme } from '@mui/material/styles';

// third-party
import { PlusOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { IndeterminateCheckbox } from 'components/third-party/ReactTable';

import { dispatch, useSelector } from 'store';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { FormattedMessage } from 'react-intl';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { getListRole } from 'store/reducers/Roles/listSlice';
import { ActionCell } from 'sections/apps/users/roles/ActionCell';
import RoleTable from 'sections/apps/users/roles/RolesTable';
import { format } from 'date-fns';


// ==============================|| Role - LIST ||============================== //


const UserCell = ({ value }) => {
  return (
    <Typography variant="subtitle1">
      {value.length > 0 ? (value.find((element) => element.responsable == true))?.username : ""}
    </Typography>)
};
UserCell.propTypes = { value: PropTypes.array };

const UpdateCell = ({ value }) => {
  return (format(new Date(value), 'dd/MM/yyyy'))
};
UpdateCell.propTypes = { value: PropTypes.string };

// Action Cell


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

const StatusCell = ({ value }) => {
  switch (value) {
    case false:
      return <Chip color="error" label={<FormattedMessage id='inactive' />} size="small" variant="light" />;
    case true:
      return <Chip color="success" label={<FormattedMessage id='active' />} size="small" variant="light" />;
  }
};

StatusCell.propTypes = {
  value: PropTypes.number
};

const RoleList = () => {

  const navigation = useNavigate();
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState(1);

  const { listStatus, roleTab, nbPages, listError } = useSelector((state) => state.role.list)


  useEffect(() => { dispatch(getListRole({ page: currentPage })) }, [currentPage])


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
        Header: <FormattedMessage id='name' />,
        accessor: 'libelle',
        disableFilters: true,
      },
      {
        Header: <FormattedMessage id='code' />,
        accessor: 'code_role',
        disableFilters: true,
      },
      {
        Header: <FormattedMessage id='status' />,
        accessor: 'active',
        Cell: StatusCell
      },
      {
        Header: <FormattedMessage id='created-on' />,
        accessor: 'created_at',
        Cell: UpdateCell
      },
      {
        Header: <FormattedMessage id='last-update' />,
        accessor: 'updated_at',
        Cell: UpdateCell
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
          roleTab?.length > 0 ?
            <>
              <ScrollX>
                <RoleTable columns={columns} data={roleTab} />
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

                <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => navigation("/apps/role/create")} size="small">
                  <FormattedMessage id="add-role" />
                </Button>
              </Stack>
              <EmptyUserCard title={<FormattedMessage id='no-role' />} />

            </>

        }
      </MainCard>
    </>
  );
};


export default RoleList;
