import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import _ from 'lodash';

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);

function MarketPage() {
  const [data, setData] = useState([]);
  const [areaTypeData, setAreaTypeData] = useState(null);
  const [bathData, setBathData] = useState(null);
  const [bedroomData, setBedroomData] = useState(null);
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    Papa.parse('/Bengaluru_House_Data.csv', {
      download: true,
      header: true,
      complete: function(results) {
        setData(results.data);

        // Calculate the data for the pie chart
        const areaTypes = results.data.reduce((acc, row) => {
          acc[row.area_type] = (acc[row.area_type] || 0) + 1;
          return acc;
        }, {});

        setAreaTypeData({
          labels: Object.keys(areaTypes),
          datasets: [{
            data: Object.values(areaTypes),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        });

        // Calculate the data for the bar chart
        const baths = results.data.reduce((acc, row) => {
          acc[row.bath] = (acc[row.bath] || 0) + 1;
          return acc;
        }, {});

        setBathData({
          labels: Object.keys(baths),
          datasets: [{
            label: '# of Properties',
            data: Object.values(baths),
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.7)',
            hoverBorderColor: 'rgba(75,192,192,1)'
          }]
        });

        // Calculate the data for the bedroom distribution
        const bedrooms = results.data.reduce((acc, row) => {
          acc[row.size] = (acc[row.size] || 0) + 1;
          return acc;
        }, {});

        setBedroomData({
          labels: Object.keys(bedrooms),
          datasets: [{
            label: '# of Properties',
            data: Object.values(bedrooms),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)',
            hoverBorderColor: 'rgba(153, 102, 255, 1)'
          }]
        });

        // Calculate the data for the price distribution
        const prices = _.chain(results.data)
          .map(row => parseFloat(row.price))
          .reject(_.isNaN)
          .groupBy(price => Math.floor(price / 10))
          .mapValues(group => group.length)
          .value();

        setPriceData({
          labels: Object.keys(prices).map(key => `${key * 10} - ${(parseInt(key) + 1) * 10}`),
          datasets: [{
            label: '# of Properties',
            data: Object.values(prices),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
            hoverBorderColor: 'rgba(255, 99, 132, 1)'
          }]
        });
      }
    });
  }, []);

  if (!areaTypeData || !bathData || !bedroomData || !priceData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Market Insights</h1>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
        <div>
          <h2>Area Type Distribution</h2>
          <Pie data={areaTypeData} options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: true,
                position: 'right'
              }
            }
          }} />
        </div>
        <div>
          <h2>Bath Distribution</h2>
          <Bar data={bathData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
        <div>
          <h2>Bedroom Distribution</h2>
          <Bar data={bedroomData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
        <div>
          <h2>Price Distribution</h2>
          <Bar data={priceData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>
    </div>
  );
}

export default MarketPage;