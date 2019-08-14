import ModelValidator from './ModelValidator';

export default class SharedDocument extends ModelValidator {
  static className = 'SharedDocument';
  static schema = {
    name: String,
    extension: String,
    mimeType: String,
    userGroupId: {
      type: String,
      decrypted: true
    },
    uploadedBy: String,
    size: Number,
    content: String
  }
}
