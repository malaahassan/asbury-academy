import React from 'react';
import Chart from 'react-apexcharts';

function BarChart({categories, colors, series}) {
  const options = {
    chart: {
      type: 'bar', // Bar chart
      toolbar: { show: false }
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}%` // Add percentage to Y-axis labels
      }
    },
    xaxis: {
      categories: categories, // X-axis labels
    },
    colors: colors, // Bar colors
    plotOptions: {
      bar: {
        horizontal: false, // Vertical bars
        columnWidth: '50%', // Width of bars
        endingShape: 'rounded', // Rounded edges for bars
      },
    },
    dataLabels: {
      enabled: false, // Disable numbers on top of bars
    },
    legend: {
      position: 'bottom', // Legend position
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
      
    }
  };
 // Data values for each category (e.g., sales, users, etc.)

  return (
      <Chart options={options} series={series} type="bar" height="100%" />
  );
  }
  
export default BarChart;