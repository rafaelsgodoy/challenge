import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Doughnut} from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import {usePromise} from "promise-hook";
import Mock from "../../../api/mock";
import {Skeleton} from "@material-ui/lab";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(() => ({
  root: {
    // height: '100%'
  }
}));

const EventsByType = ({className, ...rest}) => {
  const classes = useStyles();
  const theme = useTheme();
  const {isLoading, data, error} = usePromise(Mock.getWeddingsGroupByType, {resolve: true});
  const [date, setDate] = React.useState(1);

  const [graphdata, setGraphdata] = React.useState({
    "moderno": {
      "value": 282,
      "label": "Moderno"
    },
    "classico": {
      "value": 2221,
      "label": "Clássico"
    },
    "rustico": {
      "value": 1258,
      "label": "Rustico"
    }
  });

  const handleChange = (event) => {
    setDate(event.target.value);
    switch (event.target.value) {
      case 1:
        setGraphdata({
          "moderno": {
            "value": 282,
            "label": "Moderno"
          },
          "classico": {
            "value": 2221,
            "label": "Clássico"
          },
          "rustico": {
            "value": 1258,
            "label": "Rustico"
          }
        })
        break;
      case 7:
        setGraphdata({
          "moderno": {
            "value": 12,
            "label": "Moderno"
          },
          "classico": {
            "value": 25,
            "label": "Clássico"
          },
          "rustico": {
            "value": 9,
            "label": "Rustico"
          }
        })
        break;
      case 30:
        setGraphdata({
          "moderno": {
            "value": 26,
            "label": "Moderno"
          },
          "classico": {
            "value": 32,
            "label": "Clássico"
          },
          "rustico": {
            "value": 18,
            "label": "Rustico"
          }
        })
        break;
    }

  };

  // const data2 = {
  //   datasets: [
  //     {
  //       data: [data.rustico.length, 15, 22],
  //       backgroundColor: [
  //         '#E2645A',
  //         '#86D0CB',
  //         '#84B8E2'
  //       ],
  //       borderWidth: 8,
  //       borderColor: colors.common.white,
  //       hoverBorderColor: colors.common.white
  //     }
  //   ],
  //   labels: ['Desktop', 'Tablet', 'Mobile']
  // };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: {padding: 0},
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const devices = [
    {
      title: 'Rustico',
      value: 63,
      icon: LaptopMacIcon,
      color: '#E2645A'

    },
    {
      title: 'Clássico',
      value: 15,
      icon: TabletIcon,
      color: '#86D0CB'
    },
    {
      title: 'Moderno',
      value: 23,
      icon: PhoneIcon,
      color: '#84B8E2'
    }
  ];

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
              <MenuItem value={1}>Desde o ínico</MenuItem>
            </Select>
          </>
        )}
        title="Eventos por tipo"/>
      <Divider/>
      {isLoading ?
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}>
          <Skeleton style={{
            marginTop: "20px"
          }} variant="circle" width={280} height={280}/>
          <br/>
          <Skeleton width="80%"/>
          <Skeleton width="80%"/>
        </div>

        :
        <CardContent>
          <Box
            height={300}
            position="relative"
          >
            <Doughnut
              data={{
                datasets: [
                  {
                    data: [graphdata.rustico.value, graphdata.classico.value, graphdata.moderno.value],
                    backgroundColor: [
                      '#E2645A',
                      '#86D0CB',
                      '#84B8E2'
                    ],
                    borderWidth: 8,
                    borderColor: colors.common.white,
                    hoverBorderColor: colors.common.white
                  }
                ],
                labels: ['Rustico', 'Classico', 'Moderno']
              }}
              options={options}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            mt={2}
          >
            {[
              {
                title: 'Rustico',
                value: graphdata.rustico.value,
                icon: LaptopMacIcon,
                color: '#E2645A'

              },
              {
                title: 'Clássico',
                value: graphdata.classico.value,
                icon: TabletIcon,
                color: '#86D0CB'
              },
              {
                title: 'Moderno',
                value: graphdata.moderno.value,
                icon: PhoneIcon,
                color: '#84B8E2'
              }
            ].map(({
                     color,
                     icon: Icon,
                     title,
                     value
                   }) => (
              <Box
                key={title}
                p={1}
                textAlign="center"
              >
                <Icon color="action"/>
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {title}
                </Typography>
                <Typography
                  style={{color}}
                  variant="h2"
                >
                  {value}

                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      }
    </Card>
  );
};

EventsByType.propTypes = {
  className: PropTypes.string
};

export default EventsByType;
