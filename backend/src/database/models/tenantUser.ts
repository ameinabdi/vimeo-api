import { getConfig } from '../../config';

/**
 * Tenant User relation database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
export default function (sequelize, DataTypes) {
  const tenantUser = sequelize.define(
    'tenantUser',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      roles: {
        type:
          // MySQL doesn't have Array Field
          getConfig().DATABASE_DIALECT === 'mysql'
            ? DataTypes.JSON
            : DataTypes.ARRAY(DataTypes.TEXT),
      },
      invitationToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['active', 'invited', 'empty-permissions'],
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  tenantUser.associate = (models) => {
    models.tenantUser.belongsTo(models.tenant);
    models.tenantUser.belongsTo(models.user);

    models.tenantUser.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.tenantUser.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return tenantUser;
}
