const {ValidationError} = require('../utils/errors')

class PhotoRecord {
  constructor(obj) {
      const {id, createdAt, title, text, picId} = obj;
      if (!id || typeof id !== 'string') {
        throw new ValidationError('ID nie może być puste!');
      }

      if(!title || typeof title !== 'string' || title.length < 3) {
        throw new ValidationError('Imię musi być tekstem o długości min. 3 znaków.');
      }

      if (typeof text !== 'string') {
        throw new ValidationError('Notatki muszą być tekstem!')
      }

      this.id = id;
      this.title = title;
      this.createdAt = createdAt;
      this.text = text;
      this.picId = picId;
  }
}

module.exports = {
  PhotoRecord,
}