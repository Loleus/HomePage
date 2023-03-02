const {ValidationError} = require('../utils/errors')
class PostRecord {
  constructor(obj) {
      const {id, date, title, lastEdit, text, picUrl} = obj;
      if (!id || typeof id !== 'string') {
        throw new ValidationError('ID nie może być puste!');
      }

      if(!title || typeof title !== 'string' || title.length < 3) {
        throw new ValidationError('Imię musi być tekstem o długości min. 3 znaków.');
      }

      if(!date || typeof date !== 'string' || date.indexOf('@') === -1) {
        throw new ValidationError('Edate Nieprawidłowy!');
      }

      if (typeof lastEdit !== 'string') {
        throw new ValidationError('Data następnego kontaktu musi być tekstem!')
      }

      if (typeof text !== 'string') {
        throw new ValidationError('Notatki muszą być tekstem!')
      }

      this.id = id;
      this.title = title;
      this.date = date;
      this.lastEdit = lastEdit;
      this.text = text;
      this.picUrl = picUrl;
  }
}

module.exports = {
  PostRecord,
}