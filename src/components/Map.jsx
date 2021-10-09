import React, { useEffect } from 'react';

const Map = ({ ros, connected }) => {
  useEffect(() => {
    const viewMap = () => {
      var viewer = new window.ROS2D.Viewer({
        divID: 'nav',
        width: 640,
        height: 480,
      });

      var navClient = new window.NAV2D.OccupancyGridClientNav({
        ros: ros,
        rootObject: viewer.scene,
        viewer: viewer,
        withOrientation: true,
      });
      console.log(viewer);
      console.log(navClient);
    };

    if (connected) {
      viewMap();
    }
  }, [ros, connected]);

  return (
    <>
      <h4 className="mt-4">Map</h4>
      <div id="nav"></div>
    </>
  );
};

export default Map;
