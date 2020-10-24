import {WorldsGame} from './utils/worlds-game.js';
import WorldsActor from './actors/worlds-actor.js';
import BasicCharacterSheet from './actors/basic-character-sheet.js';
import WorldsItem from './items/worlds-item.js';
import ItemModifierSheet from './items/item-modifier-sheet.js';
import SkillOptionSheet from './items/sub-items/skill-option-sheet.js';
import FocusSheet from './items/focus-sheet.js';

import {preloadTemplates} from './templates.js';

Hooks.once('init', async () => {
  console.log(
      '%c Launching Worlds Without Number [Foundry-VTT]',
      'background: #a72; color: #caea55');

  CONFIG.Actor.entityClass = WorldsActor;
  CONFIG.Item.entityClass = WorldsItem;

  WorldsItem.registerGame(new WorldsGame());

  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('wwn', BasicCharacterSheet, {makeDefault: true});

  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('wwn', FocusSheet, {makeDefault: true});
  Items.registerSheet('wwn', SkillOptionSheet);
  Items.registerSheet('wwn', ItemModifierSheet);

  preloadTemplates();
});
