// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileDoneOutlined,
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
  FileTextOutlined,
  FileDoneOutlined
};
// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications = {
  id: 'group-applications',
  title: <FormattedMessage id="applications" />,
  icon: icons.AppstoreAddOutlined,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      icon: icons.FileTextOutlined,
      breadcrumbs: true,
      url: '/dashboard/analytics',

    },
    {
      id: 'alerts',
      title: <FormattedMessage id="alerts" />,
      type: 'collapse',
      icon: icons.FileTextOutlined,
      breadcrumbs: true,
      children: [
        {
          id: 'create',
          title: <FormattedMessage id="alert-create" />,
          type: 'item',
          url: 'apps/alerts/create',
          icon: icons.IdcardOutlined
        },
        {
          id: 'list',
          title: <FormattedMessage id="alert-list" />,
          type: 'item',
          url: 'apps/alerts/list',
          icon: icons.IdcardOutlined
        },

      ]
    },
    {
      id: 'itineraire',
      title: <FormattedMessage id="itineraire" />,
      icon: icons.IdcardOutlined,
      type: 'collapse',
      children: [
        {
          id: 'list',
          title: <FormattedMessage id="truck-list" />, // <FormattedMessage id="listecamion" />,
          type: 'item',
          url: 'apps/itineraire/list',
          icon: icons.IdcardOutlined
        }
      ]
    },
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
    {
      id: 'reports',
      title: <FormattedMessage id="reports" />,
      type: 'collapse',
      url: '/forms/validation',
      icon: icons.FileDoneOutlined,
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
