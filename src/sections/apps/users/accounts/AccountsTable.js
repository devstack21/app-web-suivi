// ReactTable.js

import React, { useEffect, useMemo,Fragment } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Stack } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';
import {
    CSVExport,
    HeaderSort,
    TableRowSelection
} from 'components/third-party/ReactTable';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';


function AccountsTable({ columns, data, getHeaderProps, renderRowSubComponent, handleAdd }) {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const filterTypes = useMemo(() => renderFilterTypes, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        setHiddenColumns,
        visibleColumns,
        page,
        state: { globalFilter, selectedRowIds, expanded },
        preGlobalFilteredRows,
        setGlobalFilter,
        selectedFlatRows
    } = useTable(
        {
            columns,
            data,
            filterTypes,
            initialState: { pageIndex: 0, pageSize: 10,}
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect
    );

    useEffect(() => {
        if (matchDownSM) {
            setHiddenColumns(['phone', 'visits', 'email', 'active']);
        }
        // eslint-disable-next-line
    }, [matchDownSM]);


    return (
        <>
            <TableRowSelection selected={Object.keys(selectedRowIds).length} />
            <Stack spacing={3}>
                <Stack
                    direction={matchDownSM ? 'column' : 'row'}
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 3, pb: 0 }}
                >
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        size="small"
                    />
                    <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
                        <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd} size="small">
                            <FormattedMessage id="add-user" />
                        </Button>
                        <CSVExport data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original) : data} filename={'user-list.csv'} />
                    </Stack>
                </Stack>

                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup, i) => (
                            <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                                {headerGroup?.headers.map((column, index) => (
                                    <TableCell key={index} {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                                        <HeaderSort column={column} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            const rowProps = row.getRowProps();

                            return (
                                <Fragment key={i}>
                                    <TableRow
                                        {...row.getRowProps()}
                                        onClick={() => {
                                            row.toggleRowSelected();
                                        }}
                                        sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                                    >
                                        {row.cells.map((cell, index) => (
                                            <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                                                {cell.render('Cell')}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
                                </Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </Stack>
        </>
    );
}

AccountsTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    getHeaderProps: PropTypes.func,
    handleAdd: PropTypes.func,
    renderRowSubComponent: PropTypes.any,
};

export default AccountsTable;
