// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default withNuxt(
  // Your custom configs here
  eslintPluginPrettierRecommended,
  includeIgnoreFile(gitignorePath),
  {
    rules: {
      'no-console': 'error',
      'vue/no-v-html': 'off',
      'prettier/prettier': [
        'warn',
        {
          $schema: 'https://json.schemastore.org/prettierrc',
          semi: false,
          tabWidth: 2,
          singleQuote: true,
          printWidth: 100,
          trailingComma: 'es5',
        },
      ],
    },
    files: ['**/*.vue', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
  }
)
