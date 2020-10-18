/**
 * Mocked Dialog. Used for testing dialogues that are conveyed to the user.
 * This class allows for drilling into what buttons were clicked and what
 * values were selected.
 */
class MockedDialog {
  /**
   * constructor. Takes options similar to the way new Dialog() does.
   * @param {Object} options The options to build the MockedDialog
   */
  constructor(options) {
    this.title = options.title;
    this.content = options.content;
    this.buttons = options.buttons;
    this.default = options.default;
    this.close = options.close;
    this._wasDisplayed = false;
  }

  /**
   * render. A mocked implementation of Dialog.render() for
   * testing purposes.
   * @param {bool} shouldRender Indicates if the dialog should display
   */
  render(shouldRender) {
    if (shouldRender) {
      this._wasDisplayed = true;
    }
  }

  /**
   * callButton. Mimics the event of a button being clicked. For use
   * with testing only. Executes the callback of the button, so use
   * jest.fn where necessary.
   * @param {string} key The key of the button to be clicked
   * @param {HTML} html TestableHTML object injected into the callback
   */
  callButton(key, html) {
    this.buttons[key].callback(html);
  }
};

export const TestableDialog = (typeof Dialog === 'undefined') ?
  MockedDialog :
  Dialog;
