const express = require("express");
const cors = require("cors");
const monk = require("monk");

const app = express();

const db = monk("localhost/meower");
const mews = db.get("mews");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: "Meower"
  });
});

app.get('/mews', (req, res) => {
  mews
    .find()
    .then(mews => {
      res.json(mews);
    })
})

function isValidMew(mew) {
  return (
    mew.name &&
    mew.name.toString().trim() !== "" &&
    mew.content &&
    mew.content.toString().trim() !== ""
  );
}

app.post('/mews', (req, res) => {
  if (isValidMew(req.body)) {
    const mew = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()
    };

    mews
        .insert(mew)
        .then(createMew => {
            res.json(createMew);
        });

    console.log(mew);
  } else {
    res.status(422);
    res.json({
      message: "Hey! Name and Content is required!"
    });
  }
});

app.listen(5000, () => {
  console.log("Listening on localhost:5000");
});


function listAllMews() {
  fetch(API_URL)
    .then(response => response.json())
    .then(mews => {
      console.log(mews)
      mews.forEach(mew => {
        const div = document.createElement('div');

        const header = document.createElement('h3');
        header.textContent = mew.name;

        const contents = document.createElement('p');
        contents.textContent = mew.content;

        div.appendChild(header);
        div.appendChild(contents);

        mewsElement.appendChild
      })
    })
}
