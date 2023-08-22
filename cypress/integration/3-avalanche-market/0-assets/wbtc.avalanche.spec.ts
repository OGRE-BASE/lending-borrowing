import {
  configEnvWithTenderlyAvalancheFork,
  configEnvWithTenderlyMainnetFork,
  configEnvWithTenderlyPolygonFork,
} from '../../../support/steps/configuration.steps';
import { deposit, borrow, repay, withdraw } from '../../../support/steps/main.steps';
import {
  dashboardAssetValuesVerification,
  switchCollateralBlocked,
} from '../../../support/steps/verification.steps';
import { skipState } from '../../../support/steps/common';
import assets from '../../../fixtures/assets.json';
import constants from '../../../fixtures/constans.json';

const testData = {
  depositBaseAmount: {
    asset: assets.avalancheMarket.AVAX,
    amount: 5000,
    hasApproval: true,
  },
  testCases: {
    borrow: {
      asset: assets.avalancheMarket.WBTC,
      amount: 0.01,
      apyType: constants.borrowAPYType.variable,
      hasApproval: true,
    },
    deposit: {
      asset: assets.avalancheMarket.WBTC,
      amount: 0.006,
      hasApproval: false,
    },
    repay: {
      asset: assets.avalancheMarket.WBTC,
      amount: 0.001,
      hasApproval: true,
      repayOption: constants.repayType.default,
    },
    withdraw: {
      asset: assets.avalancheMarket.WBTC,
      amount: 0.001,
      hasApproval: true,
    },
  },
  verifications: {
    finalDashboard: [
      {
        type: constants.dashboardTypes.deposit,
        asset: assets.avalancheMarket.WBTC.shortName,
        amount: 0.005,
        collateralType: constants.collateralType.isCollateral,
      },
      {
        type: constants.dashboardTypes.borrow,
        asset: assets.avalancheMarket.WBTC.shortName,
        amount: 0.009,
        apyType: constants.borrowAPYType.variable,
      },
    ],
  },
};

describe('WBTC INTEGRATION SPEC, AVALANCHE MARKET', () => {
  const skipTestState = skipState(false);
  configEnvWithTenderlyAvalancheFork({});

  deposit(testData.depositBaseAmount, skipTestState, true);
  borrow(testData.testCases.borrow, skipTestState, true);
  deposit(testData.testCases.deposit, skipTestState, true);
  repay(testData.testCases.repay, skipTestState, false);
  withdraw(testData.testCases.withdraw, skipTestState, false);
  dashboardAssetValuesVerification(testData.verifications.finalDashboard, skipTestState);
});
