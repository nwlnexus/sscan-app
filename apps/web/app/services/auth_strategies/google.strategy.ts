// Refer to https://github.com/pbteja1998/remix-auth-google for more information
import { type AppLoadContext } from '@remix-run/cloudflare'
import { type Profile } from '@sscan/db/schema'
import { GoogleStrategy } from 'remix-auth-google'
import { AuthStrategies } from '@/services/auth_strategies'

export const googleStrategy = (context: AppLoadContext) =>
  new GoogleStrategy<Profile>(
    {
      clientID: context.cloudflare.env.GOOGLE_CLIENT_ID,
      clientSecret: context.cloudflare.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${context.cloudflare.env.CALLBACK_URL}/${AuthStrategies.GOOGLE}/callback`,
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
      // Do something with the tokens and profile
      return {}
    },
  )
