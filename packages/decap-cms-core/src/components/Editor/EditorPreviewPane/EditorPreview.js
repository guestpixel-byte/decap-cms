import React from 'react';
import PropTypes from 'prop-types';

function EditorPreview({ entry }) {
  const data = entry.get('data').toJS();
  return (
    <div>
      <h1>{data.title || 'No Title'}</h1>
      <p>{data.body || 'No Content'}</p>
    </div>
  );
}

EditorPreview.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default EditorPreview;
