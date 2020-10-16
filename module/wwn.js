import WorldsActor from './actors/worlds-actor.js';
import BasicCharacter from './actors/basic-character.js';
import BasicItem from './items/basic-item.js';
import ItemModifier from './items/item-modifier.js';

Hooks.once('init', async () => {
  console.log(
      '%c Launching Worlds Without Number [Foundry-VTT]',
      'background: #a72; color: #caea55');

  CONFIG.Actor.entityClass = WorldsActor;

  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('wwn', BasicCharacter, {makeDefault: true});

  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('wwn', BasicItem, {makeDefault: true});
  Items.registerSheet('wwn', ItemModifier);
});
