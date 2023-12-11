
import { useState } from 'react';
import DashboardContent from 'sections/visitor/DashboardContent';
import LoginCart from 'sections/visitor/LoginCard';


// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const VisitorDashboardAnalytics = () => {

  const [isLogin, setIsLogin] = useState(false)

  return (
    <>
      {
        isLogin ?
          <DashboardContent />

          :
          <LoginCart setIsLogin={setIsLogin} />

      }
    </>
  );
};

export default VisitorDashboardAnalytics;
