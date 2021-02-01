import { Button, Popconfirm, Table, Tag } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import destroyActions from 'src/modules/tenant/destroy/tenantDestroyActions';
import destroySelectors from 'src/modules/tenant/destroy/tenantDestroySelectors';
import invitationActions from 'src/modules/tenant/invitation/tenantInvitationActions';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import actions from 'src/modules/tenant/list/tenantListActions';
import selectors from 'src/modules/tenant/list/tenantListSelectors';
import tenantSelectors from 'src/modules/tenant/tenantSelectors';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import authSelectors from 'src/modules/auth/authSelectors';
import Plans from 'src/security/plans';
import config from 'src/config';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';

const TenantListTable = (props) => {
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const invitationLoading = useSelector(
    invitationSelectors.selectLoading,
  );
  const loading =
    findLoading || destroyLoading || invitationLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const invitationToken = useSelector(
    tenantSelectors.selectInvitationToken,
  );
  const hasPermissionToEdit = useSelector(
    tenantSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    tenantSelectors.selectPermissionToDestroy,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const handleTableChange = (
    pagination,
    filters,
    sorter,
  ) => {
    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  const doSelectTenant = (tenant) => {
    dispatch(authActions.doSelectTenant(tenant));
  };

  const doDestroy = (id) => {
    dispatch(destroyActions.doDestroy(id));
  };

  const doDeclineInvitation = (token) => {
    dispatch(invitationActions.doDecline(token));
  };

  const doAcceptInvitation = (token) => {
    dispatch(invitationActions.doAccept(token));
  };

  const columns: any = [
    {
      title: i18n('tenant.fields.name'),
      sorter: true,
      dataIndex: 'name',
      render: (_, record) => (
        <>
          {record.name}
          {Boolean(invitationToken(record)) && (
            <Tag color="gold" style={{ marginLeft: '8px' }}>
              {i18n('tenant.invitation.invited')}
            </Tag>
          )}
        </>
      ),
    },
    tenantSubdomain.isEnabled && {
      title: i18n('tenant.fields.url'),
      sorter: true,
      dataIndex: 'url',
      render: (_, record) =>
        `${record.url}.${config.frontendUrl.host}`,
    },
    config.isPlanEnabled && {
      title: i18n('tenant.fields.plan'),
      sorter: true,
      dataIndex: 'plan',
      render: (plan, record) => (
        <Tag
          color={
            plan === Plans.values.free ? undefined : 'gold'
          }
        >
          {i18n(`plan.${plan}.label`)}
        </Tag>
      ),
    },
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => {
        if (invitationToken(record)) {
          return (
            <div className="table-actions">
              <Popconfirm
                title={i18n('common.areYouSure')}
                onConfirm={() =>
                  doAcceptInvitation(
                    invitationToken(record),
                  )
                }
                okText={i18n('common.yes')}
                cancelText={i18n('common.no')}
              >
                <Button type="primary">
                  {i18n('tenant.invitation.accept')}
                </Button>
              </Popconfirm>
              <Popconfirm
                title={i18n('common.areYouSure')}
                onConfirm={() =>
                  doDeclineInvitation(
                    invitationToken(record),
                  )
                }
                okText={i18n('common.yes')}
                cancelText={i18n('common.no')}
              >
                <Button type="primary" danger>
                  {i18n('tenant.invitation.decline')}
                </Button>
              </Popconfirm>
            </div>
          );
        } else {
          return (
            <div className="table-actions">
              {currentTenant.id !== record.id && (
                <Button
                  type="primary"
                  onClick={() => doSelectTenant(record)}
                >
                  {i18n('tenant.select')}
                </Button>
              )}
              {hasPermissionToEdit(record) && (
                <Link to={`/tenant/${record.id}/edit`}>
                  {i18n('common.edit')}
                </Link>
              )}
              {hasPermissionToDestroy(record) && (
                <Popconfirm
                  title={i18n('common.areYouSure')}
                  onConfirm={() => doDestroy(record.id)}
                  okText={i18n('common.yes')}
                  cancelText={i18n('common.no')}
                >
                  <ButtonLink>
                    {i18n('common.destroy')}
                  </ButtonLink>
                </Popconfirm>
              )}
            </div>
          );
        }
      },
    },
  ].filter(Boolean);

  return (
    <TableWrapper>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={rows}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{
          x: true,
        }}
      />
    </TableWrapper>
  );
};

export default TenantListTable;
