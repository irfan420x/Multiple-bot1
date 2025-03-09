// const reference = {
//   object: "page",
//   entry: [
//     {
//       time: ,
//       id: "",
//       messaging: [
//         {
//           sender: { id: "" },
//           recipient: { id: "" },
//           timestamp: 1741508398163,
//           message: {
//             mid: "m_Tg9sZpJJW81uLfqDuEoWF5Q8lp_O9nzvFABhZGXb2gWfkSbAf6mMX1XOWYH9bU4bLMqPvAYPhLU8D-0XQokvqw",
//             text: "+",
//           },
//         },
//       ],
//     },
//   ],
// };

export function convertEvent(pageObject) {
  const pageEvent = pageObject;
  const { message } = pageEvent;
  const { reaction } = message;
  const event = {
    pageObject: message,
    type: reaction
      ? "message_reaction"
      : message.reply_to
      ? "message_reply"
      : "message",
    senderID: reaction ? pageEvent.recipient.id : pageEvent.sender.id,
    timestamp: pageEvent.time || pageEvent.timestamp,
    body: reaction ? "" : message.text,
    userID: reaction ? pageEvent.sender.id : null,
    messageID: reaction ? reaction.mid : message.mid,
    isPage: true,
    messageReply: {
      ...message.reply_to,
      messageID: message.reply_to.mid,
    },
    attachments: {
      ...message.attachments,
    },
    isWeb: false,
    fromWebhook: true,
    reaction: reaction.action === "react" ? reaction.emoji : "",
  };
  return event;
}
// this thing is also made by Liane Cagara for the sake of consistent structure
