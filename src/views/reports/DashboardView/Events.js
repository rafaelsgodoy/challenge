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

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import {usePromise} from "promise-hook";
import Mock from "../../../api/mock";

const useStyles = makeStyles(() => ({
  root: {}
}));

const Events = ({className, ...rest}) => {
  const classes = useStyles();
  const theme = useTheme();
  const {isLoading, data, error} = usePromise(Mock.getEvents, {
    resolve: true,
  });

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Eventos"
      />
      <Divider/>
      <CardContent>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={data}
          locale={'pt-br'}
          buttonText={{
            today: 'Hoje',
          }}
        />
      </CardContent>
      <Divider/>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >

      </Box>
    </Card>
  )
    ;
};

Events.propTypes = {
  className: PropTypes.string
};

export default Events;
