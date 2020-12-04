import React from 'react';
import styles from './SettingsModal.css';
import {Button, Modal, Header} from 'semantic-ui-react';

export default function SettingsModal({open, onClose = () => {}}): JSX.Element {
  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={onClose}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={onClose}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
