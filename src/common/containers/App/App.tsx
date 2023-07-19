import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import Main from '@common/routes/Main';
import { ConfigProvider, Layout, theme } from 'antd';
import { AppLocale } from '@common/lang';
import dayjs from 'dayjs';
import enUS from 'antd/lib/locale/en_US';
import plPL from 'antd/lib/locale/pl_PL';
import 'dayjs/locale/pl';
import { ITranslationConfig } from '@common/lang/config/types';
import AuthContextProvider, { Language, useAuth } from '@common/contexts/AuthContext';
import { Locale } from 'antd/lib/locale';
import { ErrorBoundary } from 'react-error-boundary';
import PageError from '@common/components/PageError';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import 'antd/dist/reset.css';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import { antdThemeComponents, antdThemeToken } from './antdThemeToken';
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';
import StyledTheme from './StyledTheme';

dayjs.extend(minMax);
dayjs.extend(isSameOrBefore);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

const App: React.FC = () => {
  const { userProfile } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);

  const [language, setLanguage] = useState<ITranslationConfig['locale']>(Language.en);
  const [locale, setLocale] = useState<Locale>(enUS);

  const appLocale = useMemo(() => (AppLocale as any)[language], [language]);
  dayjs.locale(language);

  useEffect(() => {
    setLanguage(userProfile.uid && userProfile.language ? userProfile.language : siteLanguage);
  }, [userProfile.uid, userProfile.language, siteLanguage]);

  useEffect(() => {
    setLocale(language === Language.en ? enUS : plPL);
  }, [language]);

  return (
    <ConfigProvider
      componentSize="large"
      locale={locale}
      theme={{
        hashed: false,
        token: antdThemeToken(darkMode, userProfile.theme),
        components: antdThemeComponents(darkMode, userProfile.theme),
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <StyledTheme>
        <IntlProvider locale={language} messages={appLocale.messages}>
          <AuthContextProvider>
            <Layout>
              <ErrorBoundary FallbackComponent={(props) => <PageError onClick={props.resetErrorBoundary} />}>
                <Main />
              </ErrorBoundary>
            </Layout>
          </AuthContextProvider>
        </IntlProvider>
      </StyledTheme>
    </ConfigProvider>
  );
};

export default App;
