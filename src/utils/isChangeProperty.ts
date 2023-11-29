import { IChangeProperty } from '../blockchains/types';

export const isChangeProperty = (property: any): property is IChangeProperty => {
  return property && typeof property.change === 'number';
};
