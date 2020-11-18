import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Bar} from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(() => ({
  root: {}
}));

const Sales = ({className, ...rest}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [date, setDate] = React.useState(7);
  const [graphdata, setGraphdata] = React.useState({
    'accept': [18, 5, 19, 27, 29, 19, 20],
    'decline': [11, 20, 12, 29, 30, 25, 13],
    'labels': ['1 Set', '2 Set', '3 Set', '4 Set', '5 Set', '6 Set', '7 Set'],
    "barThickness": 12,
    "maxBarThickness": 10,
  });


  const data = {
    datasets: [
      {
        backgroundColor: "#E2645A",
        data: graphdata.accept,
        label: 'Vendas aceitas'
      },
      {
        backgroundColor: colors.grey[200],
        data: graphdata.decline,
        label: 'Vendas recusadas'
      }
    ],
    labels: graphdata.labels
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: {padding: 0},
    legend: {display: false},
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: graphdata.barThickness,
          maxBarThickness: graphdata.maxBarThickness,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  const handleChange = (event) => {
    setDate(event.target.value);
    switch (event.target.value) {
      case 7:
        setGraphdata({
          'accept': [18, 5, 19, 27, 29, 19, 20],
          'decline': [11, 20, 12, 29, 30, 25, 13],
          'labels': ['1 Set', '2 Set', '3 Set', '4 Set', '5 Set', '6 Set', '7 Set'],
          "barThickness": 12,
          "maxBarThickness": 10,
        })
        break;
      case 30:
        setGraphdata({
          'accept': [120],
          'decline': [92],
          'labels': ['Set'],
          "barThickness": 50,
          "maxBarThickness": 50,
        })
        break;
      case 1:
        setGraphdata({
          'accept': [3],
          'decline': [1],
          'labels': ['Hoje'],
          "barThickness": 50,
          "maxBarThickness": 50,
        })
        break;
    }
  };
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <>
            {/*<InputLabel id="demo-simple-select-label">Age</InputLabel>*/}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={date}
              onChange={handleChange}
            >
              <MenuItem value={7}>Ultimos 7 dias</MenuItem>
              <MenuItem value={30}>Ultimo mes</MenuItem>
              <MenuItem value={1}>Hoje</MenuItem>
            </Select>
          </>
        )}
        title="Vendas"
      />
      <Divider/>
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;
