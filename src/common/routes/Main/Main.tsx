import React from 'react';
import { Layout } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import Header from '@common/containers/Header';
import Footer from '@common/containers/Footer';
import { Paths } from '@common/constants/Paths';
import PageUnderConstruction from '@common/components/PageUnderConstruction';
import styles from './Main.module.less';
import { useAuth } from '@common/contexts/AuthContext';
import PageLoading from '@common/components/PageLoading';
import Home from '@modules/Home';
import Gratitude from '@modules/Gratitude';
import PrivateRoute from '@common/containers/PrivateRoute';
import Habit from '@modules/Habit';
import HabitTracker from '@modules/Habit/routes/HabitTracker';
import HabitArchive from '@modules/Habit/routes/HabitArchive';
import Friend from '@modules/Friend';
import FriendFollowing from '@modules/Friend/routes/FriendFollowing';
import FriendFollower from '@modules/Friend/routes/FriendFollower';
import HabitView from '@modules/Habit/routes/HabitView';
import cn from 'classnames';
import { useIntl } from 'react-intl';

const { Content } = Layout;
//todo add route to PageNotFound, AccessDenied

const Main: React.FC = () => {
  const intl = useIntl();
  const { isUserLoading } = useAuth();
  const hideContentPadding = useSelector(({ layout }: ILayoutOwnState) => layout.hideContentPadding);

  if (isUserLoading) {
    return <PageLoading />;
  }

  return (
    <Layout>
      <Header />
      <Content className={cn(styles.Content, { [styles.ContentNoPadding]: hideContentPadding })}>
        <Routes>
          <Route path={Paths.Home} element={<Home />} />
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
          <Route
            path={Paths.Friend}
            element={
              <PrivateRoute>
                <Friend />
              </PrivateRoute>
            }
          >
            <Route path={Paths.FriendFollowing} element={<FriendFollowing />} />
            <Route path={Paths.FriendFollowers} element={<FriendFollower />} />
            <Route
              path={Paths.FriendFollowers}
              element={<PageUnderConstruction title={intl.formatMessage({ id: 'friend.menu.followers' })} />}
            />
            <Route path={Paths.Friend} element={<Navigate replace to={Paths.FriendFollowing} />} />
          </Route>

          {/* todo: Create Page Not Found View */}
          <Route path="*" element={<PageUnderConstruction title="Page Not Found" />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Main;
