import {TestableDialog} from '../../testing/mocks/testable-dialog.js';

/**
 * DialogBuilder. Simplifies the process for building and maintaining
 * dialogs in the Foundry System. To be used with Fluent Syntax.
 */
export default class DialogBuilder {
  /**
   * constructor. Sets up the data object, which houses the running
   * data aggregated via fluent syntax.
   */
  constructor() {
    this.reset();
  }

  /**
   * DefaultDialogTitle. The Default title text for a dialog.
   * @return {string} Title text
   */
  static get DefaultDialogTitle() {
    return 'Dialog Title';
  }

  /**
   * DefaultDialogContent. The default HTML string to be displayed in a
   * dialog without intervention.
   * @return {string} Default HTML
   */
  static get DefaultDialogContent() {
    return '<form>Basic dialog content</form>';
  }

  /**
   * reset. Resets the builder's data to constructor defaults.
   */
  reset() {
    this.data = {
      title: DialogBuilder.DefaultDialogTitle,
      content: DialogBuilder.DefaultDialogContent,
      buttons: {},
      default: '',
    };
  }

  /**
   * withTitle. Sets the title for this fluent chain.
   * @param {string} title The title of the dialog
   * @return {Object} The DialogBuilder (see the fluent pattern)
   */
  withTitle(title) {
    this.data.title = title;
    return this;
  }

  /**
   * withContent. Sets the content -- typically, sanitized HTML in a string
   * format -- that will be displayed above the dialog's buttons, if any.
   * @param {string} content Sanitized HTML that will be displayed
   * @return {Object} The DialogBuilder (see the fluent pattern)
   */
  withContent(content) {
    this.data.content = content;
    return this;
  }

  /**
   * withButton. Adds a button by a key. Note that this specifically
   * does not overwrite the previous button data. If this is the first
   * button added, the default will be set to this button's key.
   * @param {string} key The key for this button (used for defaults)
   * @param {string} label The label for the button to be added
   * @param {string} icon An icon for the button to be added
   * @param {Object} callback The callback function that is called on click
   * @return {Object} The DialogBuilder (see the fluent pattern)
   */
  withButton({key, label, icon, callback}) {
    if (Object.keys(this.data.buttons).length === 0) {
      this.data.default = key;
    }
    this.data.buttons[key] = {icon, label, callback};
    return this;
  }

  /**
   * withButtons. Overwrites the existing button configuration with an array
   * of buttons. Sets the default to the first button in the list.
   * @param {Array} buttons Array of buttons. See withButton for syntax.
   * @return {Object} The DialogBuilder (see the fluent pattern)
   */
  withButtons(buttons) {
    this.data.buttons = buttons;
    this.data.default = (buttons.length > 0) ?
      buttons[0].key :
      '';
    return this;
  }

  /**
   * withDefault. Explicitly sets the default value for buttons to a key.
   * Does NOT check for the key's existence, use at your own risk.
   * @param {string} key Default Button key
   * @return {Object} The DialogBuilder (see the fluent pattern)
   */
  withDefault(key) {
    this.data.default = key;
    return this;
  }

  /**
   * withCloseCallback. Sets a method to be called as the Dialog is closing.
   * @param {Object} method The callback function that is called at close
   * @return {Object} The DialogBuilder (see the fluent pattern)
   */
  withCloseCallBack(method) {
    this.data.close = method;
    return this;
  }

  /**
   * build. Builds a TestableDialog with all settings defined thus far.
   * @param {bool} andReset Optional flag to reset the dialog after built
   * @return {Object} A TestableDialog
   */
  build(andReset=false) {
    const dialog = new TestableDialog({
      ...this.data,
    });

    if (andReset) {
      this.reset();
    }

    return dialog;
  }
}
