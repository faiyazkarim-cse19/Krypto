import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import Axios from 'axios';

const { Title } = Typography;

const LineChart = ({ timeperiod, currentPrice, coinName }) => {

  const [currentChange, setCurrentChange] = useState()
  var coinPrice = [];
  var coinTimestamp = [];

  const options1 = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history',
    params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: timeperiod},
    headers: {
      'X-RapidAPI-Key': 'f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85',
      'X-RapidAPI-Host': 'coinranking1.p.raoidapi.com'
    }
  };
  
  Axios.request(options1).then(function (response) {
    console.log(response.data);
    setCurrentChange(response.data.data.change);
  }).catch(function (error) {
    console.error(error);
  });


  if(coinName == 'Bitcoin'){
  if(timeperiod == '5y'){
    coinPrice = [16703.6174033443, 47217.186572366794, 8511.124445378433,10356.074165285912 , 6566.131359962222, 16536.517111177618];
    coinTimestamp = ['11/20/2022', '12/31/2021', '11/16/2019','9/11/2020' , '10/12/2018', '12/16/2017'];
  }

  if(timeperiod == '24h')
  {
    coinPrice = [16650.08663928037, 16662.435343500325, 16635.26808607105, 16641.225456705015, 16657.362264022548, 16636.517111177618];
    coinTimestamp = ['11/20/2022', '11/20/2022', '11/20/2022','11/20/2022' , '11/19/2022', '11/19/2022'];
  }

  if(timeperiod == '7d'){
    coinPrice = [16634.542871808004, 16713.982412179263, 16789.313592665167, 16894.684591654575, 15983.128384738267, 16859.74780162301];
    coinTimestamp = ['11/20/2022', '11/19/2022', '11/18/2022','11/17/2022' , '11/16/2022', '11/15/2022'];
  }

  if(timeperiod == '1y'){
    coinPrice = [16703.61740334436, 23942.23096058992, 37783.352269722054, 36228.24633111452, 50513.32431184398, 57043.25195860558];
    coinTimestamp = ['11/20/2022', '9/20/2022', '7/20/2022','5/20/2022' , '3/19/2022', '1/19/2022'];
  }

  }
  
 
 /* const checktime = () => {
    Axios.post ('http://localhost:3001/postinfo', {
     name: coinName,
     choice: timeperiod,
    }).then((response) => {
        if(response.data.message)
        {
            alert(response.data.message);
        }
        else
        {  
           for(let i=0; i<response.data.length; i+=1)
           {
            coinPrice[i]=response.data[i].price;
            coinTimestamp[i]=response.data[i].time;
           }
        }
    });
 }
  checktime();*/
 
    //console.log(coinPrice);

  

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {currentChange}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;