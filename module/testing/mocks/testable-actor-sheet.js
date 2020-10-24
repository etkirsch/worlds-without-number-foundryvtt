import {TestableBase} from './testable-base.js';
import WorldsActor from '../../actors/worlds-actor.js';

/**
 * MockedActorSheet. Used for enabling Foundry ActorSheet objects
 * for testing in jest. The export of this file checks whether or
 * not the environment is a test environment. if so, the
 * MockedActorSheet is returned. If not, the regular FoundryVTT
 * ActorSheet is returned instead.
 */
class MockedActorSheet extends TestableBase {
  /**
   * The options value of this constructor allows you to pass in any
   * mocked data. Use at your own risk.
   * @param {object} options Optional mocked data options
   */
  constructor(options={}) {
    super();

    const mockOptions = {
      baseApplication: 'ActorSheet',
      classes: 'character',
      closeOnSubmit: false,
      dragDrop: [],
      editable: true,
      height: 720,
      id: '',
      left: null,
      minimizable: true,
      popOut: true,
      resizable: true,
      scrollY: [],
      submitOnChange: true,
      submitOnClose: true,
      tabs: [],
      template: 'systems/testable-system/testable-actor-sheet.html',
      title: '',
      top: null,
      width: 800,
    };

    this.actor = options.actor || new WorldsActor();
    this.options = options.options || mockOptions;
    this.cssClass = options.cssClass || 'basic-class';
    this.data = options.data || {};
    this.editable = ('editable' in options) ? options.editable : true;
    this.entity = options.entity || this.actor;
    this.items = options.itmes || [];
    this.limited = ('limited' in options) ? options.limited : false;
    this.owner = ('owner' in options) ? options.owner : true;
  }

  /**
   * Mocked getDefaultOptions() method. This will be more robust soon
   * @return {object} -- a dummy object
   */
  static get defaultOptions() {
    return {
      sheetType: 'mocked',
    };
  };

  /**
   * getData. Returns a mock of getData() for an ActorSheet. Should be
   * roughly identical in shape to that returned by a basic Actor Entity
   * in Foundry.
   * @return {Object} The sheet's mocked data
   */
  getData() {
    return {
      actor: this.actor,
      cssClass: this.cssClass,
      data: this.data,
      editable: this.editable,
      entity: this.entity,
      items: this.items,
      limited: this.limited,
      options: this.options,
      owner: this.owner,
    };
  }

  /**
   * activateListeners. Does nothing here.
   * @param {HTML} html This actor's computed template
   */
  activateListeners(html) {}
}

export const TestableActorSheet = (typeof ActorSheet === 'undefined') ?
  MockedActorSheet :
  ActorSheet;
