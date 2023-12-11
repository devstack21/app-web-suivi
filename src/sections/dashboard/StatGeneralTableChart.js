import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { formatDate } from 'utils/function';
import { EmptyTable } from 'components/third-party/ReactTable';

const TypeAnimalTable = ({ type, visitor }) => {
  const { result } = useSelector((state) => visitor ? state.visitor.type : state.dashboard.type);

  const tab = type == 'animals' ? result.result.animals : result.result.transport


  return (

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><FormattedMessage id={type} /></TableCell>
              <TableCell> {formatDate(result.date.prev.debut)} - {formatDate(result.date.prev.fin)} </TableCell>
              <TableCell>{formatDate(result.date.now.debut)} - {formatDate(result.date.now.fin)}</TableCell>
              <TableCell><FormattedMessage id='variation' /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tab.length > 0 ?
                <>
                  {tab.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.prev_effectif} {type == 'animals' && item.unit}</TableCell>
                      <TableCell>{item.quantity} {type == 'animals' && item.unit}</TableCell>
                      <TableCell>
                        <Typography color={item.variation >= 0 ? 'green' : 'red'}>
                          {item.variation > 0 && <ArrowUpOutlined />}
                          {item.variation < 0 && <ArrowDownOutlined />}
                          {(item.variation)}%
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
                :
                <EmptyTable msg={<FormattedMessage id='no-reports' />} colSpan={6} />
            }

            {/* Total row */}

          </TableBody>
        </Table>
      </TableContainer>

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