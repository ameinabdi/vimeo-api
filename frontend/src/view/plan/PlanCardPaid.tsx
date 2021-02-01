import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import selectors from 'src/modules/plan/planSelectors';
import actions from 'src/modules/plan/planActions';
import PlanCardWrapper from 'src/view/plan/styles/PlanCardWrapper';
import authSelectors from 'src/modules/auth/authSelectors';
import Plans from 'src/security/plans';
import { Button, Tooltip } from 'antd';

export default function PlanCardPaid(props) {
  const dispatch = useDispatch();
  const { plan } = props;

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const loading = useSelector(selectors.selectLoading);

  const hasPermissionToEdit = useSelector(
    selectors.selectPermissionToEdit,
  );

  const isPlanUser = useSelector(
    selectors.selectIsPlanUser,
  );

  const isCurrentPlan = currentTenant.plan === plan;

  const buttonState = isCurrentPlan
    ? 'manage'
    : currentTenant.plan === Plans.values.free
    ? 'payment'
    : 'none';

  const doCheckout = () => {
    dispatch(actions.doCheckout(plan));
  };

  const doPortal = () => {
    dispatch(actions.doPortal());
  };

  return (
    <PlanCardWrapper>
      <div>
        <div className="title">
          {i18n(`plan.${plan}.label`)}
        </div>
        <div className="pricing">
          {i18n(`plan.${plan}.price`)}
          <span className="pricingPeriod">
            {i18n('plan.pricingPeriod')}
          </span>
        </div>
      </div>

      <div>
        {isCurrentPlan &&
          currentTenant.planStatus ===
            'cancel_at_period_end' && (
            <p className="cancelAtPeriodEnd">
              {i18n('plan.cancelAtPeriodEnd')}
            </p>
          )}

        {isCurrentPlan &&
          currentTenant.planStatus === 'error' && (
            <p className="somethingWrong">
              {i18n('plan.somethingWrong')}
            </p>
          )}

        {buttonState === 'payment' && (
          <Button
            type="primary"
            htmlType="button"
            block
            size="large"
            disabled={
              !hasPermissionToEdit || !isPlanUser || loading
            }
            onClick={doCheckout}
          >
            {i18n('plan.subscribe')}
          </Button>
        )}

        {buttonState === 'manage' && isPlanUser && (
          <Button
            type="primary"
            htmlType="button"
            block
            size="large"
            disabled={!hasPermissionToEdit || loading}
            onClick={doPortal}
          >
            {i18n('plan.manage')}
          </Button>
        )}

        {buttonState === 'manage' && !isPlanUser && (
          <Tooltip title={i18n('plan.notPlanUser')}>
            <Button
              type="primary"
              htmlType="button"
              block
              size="large"
              disabled={true}
            >
              {i18n('plan.manage')}
            </Button>
          </Tooltip>
        )}
      </div>
    </PlanCardWrapper>
  );
}
