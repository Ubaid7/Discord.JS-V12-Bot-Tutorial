const { MessageEmbed, Util, MessageFlags } = require('discord.js')
const ytdl = require('ytdl-core')
const youtube = require('youtube-sr')
const ytpl = require('@distube/ytpl')

module.exports = {
    commands: ['play', 'pl'], // You Can Keep Any Name
    description: 'Plays Music', // Optional

    callback: async(message, args) => {

        const { channel } = message.member.voice // To Get Users Voice Channel
        if(!channel) return message.reply('You need To Be In A VC To Play Music.') // If User Is't In A VC
        const permissions = channel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.reply('I Dont Have Perms To Connect to The VC You Are In.') // If BOT Doesnot Has Connect Perms to Connect to VC.
        if(!permissions.has('SPEAK')) return message.reply('I Dont Have perms To Speak In The VC, How Can I PLay Music.') // If BOT Doensot Has Perms To Speak In VC.

        const ytRegex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi // If You Play Music Using YouTube Links
        const plRegex = /^.*(list=)([^#\&\?]*).*/gi // If you Play Music Using YouTube's PlayList
        const serverQueue = message.client.queue.get(message.guild.id)
        const argument = args.join(' ')
        const queueConstruct = { // Deafult Type For Volume etc...
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 50, // Default Volume
            playing: true,
            repeatMode: 0,
        }

        // Info About Music
        function createSong(title, url, duration, thumbnail) {
        const song = {
            "title": title,
            "url": url,
            "duration": duration,
            "thumbnail": thumbnail
        }
        return song
    }

    function announce(song, started, isPlaylist) {
        let e
        if(isPlaylist) { e = 'PlayList Added' } // If You Add A PlayList for Music
        else if(started) { e = 'Started Playing' } // If You Add Only Song or First Music
        else { e = 'Added To Queue'} // If You Add Other Music Then First Music

        const embed = new MessageEmbed()
        .setTitle(song.title) // Title Of Song
        .setURL(song.url) // URL Of The Song
        .setDescription(`Duration: ${song.duration}`) // Duration Of Music
        .setThumbnail(song.thumbnail)
        .addField(e, '<a:Next:803138566091309057>') // If The Music Is Playlist or First Music or Other.
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter('Song')
        return embed
    }

    if(ytRegex.test(argument) && plRegex.test(argument)) {
        message.reply('Songs Are Being Loaded, Wait...').then(async message => {
            // If Music Is PlayList:- PlayList Info
            if(!serverQueue) { message.client.queue.set(message.guild.id, queueConstruct) }
            try{
                const playlist = await ytpl(argument)
                for(video in playlist.items) {
                    let plSong = playlist.items[video] // Videos In PlayList
                    let song = createSong(Util.escapeMarkdown(plSong.title), plSong.url, plSong.duration,
                    plSong.thumbnail)
                    playSong(song, message, channel, serverQueue, true)
                }
                const playlistInfo = {
                    title: playlist.title.charAt(0).toUpperCase() + playlist.title.slice(1),
                    url: playlist.url,
                    thumbnail: playlist.items[0].thumbnail,
                    duration: 'Its A PlayList, So No Duration.'
                }
                message.channel.send(announce(playlistInfo, false, true))
                return message.delete()
            }
            catch (e) {
                message.channel.send('Invalid Playlist URL.') // If URL of PlayList Is Not Available
                message.client.queue.delete(message.guild.id)
                console.log(e)
                return message.delete()
            }
        })
    }
    else {
        // Music Info Is Played By URL
        let song
        if(ytdl.validateURL(argument)) {
            let e = await ytdl.getBasicInfo(argument)
            let songInfo = e.videoDetails
            let duration = new Date(songInfo.lengthSeconds * 1000).toISOString(). substr(11, 8)
            if(duration.startsWith('00:')) { duration = duration.replace('00:', '') }
            song = createSong(Util.escapeMarkdown(songInfo.title), songInfo.video_url, duration, songInfo.thumbnail.thumbnails[0].url)
        }
        else {
            // If Music Is Searched By Name
            let songInfo = await youtube.searchOne(argument)
            if(songInfo === null) { return message.reply('No Results Found.') }
            song  = createSong(Util.escapeMarkdown(songInfo.title), songInfo.url, songInfo.durationFormatted, songInfo.thumbnail.url)
        }
        playSong(song, message, channel, serverQueue, false)
    }

    async function playSong(song, message, vc, queue, ifPlaylist) {
        if(queue){ // Add Music To Queue
            queue.songs.push(song)
            if(!ifPlaylist) { message.channel.send(announce(song, false, false)) }
            return
        }
        message.client.queue.set(message.guild.id, queueConstruct)
        queueConstruct.songs.push(song)

        const play = async song => {
            const queue = message.client.queue.get(message.guild.id);
            if (!song) {
                message.guild.me.voice.channel.leave();
                message.client.queue.delete(message.guild.id);
                return;
            }
            let stream = ytdl(song.url, {
                filter: "audioonly",
                quality: "highestaudio"
            });

            const dispatcher = queue.connection.play(stream) 
                .on('finish', () => {
                    if (queue.repeatMode === 0) { queue.songs.shift(); }
                    else if (queue.repeatMode === 2) { queue.songs.push(queue.songs.shift()); }
                    else { null; }
                    play(queue.songs[0]);
                })
                .on('error', error => console.error(error));
            dispatcher.setVolumeLogarithmic(queue.volume / 100);
            if (!ifPlaylist) { queue.textChannel.send(announce(song, true, false)); }
        };

        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I Could't Join VC.\nError: ${error}`)
            message.client.queue.delete(message.guild.id)
            await channel.leave()
            return message.channel.send(`I Could't Join VC.\nError: ${error}`)
            }
        }
    }
}