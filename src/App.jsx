import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';

const greeting = () => {
  return (
    <div>
      <Alert bsStyle="info">
        Hello from React Bootstrap
      </Alert>
    </div>
  );
};

export default greeting;