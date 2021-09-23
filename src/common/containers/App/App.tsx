import * as React from 'react';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import Main from '@common/routes/Main';
import { ConfigProvider, DatePicker, Layout } from 'antd';
import { AppLocale } from '@common/lang';
import moment from 'moment';
import enUS from 'antd/lib/locale/en_US';
import plPL from 'antd/lib/locale/pl_PL';
import 'moment/locale/pl';
import { ITranslationConfig } from '@common/lang/config/types';

const App: React.FC = () => {
  //todo load languages from redux
  const [language, setLanguage] = React.useState<ITranslationConfig['locale']>('en');
  const appLocale = useMemo(() => (AppLocale as any)[language], [language]);
  moment.locale(language);
  const locale = language === 'en' ? enUS : plPL;

  return (
    <ConfigProvider componentSize="large" locale={locale}>
      <IntlProvider locale={language} messages={appLocale.messages}>
        <Layout>
          <Main />
        </Layout>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
