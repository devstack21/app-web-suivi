// StatusCell.js

import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const StatusCell = ({ value }) => (
  <Chip
    color={value ? 'error' : 'success'}
    label={<FormattedMessage id={value ? 'inactive' : 'active'} />}
    size="small"
    variant="light"
  />
);

StatusCell.propTypes = {
  value: PropTypes.number,
};

export default StatusCell;
