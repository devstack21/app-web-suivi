

import { Grid } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashbaordAnalytics = () => {

    const { analytics } = useSelector((state) => state.dashbaord.analytics);


    return (

        <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title={<FormattedMessage id='trucks' />}
                    isLoss={(analytics.camion.variation < 0)}
                    count={analytics.camion.now}
                    percentage={analytics.camion.variation}
                    extra={analytics.camion.prev}
                    type='trucks'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title={<FormattedMessage id='trains' />}
                    color='warning'
                    isLoss={(analytics.trains.variation < 0)}
                    count={analytics.trains.now}
                    percentage={analytics.trains.variation}
                    extra={analytics.trains.prev}
                    type='trains'

                />

            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title={<FormattedMessage id='reports' />}
                    color='info'
                    isLoss={(analytics.rapports.variation < 0)}
                    count={analytics.rapports.now}
                    percentage={analytics.rapports.variation}
                    extra={analytics.rapports.prev}
                    type='reports'
                />

            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title={<FormattedMessage id='alert' />}
                    color='error'
                    isLoss={(analytics.notif.variation < 0)}
                    count={analytics.notif.now}
                    percentage={analytics.notif.variation}
                    extra={analytics.notif.prev}
                    type='alert'
                />

            </Grid>

        </>

    );
};

export default DashbaordAnalytics;
