
// material-ui
import {
    Grid,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets


import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { getStatImportTypeBetail } from 'store/reducers/dashboard/statImportTypeBetailSlice';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { SpinnLoader } from 'components/cards/SpinnLoader';


const StatItem = ({ item }) => (
    <ListItemButton divider>
        <ListItemText
            primary={<Typography variant="subtitle1">  {item.name}</Typography>}
            secondary={
                <Typography color="textSecondary" sx={{ display: 'inline' }}>
                    {item.checkpoint}
                </Typography>
            }
        />
        <Stack alignItems="flex-end">
            <Typography variant="h5" color="primary">
                {item.effectif} <FormattedMessage id='heads' />
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {item.variation >= 0 ? '+' : '-'}{item.variation}%
            </Typography>
        </Stack>
    </ListItemButton>
)


const StatImportBetail = ({ type, start, end }) => {

    const dispatch = useDispatch()

    const { result, status } = useSelector((state) => state.dashboard.import);


    useEffect(() => {
        if (type?.id && start && end) {

            dispatch(getStatImportTypeBetail({
                debut: start,
                end: end,
                betail: type.id,
            }));
        } else {
            console.log('Not entering condition');
        }


    }, [type, start, end])



    return (

        <Grid item xs={12} md={5} lg={4}>
            <Grid container alignItems="center" justifyContent="space-between">
                
                <Grid item />
                <Grid item>
                    <Typography variant="h5"><FormattedMessage id='statistics-import' /> {type?.libelle} </Typography>
                </Grid>
            </Grid>
            {status === REQUEST_STATUS.loading && <SpinnLoader title="loading-chart" />}
            {
                status === REQUEST_STATUS.succeed &&
                <MainCard sx={{ mt: 2 }} content={false}>
                    <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                        {status === REQUEST_STATUS.succeed && (
                            <>
                                {result.tab_current_period.map((item) => (
                                    <StatItem key={item.name} item={item} />
                                ))}
                            </>

                        )}

                    </List>
                </MainCard>
            }


        </Grid>
    );
};

export default StatImportBetail;

