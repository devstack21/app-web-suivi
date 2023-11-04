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

const alerte = {
  id: 'group-alerte',
  title: <FormattedMessage id="alerte" />,
  icon: icons.IdcardOutlined,
  type: 'group',
  children: [
    {
      id: 'alerteForm',
      title: "Creation alerte", // <FormattedMessage id="listecamion" />,
      type: 'item',
      url: '/alerte/form',
      icon: icons.IdcardOutlined
    },
    {
        id: 'alerteList',
        title: "Liste des alertes", // <FormattedMessage id="listecamion" />,
        type: 'item',
        url: '/alerte/list',
        icon: icons.IdcardOutlined
      },

  ]
};

export default alerte;
