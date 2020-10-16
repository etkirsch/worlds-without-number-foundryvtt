import {TestableActor} from '../utils/testable-actor.js';

/**
 * WorldsActor. The main Worlds Without Number actor class.
 */
export default class WorldsActor extends TestableActor {
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
}
