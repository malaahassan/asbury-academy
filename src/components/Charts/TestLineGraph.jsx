import {React, useContext } from 'react';
import Chart from 'react-apexcharts';

function TestLineGraph({categories, colors, series}) {
    const options = {
        chart: {
          id: 'line-chart',
          toolbar: { show: false },
        },
        tooltip: {
          enabled: true,
          x: {
            formatter: (value, { dataPointIndex, seriesIndex }) => `${series[seriesIndex].alts[dataPointIndex]}`
          },
          y: {
            formatter: (value, { dataPointIndex, seriesIndex }) => {
              // Check if the series and data point exist in the array
              if (series[seriesIndex].scores?.[dataPointIndex]) {
                  return `${series[seriesIndex].scores[dataPointIndex]} — ${value}%`; // Show
              }
              /*if(!series.some(dis => dis.scores[dataPointIndex])){
                  return null;
              }*/
              return undefined; // Hide the tooltip value
            }
          },
          
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
          labels: {
            formatter: (value) => `${value}%` // Add percentage to Y-axis labels
          },
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
  
export default TestLineGraph;