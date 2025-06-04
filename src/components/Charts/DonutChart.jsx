import React from 'react';
import Chart from 'react-apexcharts';

function DonutChart({categories, colors, series}) {
  const options = {
    chart: {
      type: 'donut',
    },
    labels: categories, // Labels for each section
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
    plotOptions: {
      pie: {
        donut: {
          size: '60%', // Adjusts the donut size
        },
        expandOnClick: false, // Disable expand on click
      },
    },
    dataLabels: {
      enabled: true, // Enable data labels
      
    },
    legend: {
      position: 'bottom', // Position the category text at the bottom
      horizontalAlign: 'center', // Center the labels horizontally
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val) => {
          return `${val} Submissions`; // Customize tooltip text
        },
      },
    },
  };
 // Data values for each category (e.g., sales, users, etc.)

  return (
      <Chart options={options} series={series} type="donut" height="100%" />
  );
  }
  
export default DonutChart;