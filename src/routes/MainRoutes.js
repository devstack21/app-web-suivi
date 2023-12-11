import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';


// render - dashboard
const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));


// render - visitor

const PageNotFound = Loadable(lazy(()=> import('pages/maintenance/404')))

//Checkpoint
const AppCheckpointCreate = Loadable(lazy(() => import('pages/apps/checkpoint/create')));
const AppCheckpointEdit = Loadable(lazy(() => import('pages/apps/checkpoint/edit')));
const AppCheckpointDetail = Loadable(lazy(() => import('pages/apps/checkpoint/details')));
const AppCheckpointList = Loadable(lazy(() => import('pages/apps/checkpoint/list')));
const AppCheckpointAgentList = Loadable(lazy(() => import('pages/apps/checkpoint/agentList')));

// alerts
const AppAlertList = Loadable(lazy(() => import('pages/apps/alerte/alerteList')));
const AppAlertCreate = Loadable(lazy(() => import('pages/apps/alerte/alerteCreate')));
const AppAlertEdit = Loadable(lazy(() => import('pages/apps/alerte/alerteEdit')));

// Itineraire
const AppItineraireList = Loadable(lazy(() => import('pages/apps/transport/listTransport')));
const AppItineraireDetail = Loadable(lazy(() => import('pages/apps/transport/detailTransport')));

// Role
const RoleList = Loadable(lazy(() => import('pages/apps/users/roles/roleList')));
const RoleCreate = Loadable(lazy(() => import('pages/apps/users/roles/create')));


const UserAccounts = Loadable(lazy(() => import('pages/apps/users/accounts/list')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));


//Rapport
const RapportList = Loadable(lazy(()=> import('pages/apps/rapports/list')));
const RapportDetail = Loadable(lazy(()=> import('pages/apps/rapports/detailRapport')));
const ValidatePassword = Loadable(lazy(()=> import('pages/apps/users/valideChangePassword/ListeValidePassword')));
const ListRapportCheckpoint = Loadable(lazy(()=> import('pages/apps/rapports/listRapportCheckpoint')));

const AxeparcoursList = Loadable(lazy(()=> import('pages/apps/axeparcours/axeparcoursListe')))
const AxeparcoursCreate = Loadable(lazy(()=> import('pages/apps/axeparcours/axeparcoursCreate')))
const AxeparcoursEdit = Loadable(lazy(()=> import('pages/apps/axeparcours/axeparcoursEdit')))
const AxeparcoursDetail = Loadable(lazy(()=> import('pages/apps/axeparcours/axeparcoursDetail')))


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          children: [
            {
              path: 'analytics',
              element: <DashboardAnalytics />
            }
          ]
        },

        
     
        {
          path: 'apps',
          children: [
            {
              path: 'alerts',
              children: [
                {
                  path: 'list',
                  element: <AppAlertList />
                },
                {
                  path: 'create',
                  element: <AppAlertCreate />
                },
                {
                  path: 'edit',
                  element: <AppAlertEdit />
                }
              ]
            }, {
              path: 'transport',
              children: [
                {
                  path: 'list',
                  element: <AppItineraireList />
                },
                {
                  path: 'detail',
                  element: <AppItineraireDetail />
                }
              ]
            },
            {
              path: 'axeparcours',
              children: [
                {
                  path: 'create',
                  element: <AxeparcoursCreate />
                },
                {
                  path: 'edit', ///:id
                  element: <AxeparcoursEdit />
                },
                {
                  path: 'details', ///:id
                  element: <AxeparcoursDetail />
                },
                {
                  path: 'list',
                  element: <AxeparcoursList />
                }
              ]
            },
            {
              path: 'checkpoints',
              children: [
                {
                  path: 'create',
                  element: <AppCheckpointCreate />
                },
                {
                  path: 'edit/:id',
                  element: <AppCheckpointEdit />
                },
                {
                  path: 'details/:id',
                  element: <AppCheckpointDetail />
                },
                {
                  path: 'list',
                  element: <AppCheckpointList />
                },
                {
                  path: 'agents',
                  element: <AppCheckpointAgentList />
                }
              ]
            },
            {
              path: 'reports',
              children: [
                {
                  path: 'list',
                  element: <RapportList />
                },
                
                {
                  path: 'details/:id',
                  element: <RapportDetail />
                },
                {
                  path: 'listRapportCheckpoint',
                  element: <ListRapportCheckpoint />
                }
              ]
            },
            
           
            {
              path: 'users',
              children: [
                {
                  path: 'accounts',
                  element: <UserAccounts />,
                },
                {
                  path: 'roles',
                  element: <RoleList />,
                },
                {
                  path: 'role/create',
                  element: <RoleCreate />,
                },
                {
                  path: 'role/edit/:id',
                  element: <RoleCreate />,
                },
                {
                  path: 'validatePassword',
                  element: <ValidatePassword />,
                }
              ]
            },
            
            
          ]
        },
      ]
    },
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
      ]
    },
    
    {
      path: '*',
      element: <PageNotFound  />,
    }
  ]
};

export default MainRoutes;
