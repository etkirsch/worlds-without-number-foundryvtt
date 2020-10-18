import DialogBuilder from '../dialog-builder.js';

describe('DialogBuilder', () => {
  describe('constructor', () => {
    it('calls reset()', () => {
      const builder = new DialogBuilder();
      expect(builder.data.title).toBe(DialogBuilder.DefaultDialogTitle);
      expect(builder.data.content).toBe(DialogBuilder.DefaultDialogContent);
      expect(builder.data.buttons).toBeInstanceOf(Object);
      expect(Object.keys(builder.data.buttons)).toHaveLength(0);
      expect(builder.data.default).toBe('');
    });
  });

  describe('reset', () => {
    it('clears set fields', () => {
      const builder = new DialogBuilder();
      builder.withButtons([{key: 'anyKey'}]);
      expect(Object.keys(builder.data.buttons)).toHaveLength(1);
      expect(builder.data.default).toBe('anyKey');

      builder.reset();
      expect(builder.data.title).toBe(DialogBuilder.DefaultDialogTitle);
      expect(builder.data.content).toBe(DialogBuilder.DefaultDialogContent);
      expect(builder.data.buttons).toBeInstanceOf(Object);
      expect(Object.keys(builder.data.buttons)).toHaveLength(0);
      expect(builder.data.default).toBe('');
    });
  });

  describe('withTitle', () => {
    it('sets title', () => {
      const builder = new DialogBuilder();
      expect(builder.data.title).toBe(DialogBuilder.DefaultDialogTitle);
      builder.withTitle('any title');
      expect(builder.data.title).toBe('any title');
    });
  });

  describe('withContent', () => {
    it('sets content', () => {
      const builder = new DialogBuilder();
      expect(builder.data.content).toBe(DialogBuilder.DefaultDialogContent);
      builder.withContent('any content');
      expect(builder.data.content).toBe('any content');
    });
  });

  describe('withButton', () => {
    it('adds a button and sets it to default when it is first', () => {
      const builder = new DialogBuilder();
      builder.withButton({key: 'anyKey'});
      expect(Object.keys(builder.data.buttons)).toHaveLength(1);
      expect(builder.data.default).toBe('anyKey');
    });

    it('adds a button and does not set as default when not first', () => {
      const builder = new DialogBuilder();
      builder.withButton({key: 'anyKey'});
      expect(builder.data.default).toBe('anyKey');

      builder.withButton({key: 'anyOtherKey'});
      expect(Object.keys(builder.data.buttons)).toHaveLength(2);
      expect(builder.data.default).toBe('anyKey');
    });
  });

  describe('withButtons', () => {
    it('assigns a array of buttons when none already set', () => {
      const builder = new DialogBuilder();
      builder.withButtons([
        {key: 'keyone'},
        {key: 'keytwo'},
      ]);
      expect(Object.keys(builder.data.buttons)).toHaveLength(2);
      expect(builder.data.default).toBe('keyone');
    });

    it('overwrites existing buttons when called', () => {
      const builder = new DialogBuilder();
      builder.withButton({key: 'alreadyset'});
      builder.withButtons([
        {key: 'keyone'},
        {key: 'keytwo'},
      ]);
      expect(Object.keys(builder.data.buttons)).toHaveLength(2);
      expect(builder.data.default).toBe('keyone');
    });

    it('does not set default if array is empty', () => {
      const builder = new DialogBuilder();
      builder.withButton({key: 'alreadyset'});
      builder.withButtons([]);
      expect(Object.keys(builder.data.buttons)).toHaveLength(0);
      expect(builder.data.default).toBe('');
    });
  });

  describe('withDefault', () => {
    it('sets default, regardless of key presence', () => {
      const builder = new DialogBuilder();
      const nonexistentKey = 'this-key-does-not-exist';
      builder.withDefault(nonexistentKey);
      expect(builder.data.default).toBe(nonexistentKey);
    });
  });

  describe('withCloseCallback', () => {
    it('sets callback appropriately', () => {
      const builder = new DialogBuilder();
      const callbackMock = jest.fn();
      builder.withCloseCallBack(callbackMock);
      builder.data.close();
      expect(callbackMock).toHaveBeenCalled();
    });
  });

  describe('build', () => {
    it('builds a dialog with the settings defined', () => {
      const newTitle = 'New Title';
      const newContent = 'new content';

      const dialog = new DialogBuilder()
          .withButtons([{key: 'anyKey'}])
          .withTitle(newTitle)
          .withContent(newContent)
          .build();

      expect(dialog.title).toBe(newTitle);
      expect(dialog.content).toBe(newContent);
      expect(dialog.default).toBe('anyKey');
      expect(Object.keys(dialog.buttons)).toHaveLength(1);
    });

    it('does not reset if not specified', () => {
      const newTitle = 'New Title';
      const builder = new DialogBuilder();
      const dialog = builder
          .withTitle(newTitle)
          .build(false);

      expect(dialog.title).toBe(newTitle);
      expect(builder.data.title).toBe(newTitle);
    });

    it('resets if specified', () => {
      const newTitle = 'New Title';
      const builder = new DialogBuilder();
      const dialog = builder
          .withTitle(newTitle)
          .build(true);

      expect(dialog.title).toBe(newTitle);
      expect(builder.data.title).toBe(DialogBuilder.DefaultDialogTitle);
    });
  });
});
