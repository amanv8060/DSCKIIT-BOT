module.exports = {
  name: "lms",
  description: "Tells About Library Management System",
  run: async (client, message, args) => {
    message.author
      .send("Hey there , Let me tell me you a long Story , how This project began , who created and all ")
      .then((val) => {
        message.channel.send("Sent You a dm");
      })
      .catch((er) => {
        message.channel.send("Tried Sending You Dm  , but was unable to ");
      });
  },
  aliases: [],
};
