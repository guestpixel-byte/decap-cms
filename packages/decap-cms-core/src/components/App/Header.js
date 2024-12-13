import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { translate } from 'react-polyglot';
import { NavLink } from 'react-router-dom';
import {
  Dropdown,
  DropdownItem,
  StyledDropdownButton,
  colors,
  lengths,
  shadows,
  buttons,
  zIndex,
} from 'decap-cms-ui-default';
import { connect } from 'react-redux';

import { SettingsDropdown } from '../UI';
import { checkBackendStatus } from '../../actions/status';

const styles = {
  buttonActive: css`
    color: ${colors.active};
  `,
};

function AppHeader(props) {
  return (
    <header
      css={css`
        ${shadows.dropMain};
        position: sticky;
        width: 100%;
        top: 0;
        background-color: ${colors.foreground};
        z-index: ${zIndex.zIndex300};
        height: ${lengths.topBarHeight};
      `}
      {...props}
    />
  );
}

const AppHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 800px;
  max-width: 1440px;
  padding: 0 12px;
  margin: 0 auto;

  @media (max-width: 768px) {
    min-width: 100%;
    flex-direction: column;
    padding: 0;
    position: relative;
  }
`;

const AppHeaderButton = styled.button`
  ${buttons.button};
  background: none;
  color: #7b8290;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  display: inline-flex;
  padding: 16px 20px;
  align-items: center;
`;

const AppHeaderNavLink = AppHeaderButton.withComponent(NavLink);

const AppHeaderActions = styled.div`
  display: inline-flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1000;
  }
`;

const HamburgerLine = styled.div`
  height: 3px;
  width: 100%;
  background-color: #7b8290;
  transition: all 0.3s ease;

  ${props => props.isOpen && css`
    &:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}
`;

const MobileMenu = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${colors.foreground};
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const AppHeaderNavList = styled.ul`
  display: flex;
  margin: 0;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const AppHeaderQuickNewButton = styled(StyledDropdownButton)`
  ${buttons.button};
  ${buttons.medium};
  ${buttons.gray};
  margin-right: 8px;

  &:after {
    top: 11px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    collections: ImmutablePropTypes.map.isRequired,
    onCreateEntryClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    openMediaLibrary: PropTypes.func.isRequired,
    hasWorkflow: PropTypes.bool.isRequired,
    displayUrl: PropTypes.string,
    isTestRepo: PropTypes.bool,
    t: PropTypes.func.isRequired,
    checkBackendStatus: PropTypes.func.isRequired,
    showMediaButton: PropTypes.bool,
  };

  state = {
    isMobileMenuOpen: false
  };

  intervalId;

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.props.checkBackendStatus();
    }, 5 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  toggleMobileMenu = () => {
    this.setState(prevState => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen
    }));
  };

  handleCreatePostClick = collectionName => {
    const { onCreateEntryClick } = this.props;
    if (onCreateEntryClick) {
      onCreateEntryClick(collectionName);
      this.setState({ isMobileMenuOpen: false });
    }
  };

  render() {
    const {
      user = {},
      collections,
      onLogoutClick,
      openMediaLibrary,
      hasWorkflow,
      displayUrl,
      isTestRepo,
      t,
      showMediaButton,
    } = this.props;

    const { isMobileMenuOpen } = this.state;

    const creatableCollections = collections
      .filter(collection => collection.get('create'))
      .toList();

    return (
      <AppHeader>
        <AppHeaderContent>
          <HamburgerMenu onClick={this.toggleMobileMenu}>
            <HamburgerLine isOpen={isMobileMenuOpen} />
            <HamburgerLine isOpen={isMobileMenuOpen} />
            <HamburgerLine isOpen={isMobileMenuOpen} />
          </HamburgerMenu>
          <MobileMenu isOpen={isMobileMenuOpen}>
            <nav>
              <AppHeaderNavList>
                <li>
                  <AppHeaderNavLink
                    to="/"
                    activeClassName="header-link-active"
                    isActive={(match, location) => location.pathname.startsWith('/collections/')}
                    onClick={this.toggleMobileMenu}
                  >
                    {t('app.header.content')}
                  </AppHeaderNavLink>
                </li>
                {hasWorkflow && (
                  <li>
                    <AppHeaderNavLink 
                      to="/workflow" 
                      activeClassName="header-link-active"
                      onClick={this.toggleMobileMenu}
                    >
                      {t('app.header.workflow')}
                    </AppHeaderNavLink>
                  </li>
                )}
                {showMediaButton && (
                  <li>
                    <AppHeaderButton 
                      onClick={() => {
                        openMediaLibrary();
                        this.toggleMobileMenu();
                      }}
                    >
                      {t('app.header.media')}
                    </AppHeaderButton>
                  </li>
                )}
              </AppHeaderNavList>
            </nav>
            <AppHeaderActions>
              {creatableCollections.size > 0 && (
                <Dropdown
                  renderButton={() => (
                    <AppHeaderQuickNewButton> {t('app.header.quickAdd')}</AppHeaderQuickNewButton>
                  )}
                  dropdownTopOverlap="30px"
                  dropdownWidth="160px"
                  dropdownPosition="left"
                >
                  {creatableCollections.map(collection => (
                    <DropdownItem
                      key={collection.get('name')}
                      label={collection.get('label_singular') || collection.get('label')}
                      onClick={() => this.handleCreatePostClick(collection.get('name'))}
                    />
                  ))}
                </Dropdown>
              )}
              <SettingsDropdown
                displayUrl={displayUrl}
                isTestRepo={isTestRepo}
                imageUrl={user.avatar_url}
                onLogoutClick={onLogoutClick}
              />
            </AppHeaderActions>
          </MobileMenu>
        </AppHeaderContent>
      </AppHeader>
    );
  }
}

const mapDispatchToProps = {
  checkBackendStatus,
};

export default connect(null, mapDispatchToProps)(translate()(Header));