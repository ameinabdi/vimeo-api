import React from 'react';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import ProfileForm from 'src/view/auth/ProfileForm';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const ProfileFormPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('auth.profile.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>{i18n('auth.profile.title')}</PageTitle>

        <ProfileForm
          onCancel={() => getHistory().push('/')}
        />
      </ContentWrapper>
    </>
  );
};

export default ProfileFormPage;
