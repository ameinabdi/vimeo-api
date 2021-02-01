import Plans from '../../security/plans';

const plans = Plans.values;

/**
 * Tenant database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
export default function (sequelize, DataTypes) {
  const tenant = sequelize.define(
    'tenant',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validation: {
          notEmpty: true,
        },
      },
      url: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validation: {
          notEmpty: true,
        },
      },
      plan: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [plans.free, plans.growth, plans.enterprise],
        defaultValue: plans.free,
      },
      planStatus: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['active', 'cancel_at_period_end', 'error'],
        defaultValue: 'active',
      },
      planStripeCustomerId: {
        type: DataTypes.STRING(255),
      },
      planUserId: {
        type: DataTypes.UUID,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['url'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
      paranoid: true,
    },
  );

  tenant.associate = (models) => {
    models.tenant.hasMany(models.settings, {
      as: 'settings',
    });

    models.tenant.hasMany(models.tenantUser, {
      as: 'users',
    });

    models.tenant.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.tenant.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return tenant;
}
