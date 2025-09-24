const express = require('express');
const morgan = require('morgan')
const app = express();

let phonebook =
  [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
  ]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
}

app.use(requestLogger);
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (request, response) => {
  response.json(phonebook);
})

app.get('/info', (request, response) => {
  const entryCount = phonebook.length;
  const currentTime = new Date();
  response.send('Phonebook has info for ' + entryCount + ' people. ' + currentTime);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = phonebook.find(p => p.id === id);
  if (person) {
    response.json(person);
  }
  else {
    response.status(404).end();
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter(p => p.id !== id);
  response.status(204).end();
})

const generateId = () => {
  const maxId = phonebook.length > 0
    ? Math.max(...phonebook.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: 'Name or number is missing' });
  }

  if (phonebook.find(p => p.name === name)) {
    return response.status(400).json({ error: 'Name must be unique' });
  }

  const newPerson = {
    id: generateId(),
    name,
    number
  }
  phonebook = phonebook.concat(newPerson);
  response.status(201).json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});