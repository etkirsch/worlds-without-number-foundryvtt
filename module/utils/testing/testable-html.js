/**
 * Mocked HTML. Used for testing functions like ActorSheet's
 * activateListeners method. This tracks where listeners have been set
 * (based on selector text) and also the functions tied to them.
 */
class MockedHtml {
  /**
   * constructor. Takes no options. Establishes a dictionary with key
   * selector text and value the callback function
   */
  constructor() {
    this._activeListeners = {};
    this.mockedValues = {};
  }

  /**
   * find. Takes a selector and primes it for the click event. Returns
   * a mocked selector, which is tied to this._activeListeners using
   * the same selector text.
   * @param {string} selectorText Selector text for the new listener
   * @return {Object} The mocked page element
   */
  find(selectorText) {
    const mockedValue = (selectorText in this.mockedValues) ?
      this.mockedValues[selectorText] :
      null;

    if (selectorText in this._activeListeners) {
      return this._activeListeners[selectorText];
    }

    const pageElement = new MockPageElement(selectorText, mockedValue);
    this._activeListeners[selectorText] = pageElement;
    return pageElement;
  }
};

/**
 * MockPageElement. A mocked HTML Page element for use with MockedHTML.
 * Tracks its current selector text and the callback assigned to click.
 */
export class MockPageElement {
  /**
   * constructor. Generic constructor which takes a selectorText.
   * @param {string} selectorText Selector text for this page element
   * @param {any} mockedValue The mocked value for val()
   */
  constructor(selectorText, mockedValue) {
    this.selectorText = selectorText;
    this.callbackFunction = null;
    this._mockedValue = mockedValue;
  }

  /**
   * click. Registers a callback function as a listener for this page
   * element.
   * @param {Object} callbackFunction The function to call on click event
   */
  click(callbackFunction) {
    this.callbackFunction = callbackFunction;
  }

  /**
   * mimicClickEvent. Mocks a click event, calling the callback function.
   * @param {HTML} html The MockedHtml object which owns this.
   */
  mimicClickEvent(html) {
    this.callbackFunction(html);
  }

  /**
   * val. Mocked function return a value as specified in MockedHtml.
   * @return {any} The mocked value specified for this selector
   */
  val() {
    return this._mockedValue;
  }
}

export const TestableHtml = (typeof Html === 'undefined') ?
  MockedHtml :
  Html;
