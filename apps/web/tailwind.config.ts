import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import base from "@repo/tailwind/web";

const config: Config = {
  content: [...base.content, "./src/**/*.{html,js,svelte,ts}"],
  presets: [base],
  safelist: ["dark"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: [...fontFamily.mono],
      },
    },
  },
};

export default config;
