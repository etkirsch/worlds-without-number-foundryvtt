/**
 * SkillBuilder. Builds a skill object (non-Foundry object) which
 * is returned to the player in a one-to-many relationship. The
 * builder accepts a configuration file with the specific format
 * below and returns a list of skill objects.
 *
 * The configuration object should be the entire system object in
 * case there is a future need to pull from other fields within it.
 * The skillBuilder specifically takes the skillConfiguration field
 * and uses it to populate the settings. This should include the
 * field 'skillMap' which is a dictionary of the following format:
 *   skillKey: {
 *     name: 'The Skill\'s Name in Title Case',
 *     description: 'A description of the skill for tooltips',
 *     relevantAttributes: [ // describes attributes that can apply
 *       'strength',
 *       'constitution',
 *       // etc. This can be empty as well.
 *     ],
 *   }
 */
export default class SkillBuilder {
  /**
   * The static error text returned when attempted to construct the
   * builder but the configuration file is falsy or malformed.
   * @return {string} Error message
   */
  static get ImproperConfigFormat() {
    return 'The config parameter passed into SkillBuilder is either' +
        'falsy or lacks the skillConfiguration field.';
  }

  /**
   * The static error text returned when attempting to build a skill
   * and no configuration file has been loaded.
   * @return {string} Error message
   */
  static get NoConfigErrorText() {
    return 'No configuration loaded into SkillBuilder.';
  }

  /**
   * The static error text returned when attempting to build a skill
   * and no matching key exists in the skillConfiguration
   * @param {string} key The missing skill key
   * @return {string} Error message
   */
  static noMatchingSkillKeyErrorText(key) {
    return `No skill with key ${key} was found in skillConfiguration`;
  }

  /**
   * The constructor takes the System configuration object for
   * preloading. No value is returned. Raises an exception if
   * config parameter is falsy or does not contain the field
   * 'skillConfiguration'
   * @param {Object} config The System configuration object
   */
  constructor(config) {
    if (!config || !config.skillConfiguration) {
      throw new Error(SkillBuilder.ImproperConfigFormat);
    }
    this.config = config.skillConfiguration;
  }

  /**
   * buildSkill. Builds a specific skill by key (see above). If the
   * skill configuration data is absent, this returns an exception.
   * If this skill cannot be found, this returns an exception.
   * @param {string} key The key of the skill within the config skillMap
   * @return {object} A built skill object
   */
  buildSkill(key) {
    if (!this.config) {
      throw new Error(SkillBuilder.NoConfigErrorText);
    }

    if (!(key in this.config)) {
      throw new Error(SkillBuilder.noMatchingSkillKeyErrorText(key));
    }

    return this.config[key];
  }
}
