import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';



// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import VisitorDashboardAnalytics from 'pages/visitors/analytics';
import { Outlet } from 'react-router';
import { Box } from '@mui/system';

const Header = lazy(() => import('./Header'));

// ==============================|| Loader ||============================== //

const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2)
  }
}));

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

// ==============================|| MINIMAL LAYOUT ||============================== //

const CommonLayout = ({ layout = 'landing' }) => {

  return (
    <>
      {(layout === 'landing' || layout === 'simple') && (
        <Suspense fallback={<Loader />}>
          <Header layout={layout} />
          <Box sx={{ padding: 15 }}> {/* Add some space to avoid overlapping with the header */}
            <VisitorDashboardAnalytics/>
          </Box>
        </Suspense>
      )}
      {layout === 'blank' && <Outlet />}
    </>
  );
};

CommonLayout.propTypes = {
  layout: PropTypes.string
};

export default CommonLayout;
//          <FooterBlock isFull={layout === 'landing'} />
