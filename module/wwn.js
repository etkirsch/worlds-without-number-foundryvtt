import BasicItem from './items/basic-item.js'
import ItemModifier from './items/item-modifier.js'

Hooks.once('init', async () => {
  Items.unregisterSheet("core", ItemSheet)
  Items.registerSheet("wwn", BasicItem, { makeDefault: true })
  Items.registerSheet("wwn", ItemModifier)
})
