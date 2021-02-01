import { Button } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n, i18nHtml } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import ButtonLink from 'src/view/shared/styles/ButtonLink';

const EmailUnverifiedPage = (props) => {
  const dispatch = useDispatch();
  const email = useSelector(
    selectors.selectCurrentUserEmail,
  );
  const loading = useSelector(
    selectors.selectLoadingEmailConfirmation,
  );
  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  const doSubmit = () => {
    dispatch(actions.doSendEmailConfirmation());
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl ||
          '/images/emailUnverified.jpg'
        })`,
      }}
    >
      <Content>
        <Logo>
          {logoUrl ? (
            <img
              src={logoUrl}
              width="240px"
              alt={i18n('app.title')}
            />
          ) : (
            <h1>{i18n('app.title')}</h1>
          )}
        </Logo>

        <h3
          style={{
            textAlign: 'center',
          }}
        >
          {i18nHtml('auth.emailUnverified.message', email)}
        </h3>

        <Button
          onClick={doSubmit}
          style={{
            marginTop: '24px',
          }}
          type="primary"
          size="large"
          block
          htmlType="submit"
          loading={loading}
        >
          {i18n('auth.emailUnverified.submit')}
        </Button>

        <OtherActions>
          <ButtonLink onClick={doSignout}>
            {i18n('auth.signinWithAnotherAccount')}
          </ButtonLink>
        </OtherActions>
      </Content>
    </Wrapper>
  );
};

export default EmailUnverifiedPage;
