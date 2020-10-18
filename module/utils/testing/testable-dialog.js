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
  }

  /**
   * render. A mocked implementation of Dialog.render() for
   * testing purposes.
   * @param {bool} shouldRender Indicates if the dialog should display
   */
  render(shouldRender) {
  }
};

export const TestableDialog = (typeof Dialog === 'undefined') ?
  MockedDialog :
  Dialog;
