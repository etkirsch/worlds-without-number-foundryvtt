import {itemTemplatePath} from '../consts.js';
import BasicItem from './basic-item.js';

/**
 * ItemModifier. A Modifier that can be applied to any class
 * derived from basic-item.js
 */
export default class ItemModifier extends BasicItem {
  /**
   * defaultOptions. A static getter meant to override the parent
   * defaultOptions within ItemSheet.
   * @return {object} a collection of default options inc. template
   */
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      classes: ['sheet', 'item'],
      template: `${itemTemplatePath}/item-modifier.html`,
    };
  }
}
