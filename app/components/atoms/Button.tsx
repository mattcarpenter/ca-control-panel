import React from 'react';
import { Button as SemanticButton } from 'semantic-ui-react';

export default function Button({ text, onClick }): JSX.Element {
  return <SemanticButton onClick={onClick} size="huge" className="primary">{text}</SemanticButton>;
}
