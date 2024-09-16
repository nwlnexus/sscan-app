// Refer to https://github.com/danestves/remix-auth-auth0 for more information
import { type AppLoadContext } from '@remix-run/cloudflare'
import { Auth0Strategy } from 'remix-auth-auth0'
import { AuthStrategies } from '@/services/auth_strategies'
import { type AuthProfile } from '@/types'

export const auth0Strategy = (context: AppLoadContext) =>
  new Auth0Strategy<AuthProfile>(
    {
      clientID: context.cloudflare.env.AUTH0_CLIENT_ID,
      clientSecret: context.cloudflare.env.AUTH0_CLIENT_SECRET,
      domain: context.cloudflare.env.AUTH0_DOMAIN,
      callbackURL: `${context.cloudflare.env.CALLBACK_URL}/${AuthStrategies.AUTH0}/callback`,
    },
    async ({ accessToken, refreshToken, profile, extraParams }) => {
      // Do something with the tokens and profile
      return { user: null, redirectTo: null }
    },
  )
