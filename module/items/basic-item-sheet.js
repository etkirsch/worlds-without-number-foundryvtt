import {TestableItemSheet} from '../testing/mocks/testable-item-sheet.js';
import {itemTemplatePath} from '../consts.js';

/**
 * BasicItemSheet. The Worlds Without Number Basic Item Sheet from
 * which all other ItemSheets will extend.
 */
export default class BasicItemSheet extends TestableItemSheet {
  /**
   * defaultOptions. A static getter meant to override the parent
   * defaultOptions within ItemSheet.
   * @return {object} a collection of default options inc. template
   */
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      width: 560,
      height: 500,
      template: `${itemTemplatePath}/basic-item-sheet.html`,
    };
  }
}
