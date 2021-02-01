/**
 * User database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
export default function (sequelize, DataTypes) {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        get() {
          return undefined;
        },
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      emailVerificationToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
        get() {
          return undefined;
        },
      },
      emailVerificationTokenExpiresAt: {
        type: DataTypes.DATE,
      },
      passwordResetToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
        get() {
          return undefined;
        },
      },
      passwordResetTokenExpiresAt: { type: DataTypes.DATE },
      lastName: {
        type: DataTypes.STRING(175),
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(24),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      jwtTokenInvalidBefore: {
        type: DataTypes.DATE,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['email'],
          where: {
            deletedAt: null,
          },
        },
        {
          unique: true,
          fields: ['importHash'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
      paranoid: true,
    },
  );

  user.associate = (models) => {
    models.user.hasMany(models.tenantUser, {
      as: 'tenants',
    });

    models.user.hasMany(models.file, {
      as: { singular: 'avatar', plural: 'avatars' },
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.user.getTableName(),
        belongsToColumn: 'avatars',
      },
    });

    models.user.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.user.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  user.beforeCreate((user, options) => {
    user = trimStringFields(user);
    user.fullName = buildFullName(
      user.firstName,
      user.lastName,
    );
  });

  user.beforeUpdate((user, options) => {
    user = trimStringFields(user);
    user.fullName = buildFullName(
      user.firstName,
      user.lastName,
    );
  });

  return user;
}

function buildFullName(firstName, lastName) {
  if (!firstName && !lastName) {
    return null;
  }

  return `${(firstName || '').trim()} ${(
    lastName || ''
  ).trim()}`.trim();
}

function trimStringFields(user) {
  user.email = user.email.trim();

  user.firstName = user.firstName
    ? user.firstName.trim()
    : null;

  user.lastName = user.lastName
    ? user.lastName.trim()
    : null;

  return user;
}
