import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form } from 'semantic-ui-react';
import RendererProcessBridge from '../../lib/rendererProcessBridge';
import {
  selectAlbumArtDirectory,
  selectAlbumCSVFile,
} from '../../controlPanelSlice';

const rendererProcessBridge = RendererProcessBridge.getInstance();

export default function SettingsModal({
  open,
  onClose = () => {},
}): JSX.Element {
  const bridge = RendererProcessBridge.getInstance();

  const reduxAlbumArtDirectory = useSelector(selectAlbumArtDirectory);
  const reduxAlbumCSVFile = useSelector(selectAlbumCSVFile);

  const [albumArtDirectory, setAlbumArtDirectory] = useState<string>('');
  const [albumCSVFile, setAlbumCSVFile] = useState<string>('');
  const [apiBasePath, setApiBasePath] = useState<string>('');
  const [streamingEncoderIp, setStreamingEncoderIp] = useState<string>('');
  const [streamingEncoderPort, setStreamingEncoderPort] = useState<string>('');
  const [apiUsername, setApiUsername] = useState<string>('');
  const [apiPassword, setApiPassword] = useState<string>('');

  useEffect(() => {
    async function load() {
      const settings = await rendererProcessBridge.getSettings();
      console.log(settings);
      setAlbumArtDirectory(settings.albumArtDirectory);
      setAlbumCSVFile(settings.albumCSVFile);
      setApiBasePath(settings.apiBasePath);
      setStreamingEncoderIp(settings.streamingEncoderIp);
      setStreamingEncoderPort(settings.streamingEncoderPort);
      setApiUsername(settings.apiUsername);
      setApiPassword(settings.apiPassword);
    }
    if (open) {
      load();
    }
  }, [open]);

  useEffect(() => {
    if (reduxAlbumArtDirectory) {
      setAlbumArtDirectory(reduxAlbumArtDirectory);
    }
    if (reduxAlbumCSVFile) {
      setAlbumCSVFile(reduxAlbumCSVFile);
    }
  }, [reduxAlbumCSVFile, reduxAlbumArtDirectory]);

  function handleSave() {
    // Send configuration values to the main thread
    bridge.storeSettings({
      albumArtDirectory,
      albumCSVFile,
      apiBasePath,
      streamingEncoderIp,
      streamingEncoderPort,
      apiUsername,
      apiPassword,
    });

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
                <label>Website API Username</label>
                <input
                  placeholder=""
                  value={apiUsername}
                  onChange={(event) =>
                    setApiUsername(event.target.value)
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Website API Password</label>
                <input
                  type="password"
                  placeholder=""
                  value={apiPassword}
                  onChange={(event) =>
                    setApiPassword(event.target.value)
                  }
                />
              </Form.Field>
            </Form.Group>

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
            <Form.Field>
              <label>Album Name CSV File</label>
              <input
                value={albumCSVFile}
                onChange={(event) => setAlbumCSVFile(event.target.value)}
              />
            </Form.Field>
            <Form.Field
              control={Button}
              content="Choose File..."
              onClick={() => bridge.launchFilePicker()}
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
