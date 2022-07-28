import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import Main from '@common/routes/Main';
import { ConfigProvider, Layout } from 'antd';
import { AppLocale } from '@common/lang';
import moment from 'moment';
import enUS from 'antd/lib/locale/en_US';
import plPL from 'antd/lib/locale/pl_PL';
import 'moment/locale/pl';
import { ITranslationConfig } from '@common/lang/config/types';
import { Language, useAuth } from '@common/contexts/AuthContext';
import { Locale } from 'antd/lib/locale-provider';
import { ThemeProvider } from '@themes/theme-provider';
import { ErrorBoundary } from 'react-error-boundary';
import PageError from '@common/components/PageError';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';

const App: React.FC = () => {
  const { userProfile } = useAuth();
  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);

  const [language, setLanguage] = useState<ITranslationConfig['locale']>(Language.en);
  const [locale, setLocale] = useState<Locale>(enUS);

  const appLocale = useMemo(() => (AppLocale as any)[language], [language]);
  moment.locale(language);

  useEffect(() => {
    setLanguage(userProfile?.language ? userProfile?.language : siteLanguage);
  }, [userProfile?.language, siteLanguage]);

  useEffect(() => {
    setLocale(language === Language.en ? enUS : plPL);
  }, [language]);

  return (
    <ThemeProvider>
      <ConfigProvider componentSize="large" locale={locale}>
        <IntlProvider locale={language} messages={appLocale.messages}>
          <Layout>
            <ErrorBoundary FallbackComponent={(props) => <PageError onClick={props.resetErrorBoundary} />}>
              <Main />
            </ErrorBoundary>
          </Layout>
        </IntlProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
