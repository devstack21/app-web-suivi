import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { EmptyTable } from 'components/third-party/ReactTable';

const StatIndicator = ({visitor}) => {
  const { result } = useSelector((state) => visitor ?  state.visitor.indicator : state.dashboard.indicator);

  return (

    <TableContainer component={Paper} sx={{ textAlign: "center" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><FormattedMessage id='city' /></TableCell>
            <TableCell><FormattedMessage id='animals' /></TableCell>
            <TableCell><FormattedMessage id='Min.' /></TableCell>
            <TableCell><FormattedMessage id='Max.' /></TableCell>
            <TableCell><FormattedMessage id='Qte' /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            result.alerts?.length > 0 ?
              <>
                {result.alerts?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.ville_name}</TableCell>
                    <TableCell>{item.animal_name}</TableCell>
                    <TableCell>{item.min_animal} </TableCell>
                    <TableCell>{item.max_animal} </TableCell>

                    <TableCell>
                      <Typography style={{ fontWeight: 'bold' }} color={(item.qte_actuelle >= item.max_animal || item.qte_actuelle <= item.min_animal) ? 'red' : 'green'}>
                        {item.qte_actuelle > item.max_animal && <ArrowUpOutlined />}
                        {item.qte_actuelle < item.min_animal && <ArrowDownOutlined />}
                        {(item.qte_actuelle)} {(item.unit)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}

              </>
              :
              <EmptyTable colSpan={5} msg='no-alert'/>
          }
          {/* Total row */}

        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default StatIndicator;