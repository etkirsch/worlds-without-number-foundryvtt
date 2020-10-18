/**
 * Skill. An object representing a creature's skills.
 */
export default class Skill {
  /**
   * The constructor is typically called by the SkillBuilder
   * class, but can be called elsewhere where necessary.
   * @param {string} name Name of the Skill
   * @param {string} key Skill key (defaults to name param)
   * @param {string} description A readable skill description
   * @param {Array} relevantAttributes See SkillBuilder
   */
  constructor({name, key, description, relevantAttributes}) {
    this.name = name;
    this.key = key || name;
    this.description = description;
    this.relevantAttributes = relevantAttributes;
  }

  /**
   * static compare. Comparator for two strings. Returns based
   * on name field.
   * @param {Object} left Lefthand Skill
   * @param {Object} right Righthand Skill
   * @return {Number} comparator value (-1, 0, or 1)
   */
  static compare(left, right) {
    const leftName = left.name.toLowerCase();
    const rightName = right.name.toLowerCase();

    if (leftName < rightName) {
      return -1;
    }
    if (leftName > rightName) {
      return 1;
    }
    return 0;
  }
}
