import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const StatIndicator = () => {
  const { result } = useSelector((state) => state.dashboard.indicator);

  return (

      <TableContainer component={Paper} sx={{textAlign: "center"}}>
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
            {result.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.ville_name}</TableCell>
                <TableCell>{item.animal_name}</TableCell>
                <TableCell>{item.min_animal} </TableCell>
                <TableCell>{item.max_animal} </TableCell>

                <TableCell>
                  <Typography style={{fontWeight: 'bold'}} color={(item.qte_actuelle >= item.max_animal || item.qte_actuelle <= item.min_animal )? 'red' : 'green'}>
                    {item.qte_actuelle > 0 && <ArrowUpOutlined />}
                    {item.qte_actuelle < 0 && <ArrowDownOutlined />}
                    {(item.qte_actuelle)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            {/* Total row */}

          </TableBody>
        </Table>
      </TableContainer>

  );
};

export default StatIndicator;