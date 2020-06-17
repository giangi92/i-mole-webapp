import React from 'react';
import { CCard, CCardBody, CCardHeader} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

/** ELEMENTI PER LA LINE-CHART */
const line = {
    
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options = {
    tooltips: {
      enabled: false
    },
    maintainAspectRatio: false
  }

const LineChart = () => {
    return (
        <div className="animated fadeIn max-dimensions-medium">
            <CCard>
              <CCardHeader>
                Line Chart
                <div className="card-header-actions">
                  <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CCardHeader>
              <CCardBody>
                {/* <div className="chart-wrapper"> */}
                  <CChartLine type="line" datasets={line.datasets} labels= {['January', 'February', 'March', 'April', 'May', 'June', 'July']} options={options} />
                {/* </div> */}
              </CCardBody>
            </CCard>
        </div>
    )
}

export default LineChart;