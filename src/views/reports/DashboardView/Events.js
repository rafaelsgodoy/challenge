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
  colors,
  Dialog,
  DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Chip, TableCell, Grid, Container
} from '@material-ui/core';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import {usePromise} from "promise-hook";
import Mock from "../../../api/mock";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {}
}));

const Events = ({className, ...rest}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [event, setEvent] = React.useState(null);

  const {isLoading, data, error} = usePromise(Mock.getEvents, {
    resolve: true,
  });

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
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
            eventClick={(e) => {

              Mock.getWeddings({ID: e.event._def.extendedProps.data.WEDDING_ID}).then((res) => {
                setOpen(true)
                setEvent({
                  ...e.event._def.extendedProps.data,
                  ...res[0]
                })
              })
            }}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onEnter={() => {
          console.log(event)
        }}
      >
        <DialogTitle id="alert-dialog-title">{event?.VENDOR_CATEGORY.replace(/-/g, " ").toUpperCase()}</DialogTitle>
        <DialogContent>

          <Grid
            container
            spacing={2}
          >
            <Grid
              md={12}
              item>
              <b> Status: </b><Chip
              color="primary"
              label={event?.STATUS}
              size="small"
            />
            </Grid>
            <Grid item>
              <b>Orçamento:</b> {event?.BUDGET.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Grid>

            <Grid item>
              <b>Número de convidados:</b> {event?.NUMBER_OF_GUESTS}
            </Grid>

            <Grid item>
              <b>Data:</b> {moment(event?.WEDDING_DATE).format('DD/MM/YYYY')}
            </Grid>
            <Grid item>
              <b>Vendedor: </b> {event?.VENDOR_ID}
            </Grid>
            <Grid item>
              <b> Cliente:</b> {event?.OWNER_ID}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>

      </Dialog>
    </>
  )
    ;
};

Events.propTypes = {
  className: PropTypes.string
};

export default Events;
