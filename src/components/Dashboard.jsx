import React from 'react';
import Connection from './Connection';
import Teleoperation from './Teleoperation';
import { Row, Col, Container } from 'react-bootstrap';
import { useRosConnection } from '../ros/rosService';
import RobotState from './RobotState';
import Map from './Map';

const Dashboard = () => {
  const [ros, connected] = useRosConnection();

  return (
    <Container>
      <h3 className="text-center mt-3">Robot Control Dashboard</h3>
      <Row>
        <Col>
          <Connection ros={ros} connected={connected} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Teleoperation ros={ros} />
          <RobotState ros={ros} connected={connected} />
        </Col>
        <Col>
          <Map ros={ros} connected={connected} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
