const { prefix } = require('../config.json') // For Prefix

const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
} // For Permissions Of A Member

module.exports = (client, commandOptions) => {
  let {
    commands, // For Command Name
    expectedArgs = '', // For Usage Of Command
    permissionError = 'You Dont Have Permission To Use This Command.', // Permission Error
    minArgs = 0,
    maxArgs = null,
    permissions = [], // Permission A Member Needs A Use Command
    requiredRoles = [], // Role A Member Needs To Use Command
    callback,
  } = commandOptions

  if (!commands) {
    return
  }

  // If A Command Is An Array
  if (typeof commands === 'string') {
    commands = [commands]
  }

  console.log(`Command Loaded:- ${commands[0]}`) // Command Loaded/Started

  // If Member Has Correct Permissions to Use Command
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }

  client.on('message', (message) => {
    const { member, content, guild } = message

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {

        // Member Has Required Permission to Use Command
        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            message.reply(permissionError)
            return
          }
        }

        // Member Has Required Role To Use Command
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          )

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `You must have the "${requiredRole}" role to use this command.`
            )
            return
          }
        }

        const arguments = content.split(/[ ]+/)

        arguments.shift()

        // Command Has Correct Arguments
        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          message.reply(
            `Incorrect Command Used! Use ${prefix}${alias} ${expectedArgs}`
          )
          return
        }

        callback(message, arguments, arguments.join(' '), client)

        return
      }
    }
  })
}
