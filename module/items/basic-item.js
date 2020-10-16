import {itemTemplatePath} from '../consts.js';
import {TestableItemSheet} from '../utils/testable-item-sheet.js';

/**
 * BasicItem. The Worlds Without Number Basic Item Sheet from
 * which all other ItemSheets will extend.
 */
export default class BasicItem extends TestableItemSheet {
  /**
   * defaultOptions. A static getter meant to override the parent
   * defaultOptions within ItemSheet.
   * @return {object} a collection of default options inc. template
   */
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      classes: ['sheet', 'item'],
      template: `${itemTemplatePath}/basic-item.html`,
    };
  }
}
