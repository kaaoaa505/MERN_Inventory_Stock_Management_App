import Sidebar from '../../components/Layout/Sidebar/Sidebar';
import Layout from '../../components/Layout/Layout';
import RedirectLoggedoutUser from '../../hooks/RedirectHook';

const Dashboard = () => {
  RedirectLoggedoutUser('/login');

  return (
    <div className="DashboardComponent">
      <Sidebar>
        <Layout>
          <h2>Dashboard</h2>
        </Layout>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
