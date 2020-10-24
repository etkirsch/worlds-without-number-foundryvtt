import BasicItemSheet from './basic-item-sheet.js';
import SkillOptionSheet from './sub-items/skill-option-sheet.js';
import WorldsItem from './worlds-item.js';
import {itemTemplatePath} from '../consts.js';

/**
 * FocusSheet. Defines the nature of a Focus Item.
 */
export default class FocusSheet extends BasicItemSheet {
  /**
   * defaultOptions. A static getter meant to override the parent
   * defaultOptions within ItemSheet.
   * @return {object} a collection of default options inc. template
   */
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      classes: ['focus-sheet'],
      tabs: [{
        navSelector: '.sheet-tabs',
        contentSelector: '.sheet-body',
        initial: 'description',
      }],
      template: `${itemTemplatePath}/focus-sheet.html`,
    };
  }

  /**
   * AddSkillOptionButtonSelectorText. Static Getter for the button's
   * selector text.
   * @return {string} The selector text for the button
   */
  static get AddSkillOptionButtonSelectorText() {
    return 'button.add-option';
  }

  /**
   * getData. Populates the skillOptions with their correct items
   * based on the array of ids in data.skillOptions. Filters out
   * null or undefined skillOptions
   * @return {Object} the object's data
   */
  getData() {
    const options = this.item.data.data.skillOptions || [];
    return {
      ...super.getData(),
      items: options.map((_id) => WorldsItem.get(_id))
          .filter((x) => !!x),
    };
  }

  /**
   * handleAddSkillOptionClick. Handles the button click event
   * when adding new skill options.
   * @param {Event} ev Click Event calling into this method
   * @return {object} the new SkillOption object (for testing)
   */
  async handleAddSkillOptionClick(ev) {
    const newOption = await WorldsItem
        .create({name: 'asdf', type: 'focusSkillOption'});
    const _id = newOption.id;
    const {skillOptions} = this.item.data.data;

    this.item.update({
      'data.skillOptions': [...skillOptions, _id],
    });

    return newOption;
  }

  /**
   * handleSkillOptionPickInputChange. Handles change events for each
   * skill option's input for the pick field.
   * @param {Event} event Click Event calling into this method
   */
  handleSkillOptionPickInputChange(event) {
    debugger;
    const optionSheet = event._parents || $(event.currentTarget).parents();
    const id = optionSheet.data('id');
    const item = WorldsItem.WorldsGame.getItem(id);
    const value = parseInt(event.currentTarget.value);
    SkillOptionSheet.updatePick(item, value);
  }

  /**
   * activateListeners.
   * @param {HTML} html
   */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(FocusSheet.AddSkillOptionButtonSelectorText)
        .click(async (ev) => await this.handleAddSkillOptionClick(ev));

    // Update Skill Option "pick" value
    html.find(SkillOptionSheet.PickInputSelectorText)
        .change((ev) => this.handleSkillOptionPickInputChange(ev));
  }
}
