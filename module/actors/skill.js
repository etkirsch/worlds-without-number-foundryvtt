/**
 * Skill. An object representing a creature's skills.
 */
export default class Skill {
  /**
   * The constructor is typically called by the SkillBuilder
   * class, but can be called elsewhere where necessary.
   * @param {string} name Name of the Skill
   * @param {string} description A readable skill description
   * @param {Array} relevantAttributes See SkillBuilder
   */
  constructor({name, description, relevantAttributes}) {
    this.name = name;
    this.description = description;
    this.relevantAttributes = relevantAttributes;
  }
}
