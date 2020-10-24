import {TestableActor} from '../testing/mocks/testable-actor.js';

/**
 * WorldsActor. The main Worlds Without Number actor class.
 */
export default class WorldsActor extends TestableActor {
  /**
   * ZeroTemplateText. The string used when a template needs to use a
   * modifier of zero.
   * @return {string} This text
   */
  static get ZeroTemplateText() {
    return '--';
  }

  /**
   * attributeModifier. Static method used to quickly pinpoint
   * the modifier value for a given score.
   * @param {number} raw The modified or raw attribute for calculation
   * @return {number} The modifier for the attribute
   */
  static attributeModifier(raw) {
    if (raw < 4) {
      return -2;
    }
    if (raw < 8) {
      return -1;
    }
    if (raw < 14) {
      return 0;
    }
    if (raw < 18) {
      return 1;
    }
    return 2;
  }

  /**
   * getTemplateModifier. Returns a string prepended with - or + depending
   * on the value of the input. If the value is zero, the static value
   * ZeroTemplateText is returned instead.
   * @param {Number} value The value for the template modifier
   * @return {string} A string for use in a template.
   */
  static getTemplateModifier(value) {
    if (value > 0) {
      return `+${value}`;
    }

    if (value < 0) {
      return value.toString();
    }

    return WorldsActor.ZeroTemplateText;
  }
}
