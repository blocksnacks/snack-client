import { Model } from 'radiks';

const RADIKS_DEFAULT_PROPERTIES = [
  '_id',
  'radiksType',
  'createdAt',
  'updatedAt',
  'signingKeyId',
  'radiksSignature'
];

class ModelValidator extends Model {
  constructor(attrs = {}) {
    super(attrs);
    const allowedAttrsSet = new Set(RADIKS_DEFAULT_PROPERTIES.concat(Object.keys(this.schema)));
    Object.keys(attrs).forEach((attr) => {
      if (!allowedAttrsSet.has(attr)) {
        throw new Error(`${attr} is not in ${typeof this.modelName === 'function' ? this.modelName() : ''} schema`);
      }
    });
  } 
}

export default ModelValidator;
