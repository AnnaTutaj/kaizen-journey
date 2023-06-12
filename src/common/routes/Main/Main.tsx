import React, { Suspense, lazy } from 'react';
import { Layout } from 'antd';
import { generatePath, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import Header from '@common/containers/Header';
import Footer from '@common/containers/Footer';
import { Paths } from '@common/constants/Paths';
import { useAuth } from '@common/contexts/AuthContext';
import PageLoading from '@common/components/PageLoading';
import PrivateRoute from '@common/containers/PrivateRoute';
import HabitTracker from '@modules/Habit/routes/HabitTracker';
import HabitArchive from '@modules/Habit/routes/HabitArchive';
import FriendFollowing from '@modules/Friend/routes/FriendFollowing';
import FriendFollower from '@modules/Friend/routes/FriendFollower';
import HabitView from '@modules/Habit/routes/HabitView';
import { useIntl } from 'react-intl';
import UserHabit from '@modules/User/routes/UserHabit';
import UserGratitude from '@modules/User/routes/UserGratitude';
import UserFriendFollowing from '@modules/User/routes/UserFriendFollowing';
import UserFriendFollower from '@modules/User/routes/UserFriendFollower';
import HomeRoute from '@common/containers/HomeRoute/HomeRoute';
import { StyledContent } from './styled';

const PageUnderConstruction = lazy(() => import('@common/components/PageUnderConstruction'));
const Home = lazy(() => import('@modules/Home'));
const Gratitude = lazy(() => import('@modules/Gratitude'));
const Habit = lazy(() => import('@modules/Habit'));
const Friend = lazy(() => import('@modules/Friend'));
const User = lazy(() => import('@modules/User'));

//todo add route to PageNotFound, AccessDenied

const RedirectToUser = () => {
  const { id } = useParams();
  return <Navigate replace to={generatePath(Paths.UserViewHabit, { id: id })} />;
};

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
      <StyledContent $hideContentPadding={hideContentPadding}>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route
              path={Paths.Home}
              element={
                <HomeRoute>
                  <Home />
                </HomeRoute>
              }
            />
            <Route path={Paths.Welcome} element={<Home />} />
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
            <Route
              path={Paths.UserView}
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            >
              <Route path={Paths.UserViewHabit} element={<UserHabit />} />
              <Route path={Paths.UserViewGratitude} element={<UserGratitude />} />
              <Route path={Paths.UserViewFollowing} element={<UserFriendFollowing />} />
              <Route path={Paths.UserViewFollowers} element={<UserFriendFollower />} />
              <Route path={Paths.UserView} element={<RedirectToUser />} />
            </Route>
            {/* todo: Create Page Not Found View */}
            <Route path="*" element={<PageUnderConstruction title="Page Not Found" />} />
          </Routes>
        </Suspense>
      </StyledContent>
      <Footer />
    </Layout>
  );
};

export default Main;
