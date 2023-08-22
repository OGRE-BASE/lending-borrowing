import {
  configEnvWithTenderlyAvalancheFork,
  configEnvWithTenderlyMainnetFork,
  configEnvWithTenderlyPolygonFork,
} from '../../support/steps/configuration.steps';
import { deposit, swap, borrow } from '../../support/steps/main.steps';
import { dashboardAssetValuesVerification } from '../../support/steps/verification.steps';
import { skipState } from '../../support/steps/common';
import assets from '../../fixtures/assets.json';
import constants from '../../fixtures/constans.json';

const testData = {
  depositBaseAmount: {
    asset: assets.avalancheMarket.AVAX,
    amount: 900,
    hasApproval: true,
  },
};

describe('SWAP SPEC FOR AVALANCHE MARKET', () => {
  describe('CASE1: usual swap', () => {
    const skipTestState = skipState(false);
    configEnvWithTenderlyAvalancheFork({});

    deposit(testData.depositBaseAmount, skipTestState, true);
    swap(
      {
        fromAsset: assets.avalancheMarket.AVAX,
        toAsset: assets.avalancheMarket.DAI,
        amount: 100,
        hasApproval: false,
      },
      skipTestState,
      true
    );
    dashboardAssetValuesVerification(
      [
        {
          type: constants.dashboardTypes.deposit,
          asset: assets.avalancheMarket.AVAX.shortName,
          amount: 800,
          collateralType: constants.collateralType.isCollateral,
        },
        {
          type: constants.dashboardTypes.deposit,
          asset: assets.avalancheMarket.DAI.shortName,
          collateralType: constants.collateralType.isCollateral,
        },
      ],
      skipTestState
    );
  });
  describe('CASE2: swap to not collateral asset', () => {
    const skipTestState = skipState(false);
    configEnvWithTenderlyAvalancheFork({});

    deposit(testData.depositBaseAmount, skipTestState, true);
    swap(
      {
        fromAsset: assets.avalancheMarket.AVAX,
        toAsset: assets.avalancheMarket.USDT,
        amount: 100,
        hasApproval: false,
      },
      skipTestState,
      true
    );
    dashboardAssetValuesVerification(
      [
        {
          type: constants.dashboardTypes.deposit,
          asset: assets.avalancheMarket.AVAX.shortName,
          amount: 800,
          collateralType: constants.collateralType.isCollateral,
        },
        {
          type: constants.dashboardTypes.deposit,
          asset: assets.avalancheMarket.USDT.shortName,
          collateralType: constants.collateralType.isNotCollateral,
        },
      ],
      skipTestState
    );
  });
  describe('CASE3: try to swap for health factor low then 1', () => {
    const skipTestState = skipState(false);
    configEnvWithTenderlyAvalancheFork({});

    deposit(testData.depositBaseAmount, skipTestState, true);
    borrow(
      {
        asset: assets.avalancheMarket.AVAX,
        amount: 900,
        apyType: constants.borrowAPYType.variable,
        hasApproval: false,
      },
      skipTestState,
      true
    );
    swap(
      {
        fromAsset: assets.avalancheMarket.AVAX,
        toAsset: assets.avalancheMarket.USDT,
        amount: 2000,
        failCase: true,
        hasApproval: false,
      },
      skipTestState,
      true
    );
  });
});
