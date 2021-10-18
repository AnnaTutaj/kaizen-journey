import { Paths } from '@common/constants/Paths';
import { useAuth } from '@common/contexts/AuthContext';
import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';

interface IProps {
  path: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined;
}
const PrivateRoute: React.FC<IProps> = ({ path, component }) => {
  const { userAuth } = useAuth();

  if (!userAuth) {
    return (
      <Redirect
        to={{
          pathname: Paths.Home
        }}
      />
    );
  }

  return <Route exact path={path} component={component} />;
};

export default PrivateRoute;
