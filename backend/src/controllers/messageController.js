const Message = require("../models/messageModel");
const User = require("../models/userModel");

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("sender", "username");
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { userId, content, chatType, participants, repliedTo } = req.body;

    const newMessage = new Message({
      sender: userId,
      content,
      participants,
      chatType,
      repliedTo,
      createdAt: Date.now(),
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const reactToMessage = async (req, res) => {
  try {
    const { messageId, reaction, userId } = req.body;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const existingReactionIndex = message.reactions.findIndex(
      (react) => react.user.toString() === userId
    );

    if (existingReactionIndex === -1) {
      message.reactions.push({ user: userId, reaction });
    } else {
      message.reactions[existingReactionIndex].reaction = reaction;
    }

    await message.save();

    res.json({ message: "Reaction added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const replyToMessage = async (req, res) => {
  try {
    const { userId, content, chatType, participants, repliedTo } = req.body;

    const newMessage = new Message({
      sender: userId,
      content,
      participants,
      chatType,
      repliedTo,
    });

    await newMessage.save();
    res.status(201).json({ message: "Reply sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getMessages, sendMessage, reactToMessage, replyToMessage };
