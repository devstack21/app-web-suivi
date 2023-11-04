// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { LineChartOutlined, IdcardOutlined, DatabaseOutlined } from '@ant-design/icons';

// icons
const icons = {
  LineChartOutlined,
  IdcardOutlined,
  DatabaseOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const itineraire = {
  id: 'group-itineraire',
  title: <FormattedMessage id="itineraire" />,
  icon: icons.IdcardOutlined,
  type: 'group',
  children: [
    {
      id: 'listecamion',
      title: "Liste des Camions", // <FormattedMessage id="listecamion" />,
      type: 'item',
      url: '/itineraire/listecamion',
      icon: icons.IdcardOutlined
    },
    // {
    //   id: 'data',
    //   title: <FormattedMessage id="data" />,
    //   type: 'item',
    //   url: '/widget/data',
    //   icon: icons.DatabaseOutlined
    // },
    // {
    //   id: 'chart',
    //   title: <FormattedMessage id="chart" />,
    //   type: 'item',
    //   url: '/widget/chart',
    //   icon: icons.LineChartOutlined
    // }
  ]
};

export default itineraire;
