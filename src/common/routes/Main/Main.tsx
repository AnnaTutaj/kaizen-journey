import React from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import Header from '@common/containers/Header';
import { Paths } from '@common/constants/Paths';
import styles from './Main.module.less';
import Dashboard from '@modules/Dashboard';
import { useAuth } from '@common/contexts/AuthContext';
import PageLoading from '@common/components/PageLoading';
import Home from '@modules/Home';
import Gratitude from '@modules/Gratitude';
import PrivateRoute from '@common/containers/PrivateRoute';
import Habit from '@modules/Habit';

const { Content } = Layout;
//todo add route to PageNotFound, AccessDenied

const Main: React.FC = () => {
  const { isUserLoading } = useAuth();

  if (isUserLoading) {
    return <PageLoading />;
  }

  return (
    <Layout className={styles.Layout}>
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
          />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Main;
