module.exports = {
  root: true, // 프로젝트의 루트 디렉토리임을 명시
  env: {
    browser: true, // 브라우저 환경을 지원하도록 설정
    es2021: true, // ES2021 문법을 지원하도록 설정
  },
  extends: [
    'eslint:recommended', // ESLint의 기본 추천 설정 사용
    'plugin:@typescript-eslint/recommended', // TypeScript 지원을 위한 기본 추천 설정 사용
    'plugin:prettier/recommended', // Prettier와 ESLint의 충돌을 방지하고 Prettier 설정을 적용
  ],
  parser: '@typescript-eslint/parser', // TypeScript 파서를 사용
  parserOptions: {
    ecmaVersion: 12, // ECMAScript 2021 문법을 사용
    sourceType: 'module', // 모듈 시스템을 사용
  },
  plugins: ['@typescript-eslint', 'prettier'], // TypeScript와 Prettier 플러그인 사용
  rules: {
    // 네이밍 규칙
    camelcase: 'error', // 변수명은 CamelCase 사용
    'id-length': ['error', { min: 2, max: 30 }], // 변수명은 최소 2글자, 최대 30글자
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike', // 변수명 규칙 설정
        format: ['camelCase'], // camelCase 형식 사용
        custom: { regex: '^is[A-Z]', match: true }, // boolean 변수는 is로 시작
      },
      {
        selector: 'function',
        format: ['camelCase'], // 함수명은 camelCase 형식 사용
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'], // 타입명은 PascalCase 형식 사용
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // 작은 따옴표 사용
        semi: true, // 세미콜론 사용
        tabWidth: 2, // 들여쓰기는 2칸
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시를 강제하지 않음
  },
};
