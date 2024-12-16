import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { lengths } from 'decap-cms-ui-default';
import { connect } from 'react-redux';

import { getPreviewTemplate, getPreviewStyles } from '../../../lib/registry';
import EditorPreviewContent from './EditorPreviewContent.js';

const PreviewPaneFrame = styled(Frame)`
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
  border-radius: ${lengths.borderRadius};
`;

export class PreviewPane extends React.Component {
  render() {
    const { entry, collection, config, widgetsFor } = this.props;

    // Ensure the entry data exists
    if (!entry || !entry.get('data')) {
      return null;
    }

    // Fetch the preview template for the collection
    const collectionName = collection.get('name');
    const previewComponent =
      getPreviewTemplate(collectionName) || (() => <div>No Preview Template Found</div>);

    console.log("Collection Name:", collectionName);
    console.log("Preview Component:", previewComponent);

    // Define the props to pass to the preview component
    const previewProps = {
      ...this.props,
      widgetFor: name => {
        if (typeof widgetsFor === 'function') {
          return widgetsFor(name);
        }
        console.warn(`widgetFor is not a function for name: ${name}`);
        return null; // Fallback for missing widgetsFor
      },
      entry,
      document: null,
      window: null,
    };

    // Retrieve the preview styles
    const styleEls = getPreviewStyles().map((style, i) => {
      if (style.raw) {
        return <style key={i}>{style.value}</style>;
      }
      return <link key={i} href={style.value} type="text/css" rel="stylesheet" />;
    });

    // Define initial content for the iframe
    const initialContent = `
<!DOCTYPE html>
<html>
  <head><base target="_blank"/></head>
  <body><div></div></body>
</html>
`;

    // Render the preview pane
    return (
      <PreviewPaneFrame id="preview-pane" head={styleEls} initialContent={initialContent}>
        <FrameContextConsumer>
          {({ document, window }) => (
            <EditorPreviewContent
              previewComponent={previewComponent}
              previewProps={{ ...previewProps, document, window }}
            />
          )}
        </FrameContextConsumer>
      </PreviewPaneFrame>
    );
  }
}

PreviewPane.propTypes = {
  entry: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  config: PropTypes.object,
  widgetsFor: PropTypes.func.isRequired,
};

export default connect(state => ({
  config: state.config,
  widgetsFor: state.widgetsFor, // Ensure widgetsFor is passed from Redux
}))(PreviewPane);
