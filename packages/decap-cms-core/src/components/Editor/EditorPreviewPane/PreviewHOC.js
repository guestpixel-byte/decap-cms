import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

class PreviewHOC extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value || this.props.fieldsMetaData !== nextProps.fieldsMetaData;
  }

  render() {
    const { previewComponent, className, ...props } = this.props;
    return React.createElement(previewComponent, { className, ...props });
  }
}

PreviewHOC.propTypes = {
  previewComponent: PropTypes.func.isRequired,
  value: PropTypes.any,
  fieldsMetaData: PropTypes.object,
};

export default PreviewHOC;