import BasicItemSheet from '../basic-item-sheet.js';
import {subItemTemplatePath} from '../../consts.js';

/**
 * SkillOptionSheet. Allows a GM to specify a specific option of
 * skill advancements that a player can choose as part of a Focus or
 * similar.
 */
export default class SkillOptionSheet extends BasicItemSheet {
  /**
   * defaultOptions. A static getter meant to override the parent
   * defaultOptions within ItemSheet.
   * @return {object} a collection of default options inc. template
   */
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      classes: ['skill-option-sheet'],
      template: `${subItemTemplatePath}/skill-option-sheet.html`,
    };
  }

  /**
   * PickInputSelectorText. Static Getter for the Skill Option's `pick`
   * input selector text.
   * @return {string} The selector text
   */
  static get PickInputSelectorText() {
    return 'div.skill-option > input.pick';
  }

  /**
   * Static updater for Pick field. Allows for editing within the Focus
   * sheet.
   * @param {Object} option An Item using this specific sheet type
   * @param {Number} pick The new value for pick
   * @return {bool} Indicates that the update was successeful
   */
  static updatePick(option, pick) {
    option.update({'data.pick': pick});
    return true;
  }

  /**
   * change event for pick input.
   * @param {event} event
   */
  handlePickInputChange(event) {
    const value = parseInt(event.currentTarget.value);
    SkillOptionSheet.updatePick(this.item, value);
  }

  /**
   * activateListeners.
   * @param {HTML} html
   */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(SkillOptionSheet.PickInputSelectorText)
        .change((ev) => this.handlePickInputChange(ev));
  }
}
