import React from 'react';
import styled from '@emotion/styled';
import { lengths } from 'decap-cms-ui-default';

import ViewStyleControl from './ViewStyleControl';
import SortControl from './SortControl';
import FilterControl from './FilterControl';
import GroupControl from './GroupControl';

const CollectionControlsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  margin: 0 1rem;
  
  max-width: 100%;

  & > div {
    margin-left: 6px;
  }
`;

function CollectionControls({
  viewStyle,
  onChangeViewStyle,
  sortableFields,
  onSortClick,
  sort,
  viewFilters,
  viewGroups,
  onFilterClick,
  onGroupClick,
  t,
  filter,
  group,
}) {
  return (
    <CollectionControlsContainer>
      <ViewStyleControl viewStyle={viewStyle} onChangeViewStyle={onChangeViewStyle} />
      {viewGroups.length > 0 && (
        <GroupControl viewGroups={viewGroups} onGroupClick={onGroupClick} t={t} group={group} />
      )}
      {viewFilters.length > 0 && (
        <FilterControl
          viewFilters={viewFilters}
          onFilterClick={onFilterClick}
          t={t}
          filter={filter}
        />
      )}
      {sortableFields.length > 0 && (
        <SortControl fields={sortableFields} sort={sort} onSortClick={onSortClick} />
      )}
    </CollectionControlsContainer>
  );
}

export default CollectionControls;
