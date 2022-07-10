import React from 'react';
import { Layout } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '@common/containers/Header';
import Footer from '@common/containers/Footer';
import { Paths } from '@common/constants/Paths';
import styles from './Main.module.less';
import Dashboard from '@modules/Dashboard';
import { useAuth } from '@common/contexts/AuthContext';
import PageLoading from '@common/components/PageLoading';
import Home from '@modules/Home';
import Gratitude from '@modules/Gratitude';
import PrivateRoute from '@common/containers/PrivateRoute';
import Habit from '@modules/Habit';
import PageUnderConstruction from '@common/components/PageUnderConstruction';
import HabitTracker from '@modules/Habit/routes/HabitTracker';
import HabitArchive from '@modules/Habit/routes/HabitArchive';
import HabitView from '@modules/Habit/routes/HabitView';

const { Content } = Layout;
//todo add route to PageNotFound, AccessDenied

const Main: React.FC = () => {
  const { isUserLoading } = useAuth();

  if (isUserLoading) {
    return <PageLoading />;
  }

  return (
    <Layout>
      <Header />
      <Content className={styles.Content}>
        <Routes>
          <Route path={Paths.Home} element={<Home />} />
          <Route
            path={Paths.Dashboard}
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.Gratitude}
            element={
              <PrivateRoute>
                <Gratitude />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.Habit}
            element={
              <PrivateRoute>
                <Habit />
              </PrivateRoute>
            }
          >
            <Route path={Paths.HabitTracker} element={<HabitTracker />} />
            <Route path={Paths.HabitArchive} element={<HabitArchive />} />
            <Route path={Paths.Habit} element={<Navigate replace to={Paths.HabitTracker} />} />
          </Route>
          <Route
            path={Paths.HabitView}
            element={
              <PrivateRoute>
                <HabitView />
              </PrivateRoute>
            }
          />

          {/* todo: Create Page Not Found View */}
          <Route path="*" element={<PageUnderConstruction title="Page Not Found" />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Main;
