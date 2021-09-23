import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Header from '@common/containers/Header';
import { Paths } from '@common/constants/Paths';
import styles from './Main.module.less';
import Dashboard from '@modules/Dashboard';

const { Content } = Layout;
// import AccessDenied from '@common/routes/AccessDenied';
// import PageNotFound from '@common/routes/PageNotFound';

const Main: React.FC = () => {
  return (
    <Layout className={styles.Layout}>
      <Header />
      <Content className={styles.Content}>
        <Switch>
          {/* //todo check permissions, LoadableComponent */}
          <Route exact path={Paths.Dashboard} component={Dashboard} />

          {/* <Route path={Paths.AccessDenied} component={AccessDenied} /> */}
          {/* <Route path={Paths.PageNotFound} component={PageNotFound} /> */}
        </Switch>
      </Content>
    </Layout>
  );
};

export default Main;
