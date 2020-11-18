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
  makeStyles, Table, TableHead, TableRow, TableCell, TableBody, CardHeader
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import {usePromise} from 'promise-hook';
import Mock from '../../../api/mock';
import {Skeleton} from '@material-ui/lab';
import CardLoader from '../../../components/CardLoader';
import _ from 'loadsh';


const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100%'
  },
  avatar: {
    backgroundColor: '#E2645A',
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Budget = ({className, ...rest}) => {
  const classes = useStyles();
  const limit = 5;

  const {isLoading, data, error} = usePromise(() => Mock.getCustomers({limit: limit}), {
    resolve: true,
    resolveCondition: [limit]
  });
  const [budget, setBudget] = React.useState(null);

  // React.useEffect(() => {
  //   if (data) {
  //     setBudget(_.orderBy(data, ['AMOUNT'], ['desc'])[0])
  //   }
  // }, [data])

  return (


    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Últimos Cadastros"/>
      <CardContent>

        {
          isLoading ?
            <CardLoader/>
            :
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      ID
                    </TableCell>
                    <TableCell>
                      Data
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    data.slice(0,5).map((el) => (
                      <TableRow>
                        <TableCell>
                          {el.ID}
                        </TableCell>
                        <TableCell>
                          {el.CREATED_AT}
                        </TableCell>
                      </TableRow>
                    ))
                  }


                </TableBody>
              </Table>
              {/*<Box*/}
              {/*  mt={2}*/}
              {/*  display="flex"*/}
              {/*  alignItems="center"*/}
              {/*>*/}
              {/*  <ArrowDownwardIcon className={classes.differenceIcon} />*/}
              {/*  <Typography*/}
              {/*    className={classes.differenceValue}*/}
              {/*    variant="body2"*/}
              {/*  >*/}
              {/*    12%*/}
              {/*  </Typography>*/}
              {/*  <Typography*/}
              {/*    color="textSecondary"*/}
              {/*    variant="caption"*/}
              {/*  >*/}
              {/*    Since last month*/}
              {/*  </Typography>*/}
              {/*</Box>*/}
            </>
        }

      </CardContent>

    </Card>

  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
