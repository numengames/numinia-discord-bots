// module.exports = async (message, client) => {
//   const textMessage = message.content.trim().slice(client.user.toString().length).trim();

//   const params = new URLSearchParams();
//   params.append('assistant', 'SENET_DUNGEON_WORLD_MASTER');
//   params.append('message', textMessage);

//   if (textMessage) {
//     try {
//       const response = await axios.post(SERVER_URL, params, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       });
//       const thread = message.channelId;
//       message.reply(response.data);
//     } catch (error) {
//       message.reply(error.message);
//     }
//   }
// }
