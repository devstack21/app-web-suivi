import {  useState, useEffect } from 'react';

// material-ui
import {
  Grid,
  Stack,
  useMediaQuery,
  Button,
  FormControl,
  Select,
  MenuItem,
  Box,
  Dialog,
  Slide,
  Pagination,
  Typography
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'; 


// project import
import { PopupTransition } from 'components/@extended/Transitions';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import AddCustomer from 'sections/apps/customer/AddCustomer';

import { GlobalFilter } from 'utils/react-table';
import usePagination from 'hooks/usePagination';

// assets
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { getListRole } from 'store/reducers/Roles/listSlice';
import { REQUEST_STATUS } from 'utils/apiConfig';
import RoleCard from 'sections/apps/users/RoleCard';

// ==============================|| CUSTOMER - CARD ||============================== //

const allColumns = [
  {
    id: 1,
    header: 'Default'
  },
  {
    id: 2,
    header: 'Customer Name'
  },
  {
    id: 3,
    header: 'Email'
  },
  {
    id: 4,
    header: 'Contact'
  },
  {
    id: 7,
    header: 'Status'
  }
];

const UserRoleCardPage = () => {
  const dispatch = useDispatch()

  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { listStatus, roleTab, listError } = useSelector((state) => state.role.list)


  const [sortBy, setSortBy] = useState('Default');
  const [globalFilter, setGlobalFilter] = useState('');
  const [add, setAdd] = useState(false);
  const [role, setRole] = useState(null);
  const [roleCard, setRoleCard] = useState([]);
  const [page, setPage] = useState(1);
  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleAdd = () => {
    setAdd(!add);
    if (role && !add) setRole(null);
  };

  useEffect(() => {
    dispatch(getListRole({page: page}))
  },[page])

  useEffect(() => {
    if (listStatus == REQUEST_STATUS.succeed) {
      setRoleCard(roleTab)
    }
  },[listStatus])

  // search
  useEffect(() => {
    const newData = roleTab.filter((value) => {
      if (globalFilter) {
        return value.libelle.toLowerCase().includes(globalFilter.toLowerCase());
      } else {
        return value;
      }
    });
    setRoleCard(newData);
  }, [globalFilter, roleTab]);

  const PER_PAGE = 10;

  const count = Math.ceil(roleCard.length / PER_PAGE);
  const _DATA = usePagination(roleCard, PER_PAGE);

  const handleChangePage = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  
  if (listStatus == REQUEST_STATUS.loading) {
    return(
      <EmptyUserCard title={<FormattedMessage id='loading' />} />
    )
  }

  if (listStatus == REQUEST_STATUS.error) {
    return(
      <EmptyUserCard title={<FormattedMessage id={listError} />} />
    )
  }

  return (
    <>
      <Box sx={{ position: 'relative', marginBottom: 3 }}>
        <Stack direction="row" alignItems="center">
          <Stack
            direction={matchDownSM ? 'column' : 'row'}
            sx={{ width: '100%' }}
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <GlobalFilter preGlobalFilteredRows={roleTab} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
            <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={sortBy}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <Typography variant="subtitle1">Sort By</Typography>;
                    }

                    return <Typography variant="subtitle2">Sort by ({sortBy})</Typography>;
                  }}
                >
                  {allColumns.map((column) => {
                    return (
                      <MenuItem key={column.id} value={column.header}>
                        {column.header}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd}>
                <FormattedMessage id='add-new-role' />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Grid container spacing={3}>
        {listStatus == REQUEST_STATUS.succeed && roleCard.length > 0 ? (
          _DATA
            .currentData()
            .sort(function (a, b) {
              if (sortBy === 'Name') return a.libelle.localeCompare(b.libelle);
              if (sortBy === 'Code') return a.code_role.localeCompare(b.code_role);
              if (sortBy === 'Status') return a.active.localeCompare(b.active);
              return a;
            })
            .map((role, index) => (
              <Slide key={index} direction="up" in={true} timeout={50}>
                <Grid item xs={12} sm={6} lg={4}>
                  <RoleCard role={role} />
                </Grid>
              </Slide>
            ))
        ) : (
          <EmptyUserCard title={'You have not created any customer yet.'} />
        )}
      </Grid>
      <Stack spacing={2} sx={{ p: 2.5 }} alignItems="flex-end">
        <Pagination
          count={count}
          size="medium"
          page={page}
          showFirstButton
          showLastButton
          variant="combined"
          color="primary"
          onChange={handleChangePage}
        />
      </Stack>

      {/* add customer dialog */}
      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddCustomer customer={role} onCancel={handleAdd} />
      </Dialog>
    </>
  );
};

export default UserRoleCardPage;
