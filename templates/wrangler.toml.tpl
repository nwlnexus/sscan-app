#:schema node_modules/wrangler/config-schema.json
name = "sscan-app"
send_metrics = false
compatibility_date = "2024-09-22"
compatibility_flags = ["nodejs_compat_v2"]
pages_build_output_dir = "./build/client"

[placement]
mode = "off"

[vars]
NODE_VERSION = "20"
AUTH0_DOMAIN="{{op://Dev/u2djddditxramzdmcemimb4lbq/DEV/AUTH0_DOMAIN}}"
AUTH0_CLIENT_ID="{{op://Dev/u2djddditxramzdmcemimb4lbq/DEV/AUTH0_CLIENT_ID}}"
GOOGLE_CLIENT_ID="{{op://Dev/u2djddditxramzdmcemimb4lbq/DEV/GOOGLE_CLIENT_ID}}"
APP_URL="{{op://Dev/u2djddditxramzdmcemimb4lbq/DEV/APP_URL}}"

[env.production.placement]
mode = "smart"

[env.production.vars]
NODE_VERSION = "20"
AUTH0_DOMAIN="{{op://Dev/u2djddditxramzdmcemimb4lbq/PROD/AUTH0_DOMAIN}}"
AUTH0_CLIENT_ID="{{op://Dev/u2djddditxramzdmcemimb4lbq/PROD/AUTH0_CLIENT_ID}}"
GOOGLE_CLIENT_ID="{{op://Dev/u2djddditxramzdmcemimb4lbq/PROD/GOOGLE_CLIENT_ID}}"
APP_URL="{{op://Dev/u2djddditxramzdmcemimb4lbq/PROD/APP_URL}}"