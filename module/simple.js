import BasicActorSheet from './actor-sheet.js'

Hooks.once('init', async () => {
  Actors.unregisterSheet("core", ActorSheet)
  Actors.registerSheet("wwn", BasicActorSheet, { makeDefault: true })
})
