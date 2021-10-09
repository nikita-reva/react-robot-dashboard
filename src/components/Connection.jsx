import { Alert } from 'react-bootstrap';

const Connection = ({ ros, connected }) => {
  return (
    <div>
      <Alert
        className="text-center m-3"
        variant={connected ? 'success' : 'danger'}
      >
        {connected ? 'Robot Connected' : 'Robot Disconnected'}
      </Alert>
    </div>
  );
};

export default Connection;
