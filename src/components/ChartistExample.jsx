import "chartist/dist/chartist.css";
import React from 'react';
import Chartist from 'react-chartist';


const barChartData = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  series: [
    [92332, 93221, 132344, 142334, 83432, 264342, 153544],
    [112332, 123221, 432344, 342334, 133432, 564342, 353544]
  ]
};

const SimpleLineChart = ({ className, title, data, type, options }) => (
  <div className="simple-chart">
    <h3>{title}</h3>
    <Chartist
      data={barChartData}
      type={type}
      options={{
        height: 300,
        axisX: {
          showGrid: false
        },
        axisY: {
          offset: 50,
          scaleMinSpace: 30
        },
        ...options
      }}
    />
  </div>
);

export default SimpleLineChart;