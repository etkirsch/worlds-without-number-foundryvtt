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
  }

  /**
   * find. Takes a selector and primes it for the click event. Returns
   * a mocked selector, which is tied to this._activeListeners using
   * the same selector text.
   * @param {string} selectorText Selector text for the new listener
   * @return {Object} The mocked page element
   */
  find(selectorText) {
    const pageElement = new MockPageElement(selectorText);
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
   */
  constructor(selectorText) {
    this.selectorText = selectorText;
    this.callbackFunction = null;
  }

  /**
   * click. Registers a callback function as a listener for this page
   * element.
   * @param {Object} callbackFunction The function to call on click event
   */
  click(callbackFunction) {
    this.callbackFunction = callbackFunction;
  }
}

export const TestableHtml = (typeof Html === 'undefined') ?
  MockedHtml :
  Html;
