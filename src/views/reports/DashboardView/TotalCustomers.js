import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import {usePromise} from "promise-hook";
import Mock from "../../../api/mock";
import CardLoader from "../../../components/CardLoader";

const useStyles = makeStyles((theme) => ({
  root: {
   // height: '100%'
  },
  avatar: {
    backgroundColor: '#DB5D79',
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalCustomers = ({className, ...rest}) => {
  const classes = useStyles();
  const {isLoading, data, error} = usePromise(Mock.getCustomers, {
    resolve: true,
  });
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>


        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          {
            isLoading ?  <CardLoader/> :
              <>
                <Grid item>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                  >
                    TOTAL DE CLIENTES
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h3"
                  >
                    {data.length}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <PeopleIcon/>
                  </Avatar>
                </Grid>
              </>
          }
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
