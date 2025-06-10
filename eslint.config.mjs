import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import github from 'eslint-plugin-github'
import importPlugin from 'eslint-plugin-import'
import jest from 'eslint-plugin-jest'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'lib/**',
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.js',
      '*.mjs',
      '*.cjs'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        project: './tsconfig.json'
      },
      globals: {
        process: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      github,
      import: importPlugin,
      jest,
      prettier,
      stylistic
    },
    rules: {
      // GitHub plugin rules
      'i18n-text/no-en': 'off',
      'eslint-comments/no-use': 'off',

      // Import plugin rules
      'import/no-namespace': 'off',

      // TypeScript rules
      'no-unused-vars': 'off',
      'func-call-spacing': ['error', 'never'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
            constructors: 'no-public',
            methods: 'explicit',
            properties: 'explicit',
            parameterProperties: 'explicit'
          }
        }
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      semi: ['error', 'never'],
      'stylistic/type-annotation-spacing': 'error',
      '@typescript-eslint/unbound-method': 'error',

      // Prettier integration
      'prettier/prettier': 'error'
    }
  },
  {
    files: ['**/__tests__/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly'
      }
    }
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ...prettierConfig
  }
]
