import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';

function isVisible(field) {
  return field.get('widget') !== 'hidden';
}

const PreviewContainer = styled.div`
  font-family: Roboto, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, sans-serif;
`;

/**
 * Use a stateful component so that child components can effectively utilize
 * `shouldComponentUpdate`.
 */
export default class Preview extends React.Component {
  render() {
    const { collection, fields, widgetFor } = this.props;
    if (!collection || !fields) {
      return null;
    }

    return (
      <PreviewContainer>
        {fields.filter(isVisible).map(field => {
          // Dynamically passing classes via widgetFor
          const fieldName = field.get('name');
          const fieldClass = field.get('widget'); // You can modify this to set custom class based on the widget type

          return (
            <div key={fieldName} className={`field-wrapper ${fieldClass}`}>
              {widgetFor(fieldName)}
            </div>
          );
        })}
      </PreviewContainer>
    );
  }
}

Preview.propTypes = {
  collection: ImmutablePropTypes.map.isRequired,
  entry: ImmutablePropTypes.map.isRequired,
  fields: ImmutablePropTypes.list.isRequired,
  getAsset: PropTypes.func.isRequired,
  widgetFor: PropTypes.func.isRequired,
};
