import type { CreateKyselyDialectOptions } from '../../dialect';
import { IntrospectorDialect } from '../../dialect';
import type { DateParser } from './date-parser';
import { DEFAULT_DATE_PARSER } from './date-parser';
import type { NumericParser } from './numeric-parser';
import { DEFAULT_NUMERIC_PARSER } from './numeric-parser';
import { PostgresBunIntrospector } from './postgres-bun-introspector';

type PostgresBunDialectOptions = {
  dateParser?: DateParser;
  defaultSchemas?: string[];
  domains?: boolean;
  numericParser?: NumericParser;
  partitions?: boolean;
};

export class PostgresBunIntrospectorDialect extends IntrospectorDialect {
  protected readonly options: PostgresBunDialectOptions;
  override readonly introspector: PostgresBunIntrospector;

  constructor(options?: PostgresBunDialectOptions) {
    super();

    this.introspector = new PostgresBunIntrospector({
      defaultSchemas: options?.defaultSchemas,
      domains: options?.domains,
      partitions: options?.partitions,
    });
    this.options = {
      dateParser: options?.dateParser ?? DEFAULT_DATE_PARSER,
      defaultSchemas: options?.defaultSchemas,
      domains: options?.domains ?? true,
      numericParser: options?.numericParser ?? DEFAULT_NUMERIC_PARSER,
    };
  }

  async createKyselyDialect(options: CreateKyselyDialectOptions) {
    if (typeof Bun === 'undefined') {
      throw new ReferenceError(
        "Dialect '@ratiu5/kysely-bun-psql' is only available in a Bun environment.",
      );
    }

    const { BunDialect } = await import('@ratiu5/kysely-bun-psql');

    return new BunDialect({
      url: options.connectionString,
      tls: options.ssl,
    });
  }
}
