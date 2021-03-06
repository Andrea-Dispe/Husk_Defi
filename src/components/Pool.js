import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch, useHistory } from 'react-router-dom';

// MUI
import { makeStyles, StylesProvider, withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

//data
import Icons from '../icons/icons';
import { formatBigNumber, formatPercentage, sumLendingPoolData} from '../utils';

//Web3
import { useWeb3React } from '@web3-react/core';

const useStyles = makeStyles((theme) => ({
  poolsAvatar: {
    top: '-28px',
    right: '15px',
    position: 'absolute',
    width: '55px',
    height: '55px',
  },

  textCentered: {
    textAlign: 'center',
  },
  gridContainer: {
    justifyContent: 'space-between',
    margin: '0px',
    '&:after': {
      content: '""',
      marginLeft: '600px',
    },
  },
  topCardWide: {
    backgroundColor: theme.palette.type === 'light' ? '#FFFFFF' : '#2A2A2D',
    padding: '0px 30px 18px',
    borderRadius: '14px',
    marginBottom: '125px',
    marginTop: '35px',
  },
  gridItem: {
    maxWidth: '320px',
    position: 'relative',
    flexBasis: '0%',
  },
  cardContainer: {
    width: 268,
    height: 427,
    backgroundColor: theme.palette.type === 'light' ? '#FFFFFF' : '#2A2A2D',
    boxSizing: 'border-box',
    padding: '30px 25px 20px',
    borderRadius: '14px',
    marginBottom: '100px',
  },
  topCard: {
    width: '274px',
    // height: '120px',
    backgroundColor: theme.palette.type === 'light' ? '#FFFFFF' : '#2A2A2D',
    borderRadius: '8px',
    padding: '17px 40px 24px',
    boxSizing: 'border-box',
  },
  topCardAvatar: {
    width: '38px',
    height: '38px',
  },

  cardHeader: {
    padding: '0px',
    marginBottom: '31px',
  },
  cardContent: {
    padding: '0px',
  },
  poolApy: {
    marginBottom: '20px',
    lineHeight: '23px',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: '24px',
    color: theme.palette.type === 'light' ? '#100E0E' : '#FFFFFF',
    padding: '21px 0px 17px',
  },
  dataTitle: {
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  apr: {
    marginBottom: '25px',
  },
  dividerStake: {
    marginBottom: '44px',
  },
  dividerLend: {
    marginBottom: '25px',
  },
  dtLend: {
    marginBottom: '15px',
  },
  dtStake: {
    marginBottom: '21px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px',
    marginTop: '22px',
  },
  button: {
    width: '95px',
    fontSize: '13px',
  },
  poolWrapper: {
    width: '1240px',
    margin: '0 auto',
  },
  colorPrimary: {
    backgroundColor: 'hsla(0,0%,74.5%,.2)',
  },
  barColorPrimary: {
    backgroundColor: 'hsla(0,0%,74.5%,.2)',
  },
  skeleton: {
    transform: 'none',
    backgroundColor: 'hsla(0,0%,74.5%,.2)',
    '&:after': {
      background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.14), transparent)',
    },
  },
}));

const TokenAvatar = withStyles({
  root: {
    borderRadius: '0px',
  },
})(Avatar);

const TypographyStyles = withStyles({
  root: {
    borderRadius: '0px',
    color: "#000000"
  },
})(Typography);

export default function Pool({ loading, dummyLendingPoolData, lendingData, stakingData }) {
  let { url } = useRouteMatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  let web3react = useWeb3React();
  let stakingPoolData, lendingPoolData;
  const { chainId, account, activate, active } = useWeb3React();

  url.includes('stake')
    ? (stakingPoolData = stakingData.length && loading === false ? stakingData : dummyLendingPoolData)
    : (lendingPoolData = lendingData.length && loading === false ? lendingData : dummyLendingPoolData);



  const mainPageTopInfoCards = [
    { title: 'total_locked_position', icon: Icons.moneyBag, value: sumLendingPoolData(url, lendingData , loading, lendingPoolData,  'totalDeposit') },
    { title: 'total_borrowed', icon: Icons.wallet, value: sumLendingPoolData(url, lendingData , loading, lendingPoolData,  'totalBorrowed') },
    { title: 'today_incomes', icon: Icons.incomes },
    { title: 'price', icon: Icons.logo },
  ];


  return (
    <Paper>
      <Paper className={classes.poolWrapper}>
        {/* 4 cards layout */}

        {/* first block  */}
        {!url.includes('stake') ? (
          <Grid container justifyContent="space-between" style={{ padding: '75px 0px 0px' }}>
            {mainPageTopInfoCards.map(({ title, icon, value }) => (
              <Card className={classes.topCard} key={title}>
                <Grid container direction="column">
                  <Grid container alignItems="center" justifyContent="space-around" style={{ marginBottom: '16px' }}>
                    <Avatar src={icon} style={{ borderRadius: '0%', height: 'auto' }} />
                    {title === 'price' ? (
                      <TypographyStyles>Token {t(`${title}`)}</TypographyStyles>
                    ) : (
                      <TypographyStyles>{t(`${title}`)}</TypographyStyles>
                    )}
                  </Grid>

                  {title !== 'price' ? (
                    <Grid container justifyContent="flex-end">
                      <TypographyStyles style={{ fontSize: '23px', fontWeight: 600 }}>${value}</TypographyStyles>
                    </Grid>
                  ) : (
                    <Grid container justifyContent="space-between" alignItems="center">
                      <TypographyStyles style={{ fontSize: '23px', fontWeight: 600 }}>$98.70000</TypographyStyles>
                      <TypographyStyles style={{ fontSize: '14px', opacity: '0.8' }}>
                        {t('purchase')} {`>`}
                      </TypographyStyles>
                    </Grid>
                  )}
                </Grid>
              </Card>
            ))}
          </Grid>
        ) : (
          ''
        )}

        {/* second block (wide) */}
        {url.includes('stake') ? (
          <Grid>
            <Card className={classes.topCardWide}>
              <TypographyStyles className={classes.cardTitle}>{t('stake_position')}</TypographyStyles>
              <Divider className={classes.divider} style={{ marginBottom: '0px' }} />
              <Grid container wrap="nowrap" justifyContent="center" style={{ height: '156px' }}>
                <Grid container justifyContent="space-around" direction="column">
                  <TypographyStyles>{t('currency')}</TypographyStyles>
                  <Grid container alignItems="center">
                    <Avatar src={Icons.btc} className={`${classes.topCardAvatar}`} />
                    <TypographyStyles style={{ marginLeft: '5px' }}>hBNB</TypographyStyles>
                  </Grid>
                </Grid>

                <Grid container justifyContent="space-around" direction="column">
                  <TypographyStyles>{t('annualized_income')}</TypographyStyles>
                  <TypographyStyles>12.36%</TypographyStyles>
                </Grid>

                <Grid container justifyContent="space-around" direction="column">
                  <TypographyStyles>{t('pledged_assets')}</TypographyStyles>
                  <TypographyStyles style={{ color: '#ffffff'}}>10.05 BNB</TypographyStyles>
                </Grid>

                <Grid container justifyContent="space-around" direction="column">
                  <TypographyStyles>{t('pledged_assets_value')}</TypographyStyles>
                  <TypographyStyles>9.63 BNB</TypographyStyles>
                </Grid>

                <Grid container justifyContent="space-around" alignItems="center" direction="column">
                  <TypographyStyles>{t('operating')}</TypographyStyles>
                  <Grid container wrap="nowrap">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      style={{ marginRight: '22px' }}
                    >
                      {t('pledge')}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => history.push(`/close/sssssssssss/convert`)}
                    >
                      {t('withdraw')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Divider className={classes.divider} style={{ marginBottom: '0px' }} />
              <Grid container justifyContent="space-between" alignItems="center" style={{ paddingTop: '27px' }}>
                <Grid container alignItems="center" style={{ width: 'auto' }}>
                  <TokenAvatar src={Icons.logo} className={classes.topCardAvatar} />
                  <span style={{ marginLeft: '5px' }}> Token {t('rewards')}</span>
                </Grid>
                <TypographyStyles style={{ fontSize: '36px' }}>826.23</TypographyStyles>
                <Button variant="contained" color="primary" className={classes.button} style={{ marginRight: '63px' }}>
                  {t('receive')}
                </Button>
              </Grid>
            </Card>
          </Grid>
        ) : (
          <Grid container>
            <Card className={classes.topCardWide} style={{ width: '100%' }}>
              <TypographyStyles className={classes.cardTitle}>{t('deposit_position')}</TypographyStyles>

              <Divider className={classes.divider} style={{ marginBottom: '0px' }} />

              <Grid container wrap="nowrap" justifyContent="center" style={{ height: '156px' }}>
                <Grid container justifyContent="space-around" direction="column">
                  <TypographyStyles>{t('currency')}</TypographyStyles>
                  <Grid container alignItems="center">
                    <Avatar src={Icons.btc} className={classes.topCardAvatar} />

                    <TypographyStyles style={{ marginLeft: '5px' }}>hBNB</TypographyStyles>
                  </Grid>
                </Grid>

                <Grid container justifyContent="space-around" direction="column">
                  <TypographyStyles>{t('annualized_income')}</TypographyStyles>
                  <TypographyStyles>12.36%</TypographyStyles>
                </Grid>

                <Grid container justifyContent="space-around" direction="column">
                  <TypographyStyles>{t('initial_investment')}</TypographyStyles>
                  <TypographyStyles>10.05 BNB</TypographyStyles>
                </Grid>

                <Grid container justifyContent="space-around" direction="column">
                  <TypographyStyles>{t('income_asset')}</TypographyStyles>
                  <TypographyStyles>9.63 BNB</TypographyStyles>
                </Grid>

                <Grid container justifyContent="space-around" direction="column">
                  <TypographyStyles>{t('synthetic_assets')}</TypographyStyles>
                  <TypographyStyles>9.63 BNB</TypographyStyles>
                </Grid>

                <Grid container justifyContent="space-around" alignItems="center" direction="column">
                  <TypographyStyles>{t('operating')}</TypographyStyles>
                  <Grid container wrap="nowrap">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      style={{ marginRight: '22px' }}
                    >
                      {t('deposit')}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => history.push(`/close/sssssssssss/convert`)}
                    >
                      {t('withdraw')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        )}

        {/* third block  */}
        <Grid container className={classes.gridContainer}>
          {url.includes('stake')
            ? // STAKE POOLS CARDS
              stakingPoolData.map((pool, index) => (
                <Grid key={index} xs={12} sm={6} md={3} item className={classes.gridItem}>
                  <Avatar
                    alt={pool.name}
                    src={Icons[pool.name.replace('Interest Bearing ', '').toLowerCase().trim()]}
                    className={`${classes.poolsAvatar}`}
                  ></Avatar>
                  <Card className={`${classes.cardContainer}`}>
                    <CardHeader
                      title={pool.name.replace('Interest Bearing ', 'ib')}
                      className={`${classes.textCentered} ${classes.cardHeader}`}
                    />
                    <CardContent className={classes.cardContent}>
                      <Grid container className={`${classes.poolApy}`} justifyContent="center">
                        {stakingData.length && loading === false ? (
                          <TypographyStyles variant="h4" className={`${classes.textCentered}`} style={{ fontSize: '48px' }}>
                            {((Math.random() + 1) * 15).toFixed(2)} {/* Temporary shit until I get the stake pool APRs */}
                            <span style={{ fontSize: '24px' }}>%</span>
                          </TypographyStyles>
                        ) : (
                          <Skeleton animation="wave" width={150} height={58.5} className={classes.skeleton} />
                        )}
                      </Grid>
                      <TypographyStyles className={`${classes.textCentered} ${classes.apr}`}>
                        {t('annualized_rate_of_return')}
                      </TypographyStyles>
                      <Divider className={classes.dividerStake} />

                      <Grid container justifyContent={'space-between'} className={classes.dtStake}>
                        <TypographyStyles className={classes.dataTitle}>
                          {t('stake_value')}
                        </TypographyStyles>
                        <div className={classes.dataTitle}>
                          {stakingData.length && loading === false ? (
                            formatBigNumber(pool.stakeValue)
                          ) : (
                            <Skeleton animation="wave" width={70} height={16} className={classes.skeleton} />
                          )}
                        </div>
                      </Grid>

                      <Grid container justifyContent={'space-between'} className={classes.dtStake}>
                        <TypographyStyles className={classes.dataTitle}>{t('saved')}</TypographyStyles>
                        <TypographyStyles className={classes.dataTitle}>
                          {stakingData.length && loading === false ? (
                            formatBigNumber(pool.TokenDaily)
                          ) : (
                            <Skeleton animation="wave" width={70} height={16} className={classes.skeleton} />
                          )}
                        </TypographyStyles>
                      </Grid>
                    </CardContent>
                    <CardActions disableSpacing className={classes.buttonGroup} style={{}}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                          url.includes('stake')
                            ? history.push(`/stake/${pool.name}/pledge`)
                            : history.push(`${pool.name}/deposit`);
                        }}
                      >
                        {url.includes('stake') ? t('pledge') : t('deposit')}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                          url.includes('stake')
                            ? history.push(`/stake/${pool.name}/release-pledge`)
                            : history.push(`${pool.name}/withdraw`);
                        }}
                      >
                        {url.includes('stake') ? t('withdraw') : t('withdraw')}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : // LEND POOLS CARDS
              lendingPoolData.map((pool, index) => (
                <Grid key={pool.name} xs={12} sm={6} md={3} item className={classes.gridItem}>
                  <Avatar
                    alt={pool.name}
                    src={Icons[pool.name.replace('Interest Bearing ', '').toLowerCase().trim()]}
                    className={`${classes.poolsAvatar}`}
                  ></Avatar>
                  <Card className={`${classes.cardContainer}`}>
                    <CardHeader
                      title={pool.name.replace('Interest Bearing ', '')}
                      className={`${classes.textCentered} ${classes.cardHeader}`}
                    />
                    <CardContent className={classes.cardContent}>
                      <Grid container className={`${classes.poolApy}`} justifyContent="center">
                        {lendingData.length && loading === false ? (
                          <TypographyStyles variant="h4" className={`${classes.textCentered}`} style={{ fontSize: '48px' }}>
                         {formatPercentage(pool.apy)}
                          </TypographyStyles>
                        ) : (
                          <Skeleton animation="wave" width={150} height={58.5} className={classes.skeleton} />
                        )}
                      </Grid>
                      <TypographyStyles className={`${classes.textCentered} ${classes.apr}`}>
                        {t('annualized_rate_of_return')}
                      </TypographyStyles>
                      <Divider className={classes.dividerLend} />

                      <Grid container justifyContent={'space-between'} className={classes.dtLend}>
                        <TypographyStyles className={classes.dataTitle}>
                          {url.includes('stake') ? t('stake_value') : t('total_supply')}
                        </TypographyStyles>
                        <div className={classes.dataTitle}>
                          {lendingData.length && loading === false ? (
                            formatBigNumber(pool.totalDeposit)
                          ) : (
                            <Skeleton animation="wave" width={70} height={16} className={classes.skeleton} />
                          )}
                        </div>
                      </Grid>

                      {url.includes('stake') ? (
                        ''
                      ) : (
                        <Grid container justifyContent={'space-between'} className={classes.dtLend}>
                          <TypographyStyles className={classes.dataTitle}>
                            {url.includes('stake') ? t('saved') : t('total_borrowed')}
                          </TypographyStyles>
                          <TypographyStyles className={classes.dataTitle}>
                            {lendingData.length && loading === false ? (
                              url.includes('stake') ? (
                                pool.saved
                              ) : (
                                formatBigNumber(pool.totalBorrowed)
                              )
                            ) : (
                              <Skeleton animation="wave" width={70} height={16} className={classes.skeleton} />
                            )}
                          </TypographyStyles>
                        </Grid>
                      )}

                      <Grid container justifyContent={'space-between'} className={classes.dtLend}>
                        <TypographyStyles className={classes.dataTitle}>
                          {url.includes('stake') ? t('daily_output') : t('capital_utilization_rate')}
                        </TypographyStyles>
                        <TypographyStyles className={classes.dataTitle}>
                          {/* if vaults is not empty and is not loading anymore */}
                          {lendingData.length && loading === false ? (
                            url.includes('stake') ? (
                              pool.dailyOutput
                            ) : (
                              formatPercentage(pool.capitalUtilizationRate)
                            )
                          ) : (
                            <Skeleton animation="wave" width={70} height={16} className={classes.skeleton} />
                          )}
                        </TypographyStyles>
                      </Grid>
                    </CardContent>
                    <CardActions disableSpacing className={classes.buttonGroup}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                          url.includes('stake')
                            ? history.push(`/stake/${pool.name}/pledge`)
                            : history.push(`${pool.name}/deposit`);
                        }}
                      >
                        {url.includes('stake') ? t('pledge') : t('deposit')}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                          url.includes('stake')
                            ? history.push(`/stake/${pool.name}/release-pledge`)
                            : history.push(`${pool.name}/withdraw`);
                        }}
                      >
                        {url.includes('stake') ? t('withdraw') : t('withdraw')}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Paper>
    </Paper>
  );
}
