import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  // Diretórios e arquivos que o Jest irá buscar para rodar os testes
  roots: ['<rootDir>/src'],
  
  // Mapeamento de módulos para que o Jest entenda os caminhos absolutos (src/)
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Isso mapeia 'src/' para o diretório correto
  },
  
  // Definindo o transformador para o Jest trabalhar com arquivos TypeScript
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',  // Usando o ts-jest para transformar arquivos TypeScript
  },
  
  // Ambiente de testes
  testEnvironment: 'node',  // Usando ambiente Node.js para testes
  
  // Especificando arquivos de cobertura de testes
  collectCoverage: true,
  
  // Outras configurações de Jest podem ser adicionadas conforme necessário
};

export default config;
