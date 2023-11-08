// ActionCell.js

import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

const ActionCell = ({ row, setCustomer, setCustomerDeleteId, handleAdd, handleClose, theme }) => (
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
        disabled={false}
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

ActionCell.propTypes = {
  row: PropTypes.object,
  setCustomer: PropTypes.func,
  setCustomerDeleteId: PropTypes.func,
  handleAdd: PropTypes.func,
  handleClose: PropTypes.func,
  theme: PropTypes.object,
};

export default ActionCell;
