import React, {useState} from 'react';
import clsx from 'clsx';
import moment from 'moment';
import {v4 as uuid} from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {usePromise} from "promise-hook";
import Mock from "../../../api/mock";
import {Skeleton} from "@material-ui/lab";


const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({className, ...rest}) => {
  const classes = useStyles();
  const limit = 10;
  const {isLoading, data, error} = usePromise(() => Mock.getInvoices({limit: 10}), {
    resolve: true,
    resolveCondition: [limit]
  });


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Últimos invoices"/>
      <Divider/>

      {isLoading === false ?

        <PerfectScrollbar>
          <Box minWidth={800}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    ID
                  </TableCell>
                  <TableCell>
                    Valor
                  </TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Data
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    Categoria
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((order) => (
                  <TableRow
                    hover
                    key={order.ID}
                  >
                    <TableCell>
                      {order.ID}
                    </TableCell>
                    <TableCell>
                      {order.AMOUNT.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </TableCell>
                    <TableCell>
                      {moment(order.CREATED_AT).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <Chip
                        color="primary"
                        label={order.VENDOR_CATEGORY}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={order.ACCEPTED === 'TRUE' ? 'secondary' : 'primary'}
                        label={order.ACCEPTED === 'TRUE' ? 'Aceito' : 'Recusado'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>

        :
        <div>
          <Skeleton height={60} width="100%"/>
          <Skeleton height={60} width="100%"/>
          <Skeleton height={60} width="100%"/>
          <Skeleton height={60} width="100%"/>
        </div>

      }
      {/*<Box*/}
      {/*  display="flex"*/}
      {/*  justifyContent="flex-end"*/}
      {/*  p={2}*/}
      {/*>*/}
      {/*  <Button*/}
      {/*    color="primary"*/}
      {/*    endIcon={<ArrowRightIcon/>}*/}
      {/*    size="small"*/}
      {/*    variant="text"*/}
      {/*  >*/}
      {/*    View all*/}
      {/*  </Button>*/}
      {/*</Box>*/}
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
