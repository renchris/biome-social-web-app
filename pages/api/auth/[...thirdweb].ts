import { ThirdwebAuth } from '@thirdweb-dev/auth/next'
import { PrivateKeyWallet } from '@thirdweb-dev/auth/evm'
import * as ethers from 'ethers'

// NOTE: This users map is for demo purposes. Its used to show the power of
// what you can accomplish with the Auth callbacks. In a production app,
// you would want to store this data somewhere externally, like a database or
// on-chain, as this in-memory map wont persist across requests.
const users: Record<string, any> = {}

const ethersGeneratedPrivateKey = ethers.Wallet.createRandom().privateKey
let thirdwebDomain
if (process.env.secrets) {
  const jsonStr = process.env.secrets.replace(
    /(\w+:)|(\w+ :)/g,
    (matchedStr) => `"${matchedStr.substring(0, matchedStr.length - 1)}":`,
  )
  const secretObject = JSON.parse(jsonStr)
  thirdwebDomain = secretObject.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN
} else {
  thirdwebDomain = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN
}

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: thirdwebDomain,
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ethersGeneratedPrivateKey),
  // NOTE: All these callbacks are optional! You can delete this section and
  // the Auth flow will still work.
  callbacks: {
    onLogin: async (address) => {
      // Here we can run side-effects like creating and updating user data
      // whenever a user logs in.
      if (!users[address]) {
        users[address] = {
          created_at: Date.now(),
          last_login_at: Date.now(),
          num_log_outs: 0,
        }
      } else {
        users[address].last_login_at = Date.now()
      }

      // We can also provide any session data to store in the user's session.
      return { role: ['admin'] }
    },
    onUser: async (user) => {
      // Here we can run side-effects whenever a user is fetched from the client side
      if (users[user.address]) {
        users[user.address].user_last_accessed = Date.now()
      }

      // And we can provide any extra user data to be sent to the client
      // along with the default user object.
      return users[user.address]
    },
    onLogout: async (user) => {
      // Finally, we can run any side-effects whenever a user logs out.
      if (users[user.address]) {
        users[user.address].num_log_outs += 1
      }
    },
  },
})

export default ThirdwebAuthHandler()
