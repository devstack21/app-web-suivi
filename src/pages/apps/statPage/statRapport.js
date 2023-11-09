import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react'; //, useEffect, useCallback, 
import { useTheme } from '@mui/material/styles';
// import { Button, Dialog, Grid, Pagination, Stack, } from '@mui/material';

import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { IndeterminateCheckbox, } from 'components/third-party/ReactTable';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { PAGE_ROWS } from 'config';
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import AccountsTable from 'sections/apps/users/accounts/AccountsTable';
import { statCheckpoint_req } from 'store/reducers/dashboard/statCheckpointSlice';

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

const StatCheckpointPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch()

  const { loading, ListStatChpt , error} = useSelector((state) => state.statCheckpoint)

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        className: 'cell-center'
      }
    ],
    [theme]
  );

    useEffect(() => { 
        dispatch(statCheckpoint_req({ page: 1, nbre_ligne: PAGE_ROWS })) 
    }, [])
//   const renderRowSubComponent = useCallback(({ row }) => <UserView data={accountsTab[row.id]} />, [accountsTab]);
  if (loading) {
    return (
      <EmptyUserCard title={<FormattedMessage id='loading' />} />
    )
  }

  if (error) {
    return(
      <EmptyUserCard title={<FormattedMessage id={error} />} />
    )
  }

  return (
    <MainCard content={false}>
      <ScrollX>
        {
          ListStatChpt.length > 0 ?
            <AccountsTable
              columns={columns}
              data={ListStatChpt}
            //   handleAdd={handleAdd}
              getHeaderProps={(column) => column.getSortByToggleProps()}
            //   renderRowSubComponent={renderRowSubComponent}
            />
            :
            <>
              <EmptyUserCard title={<FormattedMessage id='no-user' />} />
            </>
        }
      </ScrollX>
    </MainCard>
  );
};

export default StatCheckpointPage;
