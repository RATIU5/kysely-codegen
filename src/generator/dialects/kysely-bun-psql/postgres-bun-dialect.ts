import type { DateParser } from '../../../introspector/dialects/kysely-bun-psql/date-parser';
import type { NumericParser } from '../../../introspector/dialects/kysely-bun-psql/numeric-parser';
import { PostgresBunIntrospectorDialect } from '../../../introspector/dialects/kysely-bun-psql/postgres-bun-dialect';
import type { GeneratorDialect } from '../../dialect';
import { PostgresBunAdapter } from './postgres-bun-adapter';

export type PostgresBunDialectOptions = {
  dateParser?: DateParser;
  defaultSchemas?: string[];
  domains?: boolean;
  numericParser?: NumericParser;
  partitions?: boolean;
};

export class PostgresBunDialect
  extends PostgresBunIntrospectorDialect
  implements GeneratorDialect
{
  readonly adapter: PostgresBunAdapter;

  constructor(options?: PostgresBunDialectOptions) {
    super({
      dateParser: options?.dateParser,
      defaultSchemas: options?.defaultSchemas,
      domains: options?.domains,
      numericParser: options?.numericParser,
      partitions: options?.partitions,
    });

    this.adapter = new PostgresBunAdapter({
      dateParser: this.options.dateParser,
      numericParser: this.options.numericParser,
    });
  }
}
