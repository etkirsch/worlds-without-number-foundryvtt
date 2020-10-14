export default class BasicActorSheet extends ActorSheet {
	// pass

	static get defaultOptions () {
		return {
			...super.defaultOptions,
			classes: ["sheet", "actor"],
			template: "systems/worlds-without-number-foundryvtt/templates/actor-sheet.html"
		}
	}
}
