import {itemTemplatePath} from '../consts.js';
import BasicItemSheet from './basic-item-sheet.js';

/**
 * ItemModifierSheet. A Modifier that can be applied to any class
 * derived from basic-item.js
 */
export default class ItemModifierSheet extends BasicItemSheet {
  /**
   * defaultOptions. A static getter meant to override the parent
   * defaultOptions within ItemSheet.
   * @return {object} a collection of default options inc. template
   */
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      template: `${itemTemplatePath}/item-modifier-sheet.html`,
    };
  }
}
