type Text = number | string;

type Collection<Value> = { [key: Text | string]: Value };

export interface PropertyOption {
  id?: any;
  name: string;
  value: number;
}

enum PropertyValues {
  LOW = 1,
  MEDIUM = 2,
  NORMAL = 4,
  HIGHT = 3,
}

export const PRIORITY: Collection<PropertyOption> = {
  LOW: { name: 'low', value: PropertyValues.LOW },
  MEDIUM: { name: 'normal', value: PropertyValues.MEDIUM },
  HIGHT: { name: 'hight', value: PropertyValues.HIGHT },
};

export const STATUS: Collection<PropertyOption> = {
  LOW: { name: 'done', value: PropertyValues.LOW },
  HIGHT: { name: 'in progress', value: PropertyValues.HIGHT },
  NORMAL: { name: 'todo', value: PropertyValues.NORMAL },
  MEDIUM: { name: 'open', value: PropertyValues.MEDIUM },
};

export const TYPE: Collection<PropertyOption> = {
  LOW: { name: 'feature', value: PropertyValues.LOW },
  HIGHT: { name: 'bug', value: PropertyValues.HIGHT },
  NORMAL: { name: 'fix', value: PropertyValues.NORMAL },
  MEDIUM: { name: 'planning', value: PropertyValues.MEDIUM },
};
