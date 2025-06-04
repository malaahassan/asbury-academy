import {React, useContext } from 'react';
import Chart from 'react-apexcharts';

function LineGraph({categories, colors, series}) {
    const options = {
        chart: {
          id: 'line-chart',
          toolbar: { show: false },
        },
        tooltip: {
          enabled: true,
          
        },
        
        xaxis: {
          categories: categories, // Months
          title: {
            style: {
              fontSize: '14px',
            },
          },
        },
        yaxis: {
          title: {
            style: {
              fontSize: '14px',
            },
          },
        },
        stroke: {
          connectNulls: true,
          curve: 'smooth', // Optional: for smooth curves in the line graph
        },
        colors: colors,
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                height: 250,
              },
            },
          },
        ],
      };
    
    
      return (
          <Chart options={options} series={series} type="line" height="100%" />
      );
  }
  
export default LineGraph;