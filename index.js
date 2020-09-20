const Discord = require('discord.js')

const bot = new Discord.Client()

const config = require('./config')
const channels = require('./channels')
console.log(channels)

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
})

bot.login(config.token)

const userBlocklist = []
const channelBlocklist = []

bot.on('message', msg => {
  if (!(msg.author.id in userBlocklist) &&
    !(msg.channel.id in channelBlocklist) &&
    msg.author.id !== bot.user.id &&
    msg.channel.id in channels) {
    const forwardList = channels[msg.channel.id]

    const log = { user_name: msg.author.username, user_tag: msg.author.tag, user_id: msg.author.id, channel_name: msg.channel.name, channel_id: msg.channel.id, server_name: msg.guild.name, server_id: msg.guild.id, forward_list: forwardList }
    console.log(JSON.stringify(log))
    forwardList.forEach(channelId => {
      const channel = bot.channels.cache.get(channelId)
      channel.send(`**<${msg.author.username}@${msg.guild}>**\n${msg.content.toString()}`, { disableMentions: 'all' })
    })
  }
})
