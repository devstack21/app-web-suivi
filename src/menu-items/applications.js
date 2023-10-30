// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons';

// icons
const icons = {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  FileTextOutlined
};
// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications = {
  id: 'group-applications',
  title: <FormattedMessage id="applications" />,
  icon: icons.AppstoreAddOutlined,
  type: 'group',
  children: [
    {
      id: 'checkpoints',
      title: <FormattedMessage id="checkpoints" />,
      type: 'collapse',
      icon: icons.FileTextOutlined,
      breadcrumbs: true,
      children: [
        {
          id: 'list',
          title: <FormattedMessage id="checkpoint-list" />,
          type: 'item',
          url: '/apps/checkpoints/list'
        },
        {
          id: 'agents',
          title: <FormattedMessage id="agent-list" />,
          type: 'item',
          url: '/apps/checkpoints/agents'
        },
      ]
    },
    {
      id: 'users',
      title: <FormattedMessage id="user-menu" />,
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'users-roles',
          title: <FormattedMessage id="user-group" />,
          type: 'item',
          url: '/apps/users/roles',
          breadcrumbs: false
        },
        {
          id: 'users-accounts',
          title: <FormattedMessage id="user-account" />,
          type: 'item',
          url: '/apps/users/accounts',
          breadcrumbs: false
        }
      ]
    },
  ]
};

export default applications;
