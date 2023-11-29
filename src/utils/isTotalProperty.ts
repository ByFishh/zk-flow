import { ITotalProperty } from '../blockchains/types';

export const isTotalProperty = (property: any): property is ITotalProperty => {
  return property && typeof property.total === 'number';
};
