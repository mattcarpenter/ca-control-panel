import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form } from 'semantic-ui-react';
import RendererProcessBridge from '../../lib/rendererProcessBridge';
import {
  selectAlbumArtDirectory,
  selectApiBasePath,
  selectPickedAlbumArtDirectory,
  selectStreamingEncoderIp,
  selectStreamingEncoderPort,
  setReduxAlbumArtDirectory,
  setReduxApiBasePath,
  setReduxStreamingEncoderIp,
  setReduxStreamingEncoderPort,
} from '../../controlPanelSlice';

export default function SettingsModal({
  open,
  onClose = () => {},
}): JSX.Element {
  const bridge = RendererProcessBridge.getInstance();
  const pickedAlbumArtDirectory = useSelector(selectPickedAlbumArtDirectory);
  const reduxAlbumArtDirectory = useSelector(selectAlbumArtDirectory);
  const reduxApiBasePath = useSelector(selectApiBasePath);
  const reduxStreamingEncoderIp = useSelector(selectStreamingEncoderIp);
  const reduxStreamingEncoderPort = useSelector(selectStreamingEncoderPort);
  const dispatch = useDispatch();

  const [albumArtDirectory, setAlbumArtDirectory] = useState<string>(
    reduxAlbumArtDirectory
  );
  const [apiBasePath, setApiBasePath] = useState<string>(reduxApiBasePath);
  const [streamingEncoderIp, setStreamingEncoderIp] = useState<string>(
    reduxStreamingEncoderIp
  );
  const [streamingEncoderPort, setStreamingEncoderPort] = useState<string>(
    reduxStreamingEncoderPort
  );

  useEffect(() => {
    setAlbumArtDirectory(pickedAlbumArtDirectory);
  }, [pickedAlbumArtDirectory]);

  useEffect(() => {
    setAlbumArtDirectory(reduxAlbumArtDirectory);
    setApiBasePath(reduxApiBasePath);
    setStreamingEncoderPort(reduxStreamingEncoderPort);
    setStreamingEncoderIp(reduxStreamingEncoderIp);
  }, [open]);

  function handleSave() {
    // Store local component state in Redux store
    dispatch(setReduxStreamingEncoderPort(streamingEncoderPort));
    dispatch(setReduxStreamingEncoderIp(streamingEncoderIp));
    dispatch(setReduxApiBasePath(apiBasePath));
    dispatch(setReduxAlbumArtDirectory(albumArtDirectory));

    // Send configuration values to the main thread
    bridge.storeSettings();

    onClose();
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Header>Settings</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Website API Base URL</label>
              <input
                placeholder="https://example.com/api/v1/"
                value={apiBasePath}
                onChange={(event) => setApiBasePath(event.target.value)}
              />
            </Form.Field>
            <Form.Group inline>
              <Form.Field>
                <label>Streaming Encoder IP Address</label>
                <input
                  placeholder="128.0.0.1"
                  value={streamingEncoderIp}
                  onChange={(event) =>
                    setStreamingEncoderIp(event.target.value)
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Streaming Encoder Port</label>
                <input
                  placeholder="9000"
                  value={streamingEncoderPort}
                  onChange={(event) =>
                    setStreamingEncoderPort(event.target.value)
                  }
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Album Art Directory</label>
              <input
                value={albumArtDirectory}
                onChange={(event) => setAlbumArtDirectory(event.target.value)}
              />
            </Form.Field>
            <Form.Field
              control={Button}
              content="Choose Directory..."
              onClick={() => bridge.launchDirectoryPicker()}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={onClose}>
          Cancel
        </Button>
        <Button
          content="Save"
          labelPosition="right"
          icon="save"
          onClick={handleSave}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
