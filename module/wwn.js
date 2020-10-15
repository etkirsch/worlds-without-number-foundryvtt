import BasicCharacter from './actors/basic-character.js'
import BasicItem from './items/basic-item.js'
import ItemModifier from './items/item-modifier.js'

Hooks.once('init', async () => {
  Actors.unregisterSheet("core", ActorSheet)
  Actors.registerSheet("wwn", BasicCharacter, { makeDefault: true })

  Items.unregisterSheet("core", ItemSheet)
  Items.registerSheet("wwn", BasicItem, { makeDefault: true })
  Items.registerSheet("wwn", ItemModifier)
})
