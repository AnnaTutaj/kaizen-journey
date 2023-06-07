import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Drawer, Grid, Layout, Switch } from 'antd';
import styles from './Header.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import RegisterModal, { IRegisterModalProps } from './components/RegisterModal/RegisterModal';
import LoginModal, { ILoginModalProps } from './components/LoginModal/LoginModal';
import UserAvatar from './components/UserAvatar';
import { Language, useAuth } from '@common/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@common/constants/Paths';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import kaizenJourneyLogo from '@assets/kaizen_journey_logo.svg';
import SiteMenu from './components/SiteMenu';
import { ITranslationConfig } from '@common/lang/config/types';
import LayoutActions from '@common/redux/modules/Layout/LayoutActions';
import { ILayoutOwnState } from '@common/redux/modules/Layout/LayoutInterface';
import { ThemeContext } from '@common/contexts/Theme/ThemeContext';
import Select, { Option } from '@common/components/Select/Select';

const { useBreakpoint } = Grid;

const Header: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const siteLanguage = useSelector(({ layout }: ILayoutOwnState) => layout.siteLanguage);

  const [registerModalConfig, setRegisterModalConfig] = useState<IRegisterModalProps>();
  const [loginModalConfig, setLoginModalConfig] = useState<ILoginModalProps>();

  const { userAuth } = useAuth();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const openRegisterModal = () => {
    setRegisterModalConfig({
      handleCancel: () => setRegisterModalConfig(undefined)
    });
  };

  const openLoginModal = () => {
    setLoginModalConfig({
      handleCancel: () => setLoginModalConfig(undefined)
    });
  };

  return (
    <>
      <Layout.Header className={styles.Container}>
        <div
          className={styles.LogoContainer}
          onClick={() => {
            navigate(Paths.Welcome);
          }}
        >
          <img src={kaizenJourneyLogo} className={styles.LogoImage} alt="Kaizen Journey Logo" />
        </div>

        {isMobile ? (
          <div className={styles.HamburgerMenuIconContainer} onClick={() => setIsMenuOpen(true)}>
            <FontAwesomeIcon className={styles.HamburgerMenuIcon} icon={faBars} />
          </div>
        ) : null}

        {userAuth ? (
          <div className={styles.Avatar}>
            <UserAvatar />
          </div>
        ) : null}

        {!userAuth ? (
          <div className={styles.Avatar}>
            <Select<ITranslationConfig['locale']>
              style={{ width: 65 }}
              dropdownMatchSelectWidth={120}
              defaultValue={siteLanguage}
              optionLabelProp="label"
              size="middle"
              placement="bottomRight"
              onChange={(value) => LayoutActions.setSiteLanguageAction(value)(dispatch)}
            >
              <Option value={Language.pl} label={Language.pl.toUpperCase()}>
                {intl.formatMessage({ id: 'common.language.polish' })}
              </Option>
              <Option value={Language.en} label={Language.en.toUpperCase()}>
                {intl.formatMessage({ id: 'common.language.english' })}
              </Option>
            </Select>
          </div>
        ) : null}

        <div className={styles.DarkModeSwitchContainer}>
          <Switch
            checkedChildren={<FontAwesomeIcon icon={faMoon} />}
            unCheckedChildren={<FontAwesomeIcon icon={faSun} />}
            checked={darkMode}
            onChange={setDarkMode}
          />
        </div>

        {!isMobile ? (
          <SiteMenu userAuth={userAuth} openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} />
        ) : null}
      </Layout.Header>

      <Drawer placement="right" closable={false} open={isMenuOpen} width="100vw" className={styles.MenuDrawer}>
        <div className={styles.MenuDrawerCloseIconContainer} onClick={() => setIsMenuOpen(false)}>
          <FontAwesomeIcon className={styles.MenuDrawerCloseIcon} icon={faTimes} />
        </div>
        <SiteMenu
          userAuth={userAuth}
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
          isMobile
          hideDrawer={() => setIsMenuOpen(false)}
        />
      </Drawer>

      {registerModalConfig ? <RegisterModal {...registerModalConfig} /> : null}
      {loginModalConfig ? <LoginModal {...loginModalConfig} /> : null}
    </>
  );
};

export default Header;
