// AddBetail.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { getListBetail } from 'store/reducers/Betail/listSlice';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { Checkbox, FormControlLabel, Grid, CardContent, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import MainCard from 'components/MainCard';

const AddBetail = ({ setSelectedTab, selectedTab, hanldeModal }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { listStatus, betailTab, nbPages } = useSelector((state) => state.betail.list);

  useEffect(() => {
    // Dispatch the action to fetch data when the currentPage changes
    dispatch(getListBetail({ page: currentPage }));
  }, [currentPage, dispatch]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleCheckboxChange = (item) => {
    const isSelected = selectedTab.some((selectedItem) => selectedItem.id === item.id);

    if (isSelected) {
      // If already selected, remove from the list
      setSelectedTab((prevSelectedTab) => prevSelectedTab.filter((selectedItem) => selectedItem.id !== item.id));
    } else {
      // If not selected, add to the list
      setSelectedTab((prevSelectedTab) => [...prevSelectedTab, { ...item, max_animal: 0 }]);
    }
  };

  return (
    <MainCard title={<FormattedMessage id="add-animal" />} subheader={<FormattedMessage id="add-animals-description" />} content={false}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item >
            {listStatus === REQUEST_STATUS.succeed && selectedTab && (
              <>
                {betailTab.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    control={
                      <Checkbox
                        checked={selectedTab?.some((selectedItem) => selectedItem.id === item.id)}
                        onChange={() => handleCheckboxChange(item)}
                        color="primary"
                      />
                    }
                    label={`${item.name} - ${item.type} `}
                  />
                ))}
              </>

            )}
          </Grid>

          <Grid item xs={12} container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Pagination
                count={nbPages}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                variant="combined"
              />
            </Grid>

            {/* Buttons for validation and cancellation */}
            <Grid item>
              <Button variant="contained" color="primary" onClick={hanldeModal}>
              <FormattedMessage id='validate' />
              </Button>
              <Button variant="outlined" color="error" onClick={hanldeModal} sx={{ ml: 1 }}>
                <FormattedMessage id='cancel' />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

    </MainCard>
  );
};

export default AddBetail;
