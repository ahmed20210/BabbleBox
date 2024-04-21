import redisClient from "helpers/connectRedis";
import {
  TOGGLE_MESSAGE_REACT,
  TOGGLE_PIN_MESSAGE,
  DELETE_MESSAGE,
  READ_MESSAGE,
} from "sockets/chat.socket";
const saveMessage = async (message, userId) => {
  const stringifiedMessage = JSON.stringify(message);

  await redisClient.rPush(`messages:${userId}`, stringifiedMessage);
};

const togglePinMessage = async (Message, userId) => {
  const stringifiedMessage = JSON.stringify(Message);

  await redisClient.rPush(`tooglePinnedMessages:${userId}`, stringifiedMessage);
};

const saveReactedMessage = async (message, userId) => {
  const stringifiedMessage = JSON.stringify(message);
  await redisClient.rPush(`reactedMessages:${userId}`, stringifiedMessage);
};

const deleteMessage = async (messageId, userId) => {
  const stringifiedDeleteEvent = JSON.stringify({ messageId, userId });
  await redisClient.rPush(`deleteEvents:${userId}`, stringifiedDeleteEvent);
};

const sendSavedMessages = async (userId, socket) => {
  const messages = JSON.parse(
    await redisClient.lPop(`messages:${userId}`, 0, -1)
  );
  messages.forEach((message) => {
    socket.emit(READ_MESSAGE, JSON.parse(message));
  });
  await redisClient.del(`messages:${userId}`);
};

const sendPinnedMessages = async (userId, socket) => {
  const messages = JSON.parse( await redisClient.lPop(
    `tooglePinnedMessages:${userId}`,
    0,
    -1
  ));
  messages.forEach((message) => {
    socket.emit(TOGGLE_PIN_MESSAGE, JSON.parse(message));
  });
  await redisClient.del(`tooglePinnedMessages:${userId}`);
};

const sendReactedMessages = async (userId, socket) => {
  const messages =  JSON.parse(await redisClient.lPop(`reactedMessages:${userId}`, 0, -1));
  messages.forEach((message) => {
    socket.emit(TOGGLE_MESSAGE_REACT, JSON.parse(message));
  });
  await redisClient.del(`reactedMessages:${userId}`);
};

const sendDeleteEvents = async (userId, socket) => {
  const messages =  JSON.parse(await redisClient.lPop(`deleteEvents:${userId}`, 0, -1));
  messages.forEach((message) => {
    socket.emit(DELETE_MESSAGE, JSON.parse(message));
  });
  await redisClient.del(`deleteEvents:${userId}`);
};

export {
  saveMessage,
  togglePinMessage,
  saveReactedMessage,
  deleteMessage,
  sendSavedMessages,
  sendPinnedMessages,
  sendReactedMessages,
  sendDeleteEvents,
};
