import SequelizeRepository from '../database/repositories/sequelizeRepository';
import SettingsRepository from '../database/repositories/settingsRepository';

const DEFAULT_SETTINGS = {
  theme: 'default',
};

/**
 * Handles Settings operations
 */
class SettingsService {
  /**
   * Finds the Settings or creates and returns the default.
   *
   * @param {*} currentUser
   */
  static async findOrCreateDefault(options) {
    return SettingsRepository.findOrCreateDefault(
      DEFAULT_SETTINGS,
      options,
    );
  }

  /**
   * Saves the Settings.
   *
   * @param {*} data
   * @param {*} currentUser
   */
  static async save(data, options) {
    const transaction = await SequelizeRepository.createTransaction(
      options.database,
    );

    const settings = await SettingsRepository.save(
      data,
      options,
    );

    await SequelizeRepository.commitTransaction(
      transaction,
    );

    return settings;
  }
}

export default SettingsService;
