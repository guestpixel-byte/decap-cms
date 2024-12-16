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
    const { entry, collection, config } = this.props;

    if (!entry || !entry.get('data')) {
      return null;
    }

    const previewComponent =
      getPreviewTemplate(collection.get('name')) || (() => <div>No Preview Template</div>);

    const previewProps = {
      ...this.props,
      entry,
      document: null,
      window: null,
    };

    const styleEls = getPreviewStyles().map((style, i) => {
      if (style.raw) {
        return <style key={i}>{style.value}</style>;
      }
      return <link key={i} href={style.value} type="text/css" rel="stylesheet" />;
    });

    const initialContent = `
<!DOCTYPE html>
<html>
  <head><base target="_blank"/></head>
  <body><div></div></body>
</html>
`;

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
};

export default connect(state => ({ config: state.config }))(PreviewPane);
