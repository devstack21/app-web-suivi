// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  AreaChartOutlined,
  AlertOutlined,
  CompassOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HomeOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons';

// icons
const icons = {
  AreaChartOutlined,
  AlertOutlined,
  CompassOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  HomeOutlined,
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
      icon: icons.AreaChartOutlined,
      breadcrumbs: true,
      url: '/dashboard/analytics',

    },
    {
      id: 'alerts',
      title: <FormattedMessage id="alerts" />,
      type: 'collapse',
      icon: icons.AlertOutlined,
      breadcrumbs: true,
      children: [
        {
          id: 'create',
          title: <FormattedMessage id="alert-create" />,
          type: 'item',
          url: 'apps/alerts/create',
        },
        {
          id: 'list',
          title: <FormattedMessage id="alert-list" />,
          type: 'item',
          url: 'apps/alerts/list',
        },

      ]
    },
    
    {
      id: 'checkpoints',
      title: <FormattedMessage id="checkpoints" />,
      type: 'collapse',
      icon: icons.HomeOutlined,
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
      id: 'itineraire',
      title: <FormattedMessage id="itineraire" />,
      icon: icons.CompassOutlined,
      type: 'collapse',
      children: [
        {
          id: 'list',
          title: <FormattedMessage id="truck-list" />, // <FormattedMessage id="listecamion" />,
          type: 'item',
          url: 'apps/itineraire/list',
        }
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
      icon: icons.FileDoneOutlined,
      children: [
        {
          id: 'reports',
          title: <FormattedMessage id="report-list" />,
          type: 'item',
          url: '/apps/reports/list',
          breadcrumbs: false
        },
      ]

    },
    {
      id: 'statRapport',
      title: <FormattedMessage id="stat-rapport" />,
      icon: icons.CompassOutlined,
      type: 'collapse',
      children: [
        {
          id: 'list',
          title: <FormattedMessage id="stat-rapport" />, // <FormattedMessage id="listecamion" />,
          type: 'item',
          url: 'apps/stat/rapport',
        }
      ]
    },
  ]
};

export default applications;
