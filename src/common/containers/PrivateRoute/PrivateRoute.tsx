import { Paths } from '@common/constants/Paths';
import { useAuth } from '@common/contexts/AuthContext';
import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<IProps> = ({ children }) => {
  const { userAuth } = useAuth();
  const location = useLocation();

  if (!userAuth) {
    return <Navigate to={Paths.Welcome} state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
