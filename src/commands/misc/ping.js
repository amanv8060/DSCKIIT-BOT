module.exports = {
	name:"ping",
	description: 'Ping!',
	run:async(client , message, args) =>{
		message.channel.send(`D-did I do it right? I responded in **${client.ws.ping} ms**.`);
	},
	aliases:[]
};