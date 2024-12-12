import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { translate } from 'react-polyglot';
import { NavLink } from 'react-router-dom';
import { Icon, components, colors } from 'decap-cms-ui-default';

import { searchCollections } from '../../actions/collections';
import CollectionSearch from './CollectionSearch';
import NestedCollection from './NestedCollection';

const styles = {
  sidebarNavLinkActive: css`
    color: ${colors.active};
    background-color: ${colors.activeBackground};
    border-left-color: #4863c6;
  `,
};

const SearchContainer = styled.div`
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.hidden {
    display: none;
  }
`;

const SidebarContainer = styled.aside`
  ${components.card};
  width: 250px;
  padding: 8px 0 12px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;

  &.collapsed {
    width: 60px;

    h2, ul {
      display: none;
    }

    ${SearchContainer} {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

const SidebarHeading = styled.h2`
  font-size: 22px;
  font-weight: 600;
  line-height: 37px;
  padding: 0;
  margin: 10px 20px;
  color: ${colors.textLead};
`;

const CollapseButton = styled.button`
  align-self: flex-end;
  margin-right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${colors.textLead};
`;

const SidebarNavList = styled.ul`
  margin: 12px 0 0;
  list-style: none;
  overflow: auto;
`;

const SidebarNavLink = styled(NavLink)`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  align-items: center;
  padding: 8px 18px;
  border-left: 2px solid #fff;
  z-index: -1;

  ${Icon} {
    margin-right: 4px;
    flex-shrink: 0;
  }

  ${props => css`
    &:hover,
    &:active,
    &.${props.activeClassName} {
      ${styles.sidebarNavLinkActive};
    }
  `};
`;

export class Sidebar extends React.Component {
  static propTypes = {
    collections: ImmutablePropTypes.map.isRequired,
    collection: ImmutablePropTypes.map,
    isSearchEnabled: PropTypes.bool,
    searchTerm: PropTypes.string,
    filterTerm: PropTypes.string,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: window.innerWidth < 768, // Collapse if screen width is less than 768px
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const shouldCollapse = window.innerWidth < 768;
    if (shouldCollapse !== this.state.isCollapsed) {
      this.setState({ isCollapsed: shouldCollapse });
    }
  };

  toggleCollapse = () => {
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  };

  renderLink = (collection, filterTerm) => {
    const collectionName = collection.get('name');
    if (collection.has('nested')) {
      return (
        <li key={collectionName}>
          <NestedCollection
            collection={collection}
            filterTerm={filterTerm}
            data-testid={collectionName}
          />
        </li>
      );
    }
    return (
      <li key={collectionName}>
        <SidebarNavLink
          to={`/collections/${collectionName}`}
          activeClassName="sidebar-active"
          data-testid={collectionName}
        >
          <Icon type="write" />
          {collection.get('label')}
        </SidebarNavLink>
      </li>
    );
  };

  render() {
    const { collections, collection, isSearchEnabled, searchTerm, t, filterTerm } = this.props;
    const { isCollapsed } = this.state;

    return (
      <SidebarContainer className={isCollapsed ? 'collapsed' : ''}>
        <CollapseButton onClick={this.toggleCollapse}>
          {isCollapsed ? '→' : '←'}
        </CollapseButton>
        <SidebarHeading>{t('collection.sidebar.collections')}</SidebarHeading>
        <SearchContainer className={isCollapsed ? 'hidden' : ''}>
          {isSearchEnabled && (
            <CollectionSearch
              searchTerm={searchTerm}
              collections={collections}
              collection={collection}
              onSubmit={(query, collection) => searchCollections(query, collection)}
            />
          )}
        </SearchContainer>
        <SidebarNavList>
          {collections
            .toList()
            .filter(collection => collection.get('hide') !== true)
            .map(collection => this.renderLink(collection, filterTerm))}
        </SidebarNavList>
      </SidebarContainer>
    );
  }
}

export default translate()(Sidebar);
