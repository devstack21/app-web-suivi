import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid } from '@mui/material';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const TypeAnimalTable = ({type}) => {
  const { result } = useSelector((state) => state.dashboard.type);

  const tab = type == 'animals' ? result.result.animals : result.result.transport

  return (
    <Grid item xs={7} md={6}  >
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><FormattedMessage id={type} /></TableCell>
              <TableCell><FormattedMessage id='previous-period' /></TableCell>
              <TableCell><FormattedMessage id='current-period' /></TableCell>
              <TableCell><FormattedMessage id='variation' /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tab.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.prev_effectif} {type == 'animals' && item.unit }</TableCell>
                <TableCell>{item.quantity} {type == 'animals' && item.unit }</TableCell>
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
           
          </TableBody>
        </Table>
      </TableContainer>

    </Grid>
  );
};

export default TypeAnimalTable;


/*
<Grid container alignItems="center" justifyContent="space-between">

        <Typography variant="h5"><FormattedMessage id='statistics-animals' /></Typography>
        <Grid item>
        </Grid>
      </Grid>

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
            */