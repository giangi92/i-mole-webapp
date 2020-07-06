import React from 'react';
import { CModal, CModalBody, CModalHeader } from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import { CTooltip } from '@coreui/react';

const bar = {
    labels: ['Tu'],
    datasets: [
      {
        label: 'Salari',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [100000],
      },
      {
        label: 'Tuo salario',
        backgroundColor: 'rgba(27,142,183,0.2)',
        borderColor: 'rgba(27,142,183,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(27,142,183,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [100000],
      }
    ],
  };

  const bar2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options = {
    // tooltips: {
    //   enabled: false,
    //   custom: CTooltip
    // },
    maintainAspectRatio: false
  }

const ChartModal = (props) => {
    console.log("chartMolda", props);
    props.data.map((e)=>{
        bar.labels.push(e.name);
        bar.datasets[0].data.push(Number((Math.random()*50000+3000).toFixed(2)))
    })
    return (

        <div className="animated fadeIn">
            <CModal show={props.show} onClose={props.toggle}>
                <CModalHeader closeButton>
                    Statistica salari dei tuoi dipendendi
                </CModalHeader>
                <CModalBody>
                    Mostra i salari qui con un chart
                    <div className="chart-wrapper">
                        <CChart type="bar" datasets={bar2.datasets} options={options} labels={bar2.labels} />
                    </div>
                </CModalBody>
                <div className="chart-wrapper">
                    <CChart type="bar" datasets={bar2.datasets} options={options} labels={bar2.labels} />
                </div>
            </CModal>
            <div className="chart-wrapper">
                <CChart type="bar" datasets={bar2.datasets} options={options} labels={bar2.labels} />
            </div>
        </div>
    )
}

export default ChartModal;