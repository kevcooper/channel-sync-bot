const Discord = require('discord.js')

const bot = new Discord.Client()

const config = require('./config')
const channels = require('./channels')

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
})

bot.login(config.token)

bot.on('message', msg => {
  // console.log(`recieved msg in ${msg.channel} (${msg.channel.guild})`)
  if (msg.author.id !== bot.user.id &&
    msg.channel.name in channels &&
    channels[msg.channel.name].includes(msg.channel.id)) {
    const forwardList = channels[msg.channel.name].filter(x => x !== msg.channel.id)

    console.log(`forwarding to ${forwardList}`)
    forwardList.forEach(id => {
      const channel = bot.channels.cache.get(id)
      channel.send(`Server: ${msg.guild}\nFrom: ${msg.author}\n${msg}`)
    })
  }
})
