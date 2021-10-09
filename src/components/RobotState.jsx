import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import * as Three from 'three';
import Config from '../scripts/config';

const RobotState = ({ ros, connected }) => {
  const [robotPose, setRobotPose] = useState({
    x: 0,
    y: 0,
    orientation: 0,
  });
  const [robotVelocities, setRobotVelocities] = useState({
    linearVelocity: 0,
    angularVelocity: 0,
  });

  useEffect(() => {
    let poseSubscriber = null;
    let velocitySubscriber = null;

    const getOrientationFromQuaternion = (rosOrientationQuaternion) => {
      const q = new Three.Quaternion(
        rosOrientationQuaternion.x,
        rosOrientationQuaternion.y,
        rosOrientationQuaternion.z,
        rosOrientationQuaternion.w
      );
      const rpy = new Three.Euler().setFromQuaternion(q);

      return rpy['_z'] * (180 / Math.PI);
    };

    if (connected) {
      poseSubscriber = new window.ROSLIB.Topic({
        ros: ros,
        name: Config.POSE_TOPIC,
        messageType: 'geometry_msgs/msg/PoseWithCovarianceStamped',
      });
      velocitySubscriber = new window.ROSLIB.Topic({
        ros: ros,
        name: Config.ODOM_TOPIC,
        messageType: 'nav_msgs/msg/Odometry',
      });

      poseSubscriber.subscribe((message) =>
        setRobotPose({
          x: message.pose.pose.position.x,
          y: message.pose.pose.position.y,
          orientation: getOrientationFromQuaternion(
            message.pose.pose.orientation
          ),
        })
      );
      velocitySubscriber.subscribe((message) =>
        setRobotVelocities({
          linearVelocity: message.twist.twist.linear.x,
          angularVelocity: message.twist.twist.angular.z,
        })
      );
      return () => {
        poseSubscriber.unsubscribe((message) =>
          setRobotPose({
            x: message.pose.pose.position.x,
            y: message.pose.pose.position.y,
            orientation: getOrientationFromQuaternion(
              message.pose.pose.orientation
            ),
          })
        );
        velocitySubscriber.unsubscribe((message) =>
          setRobotVelocities({
            linearVelocity: message.twist.twist.linear.x,
            angularVelocity: message.twist.twist.angular.z,
          })
        );
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, ros]);

  return (
    <div>
      <Row>
        <Col>
          <h4 className="mt-4">Position</h4>
          <p>x: {robotPose.x.toFixed(2)}</p>
          <p>y: {robotPose.y.toFixed(2)}</p>
          <p>orientation: {robotPose.orientation.toFixed(2)}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="mt-4">Velocites</h4>
          <p>Linear Velocity: {robotVelocities.linearVelocity.toFixed(2)}</p>
          <p>Angular Velocity: {robotVelocities.angularVelocity.toFixed(2)}</p>
        </Col>
      </Row>
    </div>
  );
};

export default RobotState;
