const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.dcbrknd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log('connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3
    },
    number: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function (v) {
          return /\d{2,3}-\d{7}/.test(v);
        }
      }
    }
  })
personSchema.set('toJSON', {
  transform(document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Person', personSchema);