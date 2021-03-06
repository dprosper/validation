import { CheckType } from "rsuite/lib/Schema";
import { ArrayType } from "rsuite/lib/Schema/ArrayType";

export type ErrorMessageFormatter =
  | string
  | ((field: string, placeholderValues?: { [key: string]: any }) => string);

export interface TypedErrorMessageFormatter {
  [type: string]: ErrorMessageFormatter;
}

export interface Messages {
  [key: string]: ErrorMessageFormatter | TypedErrorMessageFormatter;
}

export type MessageBag = Messages & {
  fields?: {
    [field: string]: string;
  };
};

export type TypeSlug =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "array"
  | "object";

export interface ParsedTypeRule {
  path: string;
  type: TypeSlug | undefined;
  rules: RuleType[];
  of?: ParsedTypeRule;
  shape?: {
    [prop: string]: ParsedTypeRule;
  };
}

export interface SchemaTypeAdaptor<T extends CheckType> {
  getType(): string;

  getSchemaType(): T;

  getFieldName(): string;

  applyRules(rules: RuleType[]): this;

  setArrayAdaptor(adaptor: SchemaTypeArrayAdaptor<T>): any;

  getArrayAdaptor(): SchemaTypeArrayAdaptor<T> | undefined;
}

export interface SchemaTypeArrayAdaptor<T extends CheckType>
  extends SchemaTypeAdaptor<ArrayType> {
  setItemAdaptor(adaptor: SchemaTypeAdaptor<T>): any;

  getItemAdaptor(): SchemaTypeAdaptor<T> | undefined;
}

export interface RuleInterface {
  check(field: string, value: any, data: any): boolean;

  errorMessage: ErrorMessageFormatter;
}

export type RuleType = string | RuleInterface;

type RulesExpression = string;

export interface RulesInput {
  [field: string]: RulesExpression | RuleType[];
}

interface Validator {
  getMessageBag(): MessageBag;
}

class Validator {}

export { Validator };
