// Refer to https://github.com/pbteja1998/remix-auth-google for more information
import { type AppLoadContext } from '@remix-run/cloudflare'
import { GoogleStrategy } from 'remix-auth-google'
import { AuthStrategies } from '@/services/auth_strategies'
import { type AuthProfile } from '@/types'

export const googleStrategy = (context: AppLoadContext) =>
  new GoogleStrategy<AuthProfile>(
    {
      clientID: context.cloudflare.env.GOOGLE_CLIENT_ID,
      clientSecret: context.cloudflare.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${context.cloudflare.env.APP_URL}/auth/${AuthStrategies.GOOGLE}/callback`,
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
      // Do something with the tokens and profile
      return { user: null, redirectTo: null }
    },
  )
