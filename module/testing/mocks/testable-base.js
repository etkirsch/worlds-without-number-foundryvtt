/**
 * TestableBase. The base class for anything that needs to be tested
 * in this module.
 */
export class TestableBase {
  /**
   * Constructor. Defines a random identifier.
   * @param {object} options
   */
  constructor(options={}) {
    this.id = options.id || this.getRandomId();
  }

  /**
   * getRandomId. Creates a random string of hexadecimal characters for
   * use in testing.
   * @return {string} a 12-length string of random hex characters
   */
  getRandomId() {
    const characters = '0123456789ABCDEF';
    const _length = 12;
    return new Array(_length).fill((x) => x).map(() => {
      const randomValue = Math.floor(Math.random() * characters.length);
      return characters[randomValue];
    }).join('');
  }
}
