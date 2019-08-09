import { Model } from 'blockstack';

export default class SharedDocument extends Model {
  static className = 'SharedDocument';
  static schema = {
    name: String,
    extension: String,
    mimeType: String,
    userGroupId: {
      type: String,
      decrypted: true
    },
    uploadedBy: String
  }
}
