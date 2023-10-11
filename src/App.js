import { useEffect } from 'react';

// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';

//import Loader from 'components/Loader';
import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';


// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch dashboard menu from API
    // dispatch(fetchMenu()).then(() => {
    // setLoading(false);
    //});
  }, []);

  // if (loading) return <Loader />;

  return (
    <ThemeCustomization>
      <RTLLayout>
          <Locales>
            <ScrollTop>
              <AuthProvider>
                <>
                  <Notistack>
                    <Routes />
                    <Snackbar />
                  </Notistack>
                </>
              </AuthProvider>
            </ScrollTop>
          </Locales>
      </RTLLayout>
    </ThemeCustomization>
  );
};

export default App;
