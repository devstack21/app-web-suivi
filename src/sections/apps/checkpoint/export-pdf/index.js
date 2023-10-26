import PropTypes from 'prop-types';

// third-party
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';

// project import
import Header from './Header';
import Content from './Content';

const styles = StyleSheet.create({
  page: {
    padding: 30
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column'
    }
  }
});

// ==============================|| INVOICE EXPORT  ||============================== //

const ExportPDFView = ({ checkpoint }) => {
  let title = checkpoint?.libelle || checkpoint?.code;
  let checkpoint_name = checkpoint?.libelle ;

  return (
    <Document title={`${title} ${checkpoint_name}`}>
      <Page size="A4" style={styles.page}>
        <Header checkpoint={checkpoint} />
        <View style={styles.container}>
          <Content checkpoint={checkpoint} />
        </View>
      </Page>
    </Document>
  );
};

ExportPDFView.propTypes = {
  list: PropTypes.object
};

export default ExportPDFView;
