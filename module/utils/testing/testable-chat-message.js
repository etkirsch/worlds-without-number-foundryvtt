/**
 * MockedChatMessage. Allows for test control of things such as dictating
 * the speaker of a message.
 */
class MockedChatMessage {
  /**
   * getSpeaker. Logs a getSpeaker message and returns a mocked object
   * for use in testing.
   * @param {Object} data The Object passed into ChatMessage.getSpeaker
   * @return {Object} A wrapper around this with the argument in place
   */
  static getSpeaker(data) {
    return {
      source: this,
      data,
    };
  }
};

export const TestableChatMessage = (typeof ChatMessage === 'undefined') ?
  MockedChatMessage :
  ChatMessage;
