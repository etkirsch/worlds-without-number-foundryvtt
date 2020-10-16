import WorldsActor from './actors/worlds-actor.js';
import BasicCharacterSheet from './actors/basic-character-sheet.js';
import BasicItemSheet from './items/basic-item-sheet.js';
import ItemModifierSheet from './items/item-modifier-sheet.js';

Hooks.once('init', async () => {
  console.log(
      '%c Launching Worlds Without Number [Foundry-VTT]',
      'background: #a72; color: #caea55');

  CONFIG.Actor.entityClass = WorldsActor;

  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('wwn', BasicCharacterSheet, {makeDefault: true});

  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('wwn', BasicItemSheet, {makeDefault: true});
  Items.registerSheet('wwn', ItemModifierSheet);
});
