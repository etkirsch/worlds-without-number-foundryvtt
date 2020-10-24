import FocusSheet from '../focus-sheet.js';
import SkillOptionSheet from '../sub-items/skill-option-sheet.js';
import {itemTemplatePath} from '../../consts.js';
import WorldsItem from '../worlds-item.js';
import {WorldsGame} from '../../utils/worlds-game.js';
import {TestableHtml} from '../../testing/mocks/testable-html.js';
import {MockPageElement} from '../../testing/mocks/testable-html.js';
import {WorldsDataWithMocks} from '../../testing/configs/mocked-worlds-data.js';

const focusConfig = {
  itemOptions: {
    data: {
      skillOptions: [
        'skill_option_1',
        'skill_option_2',
        'skill_option_4',
      ],
    },
  },
};

describe('FocusSheet', () => {
  describe('defaultOptions', () => {
    it('has appropriate overrides', () => {
      expect(FocusSheet.defaultOptions.template)
          .toBe(`${itemTemplatePath}/focus-sheet.html`);
    });
  });

  describe('getData', () => {
    WorldsItem.registerGame(new WorldsGame(WorldsDataWithMocks));

    it('appropriately formats options', () => {
      const focus = new FocusSheet(focusConfig);
      const data = focus.getData();
      expect(data.items).toHaveLength(2);
    });

    it('filters off nonexistent items', () => {
      const focus = new FocusSheet(focusConfig);
      const data = focus.getData();
      expect(data.items).toHaveLength(2);
    });
  });

  describe('handleAddSkillOptionClick', () => {
    const sheet = new FocusSheet(focusConfig);
    WorldsItem.registerGame(new WorldsGame(WorldsDataWithMocks));

    it('creates a new Skill Option in the WorldsGame', async () => {
      const preLength = Object.keys(WorldsItem.WorldsGame.game.items).length;
      await sheet.handleAddSkillOptionClick({});
      const postLength = Object.keys(WorldsItem.WorldsGame.game.items).length;
      expect(postLength - preLength).toBe(1);
    });

    it('adds the id to sheet\'s item\'s skillOptions', async () => {
      const newItem = await sheet.handleAddSkillOptionClick({});
      expect(sheet.item._registeredUpdates).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              'data.skillOptions': [
                ...sheet.item.data.data.skillOptions,
                newItem.id,
              ],
            }),
          ]));
    });
  });

  describe('handleSkillOptionPickInputChange', () => {
    const sheet = new FocusSheet(focusConfig);
    WorldsItem.registerGame(new WorldsGame(WorldsDataWithMocks));

    it('enqueues a pick update for the correct item', () => {
      const updatedValue = 20;
      const id = 'skill_option_1';
      const targetItem = WorldsItem.get(id);
      const event = {
        currentTarget: {
          value: updatedValue,
        },
        _parents: new MockPageElement('', null, {id}),
      };

      sheet.handleSkillOptionPickInputChange(event);
      expect(targetItem._registeredUpdates).toEqual(
          expect.arrayContaining([
            expect.objectContaining({'data.pick': updatedValue}),
          ]),
      );
    });
  });

  describe('activateListeners', () => {
    it('registers buttons', () => {
      const sheet = new FocusSheet();
      const html = new TestableHtml();
      sheet.activateListeners(html);
      expect(Object.keys(html._activeListeners)).toHaveLength(2);
      expect(FocusSheet
          .AddSkillOptionButtonSelectorText in html._activeListeners)
          .toBe(true);
      expect(SkillOptionSheet
          .PickInputSelectorText in html._activeListeners)
          .toBe(true);
    });
  });
});
