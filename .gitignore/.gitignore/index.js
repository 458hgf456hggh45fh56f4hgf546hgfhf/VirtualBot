const Discord = require('discord.js');



const client = new Discord.Client();

const token = process.env.token;

var prefix = "#";



const ytdl = require('ytdl-core');



const queue = new Map();



var servers = {};



client.login(token);



function play(connection, message) {

  

  var server = servers[message.guild.id];



  server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));



  server.queue.shift();



  server.dispatcher.on("end", function() { 

    if (server.queue[0]) play(connection, message);



    else connection.disconnect();



  });

}



client.on("ready", () => {



    console.log("Je suis prêt !");

    client.user.setGame(`#help | Version : 0.8`);



});



client.on('message', async message => { 



    if(message.content === "dgfdgfhggfghtrhtrhtrh54trht4h87th4rhrtgfdg"){

        message.reply("dgdfgdfgdfgfggdfggfdgdf");

        console.log('Le bot dit bonjour');

    }



    if(message.content === prefix + "help") {

      var aide_embed = new Discord.RichEmbed()
      
            .setTitle('ALERTE ROUGE ! :')

      .setDescription("CuBz (LE CREATEUR DE OVERSIGHT) A BESOIN DE VOUS ! CuBz SUR YOUTUBE VAS SE FAIRE DOUBLER PAR AYPIXEL VEUILLEZ VOUS ABONNER EN MASSE A CUBZ POUR QUE IL RESTE A SA PLACE ! AYPIXEL SALOPE !")

      message.channel.send(aide_embed);
	message.channel.send('https://cdn.discordapp.com/attachments/337175141588926467/559012941773406218/Capture.PNG')

    }



    if (!message.content.startsWith(prefix)) return;



    var args = message.content.substring(prefix.length).split(" ");



    switch (args[0].toLowerCase()) { 



        case " ":



        var userCreateDate = message.author.createdAt.toString().split(" ");

        var msgauthor = message.author.id;



        var stats_embed = new Discord.RichEmbed()

        .setColor("#6699FF")

        .setTitle(`Player Statistics : ${message.author.username}`)

        .addField(`Player ID :id:`, msgauthor, true)

        .addField(`Player registration date :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])

        .setThumbnail(message.author.avatarURL)

        message.reply("You can watch your private messages !")

        message.author.send(stats_embed);



        break;

        

  case "play":



    if (!args[1]) {



    message.channel.sendMessage("Vous devez me dire un lien YouTube"); 



    return;



  }



    if(!message.member.voiceChannel) {



    message.channel.sendMessage(":x: Vous devez être dans un salon vocal"); 



    return;



  }





    if(!servers[message.guild.id]) servers[message.guild.id] = {



    queue: []



  };





  var server = servers[message.guild.id];





  server.queue.push(args[1]);



  if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {



  play(connection, message) 



  });



  break; 



  case "skip":



    if(!message.member.voiceChannel) {



    message.channel.sendMessage(":x: Vous devez être dans un salon vocal"); 



    return;



  }



    var server = servers[message.guild.id];



    if(server.dispatcher) server.dispatcher.end();



    break;



  case "stop":



    if(!message.member.voiceChannel) 

    

    return message.channel.send(":x: Vous devez être dans un salon vocal");



    message.member.voiceChannel.leave();



    break;

  

  }
  
  if(message.content === prefix + "leave"){
      message.guild.leave()
  }
  
  
});
