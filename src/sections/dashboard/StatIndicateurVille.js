
// material-ui
import {
    Grid,
    Typography
} from '@mui/material';

// project import
import { SpinnLoader } from 'components/cards/SpinnLoader';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getIndicateurVilles } from 'store/reducers/dashboard/statIndicateurVilleSlice';
import StatIndicator from './StatIndicatorTable';
import { REQUEST_STATUS } from 'utils/apiConfig';
import { getVisitorIndicateurVilles } from 'store/reducers/visitor/statIndicateurVilleSlice';


const StatIndicateurVille = ({ start, end, visitor = false }) => {

    const dispatch = useDispatch();


    const { status, error } = useSelector((state) => visitor ? state.visitor.indicator : state.dashboard.indicator);

    useEffect(() => {
        if (start && end) {
            if (visitor) {
                dispatch(
                    getVisitorIndicateurVilles({
                        debut: start,
                        end: end,
                    })
                );
            } else {
                dispatch(
                    getIndicateurVilles({
                        debut: start,
                        end: end,
                    })
                );
            }
            
        } else {
            console.log('Not entering condition');
        }
    }, [start, end]);



    return (

        <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">

                <Grid item />
                <Typography variant="h5"  ><FormattedMessage id="stat-alerts" /></Typography>

            </Grid>
            {status === REQUEST_STATUS.loading && <SpinnLoader title="loading-chart" />}
            {status === REQUEST_STATUS.error &&
                <>

                    <>
                        <Typography style={{ textAlign: 'center', padding: 10 }} variant="h6">
                            <FormattedMessage id={error} />
                        </Typography>
                    </>
                </>
                }
            {status === REQUEST_STATUS.succeed && (<StatIndicator visitor={visitor} />)}
        </Grid>
    );
};

export default StatIndicateurVille;


