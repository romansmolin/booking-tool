// eslint.config.mjs
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import boundaries from 'eslint-plugin-boundaries'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
    { ignores: ['.next/**/*', 'node_modules/**/*', 'public/**/*'] },

    js.configs.recommended,

    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: { process: 'readonly' },
        },
        env: { node: true },
        linterOptions: { reportUnusedDisableDirectives: true },
        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin,
            boundaries,
            react: reactPlugin,
            'unused-imports': unusedImports,
        },
        settings: {
            // Make eslint-plugin-import understand TS + paths (`@/*`)
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                    alwaysTryTypes: true,
                },
                node: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
            },

            // FSD layers
            'boundaries/elements': [
                { type: 'app', pattern: 'src/app/**' },
                { type: 'processes', pattern: 'src/processes/**' },
                { type: 'views', pattern: 'src/views/**' },
                { type: 'widgets', pattern: 'src/widgets/**' },
                { type: 'features', pattern: 'src/features/**' },
                { type: 'entities', pattern: 'src/entities/**' },
                { type: 'shared', pattern: 'src/shared/**' },
            ],

            react: { version: 'detect' },
        },
        rules: {
            /* React niceties */
            'react/jsx-sort-props': [
                'warn',
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    multiline: 'last',
                    ignoreCase: true,
                    noSortAlphabetically: false,
                    reservedFirst: true,
                },
            ],

            /* Public API only (no deep imports across slices) */
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '@/(entities|features|widgets|views|processes)/*/*',
                                '@/(entities|features|widgets|views|processes)/*/*/*',
                            ],
                            message:
                                'Import via slice public API only (e.g., "@/entities/User"). Avoid deep paths like "@/entities/User/ui/...".',
                        },
                    ],
                },
            ],

            /* FSD dependency graph (top -> down) */
            'boundaries/element-types': [
                'error',
                {
                    default: 'disallow',
                    rules: [
                        {
                            from: 'app',
                            allow: [
                                'app',
                                'processes',
                                'views',
                                'widgets',
                                'features',
                                'entities',
                                'shared',
                            ],
                        },
                        {
                            from: 'processes',
                            allow: ['views', 'widgets', 'features', 'entities', 'shared'],
                        },
                        { from: 'views', allow: ['widgets', 'features', 'entities', 'shared'] },
                        { from: 'widgets', allow: ['features', 'entities', 'shared'] },
                        { from: 'features', allow: ['entities', 'shared'] },
                        { from: 'entities', allow: ['shared'] },
                        { from: 'shared', allow: ['shared'] },
                    ],
                },
            ],
            'boundaries/entry-point': 'off',

            /* Import resolution */
            'import/no-unresolved': 'error',

            /* Unused imports (autofixable removal) */
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },

    // Tests & stories: allow deep imports (common FSD exception)
    {
        files: [
            '**/*.{spec,test}.{ts,tsx,js,jsx}',
            '**/*.stories.{ts,tsx,js,jsx}',
            '**/.storybook/**/*.{ts,tsx,js,jsx}',
        ],
        rules: {
            'no-restricted-imports': 'off',
        },
    },

    // Configs & scripts: relax boundaries
    {
        files: ['**/*.config.{ts,js,mjs,cjs}', 'scripts/**/*.{ts,js,mjs,cjs}'],
        rules: {
            'boundaries/entry-point': 'off',
        },
    },
]
