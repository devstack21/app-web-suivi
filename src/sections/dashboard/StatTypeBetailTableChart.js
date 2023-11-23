import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid } from '@mui/material';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const TypeAnimalTable = () => {
  const { result } = useSelector((state) => state.dashboard.type);

  return (
    <Grid item xs={7} md={6}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
        </Grid>
        <Typography variant="h5"><FormattedMessage id='statistics-animals-variation' /></Typography>

      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><FormattedMessage id='animal-type' /></TableCell>
              <TableCell><FormattedMessage id='previous-period' /></TableCell>
              <TableCell><FormattedMessage id='current-period' /></TableCell>
              <TableCell><FormattedMessage id='variation' /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.tab_current_period.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.type_animal}</TableCell>
                <TableCell>{result.tab_prev_period[index]?.quantity || 0} <FormattedMessage id='heads' /></TableCell>
                <TableCell>{item.quantity} <FormattedMessage id='heads' /> </TableCell>
                <TableCell>
                  <Typography color={item.variation >= 0 ? 'green' : 'red'}>
                    {item.variation > 0 && <ArrowUpOutlined />}
                    {item.variation < 0 && <ArrowDownOutlined />}
                    {(item.variation)}%
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            {/* Total row */}
            <TableRow>
              <TableCell><FormattedMessage id='total' /></TableCell>
              <TableCell>{result.total.prev} <FormattedMessage id='heads' /></TableCell>
              <TableCell>{result.total.now} <FormattedMessage id='heads' /></TableCell>
              <TableCell>
                <Typography color={result.tendance > 0 ? 'green' : 'red'}>
                  {result.tendance > 0 && <ArrowUpOutlined />}
                  {result.tendance < 0 && <ArrowDownOutlined />}
                  {(result.tendance)}%
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </Grid>
  );
};

export default TypeAnimalTable;
