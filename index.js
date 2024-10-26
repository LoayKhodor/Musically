import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();
app.set("view engine", "ejs");
const client_id =
  "K5Rup7Vh5gYAmafNxQSygV_4zUm2wmO_GQLrGBNvz8taseaq2vq3OJxpWIgzHp7q";
const client_key =
  "kGJvyl-CCDJR0TzwxGVfe-ffnhR8EBfoCJb4K_uD5XZFtD_4sK_A9SSdhcvNViTLqZ51oQNGdAT4PbVKDANJfw";
const access_token =
  "uHbeSXX_1Z76yBaGufw7akMSRmAn1YAEgam5UeHinTjrmg3F7d7QJejx8846ktz9";
const API_URL = "https://api.genius.com/";
const yourBearerToken =
  "EYI8StO4vxjLFN6sBVBgjVBuKmdHdcIHrxZpfEFaCn-3qg81t1TYgmzR-hCAQsCo";

const config = {
  client: {
    id: client_id,
    secret: client_key,
  },
  auth: {
    tokenHost: "https://api.oauth.com",
  },
};

// const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  var alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
  ];
  var randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  // console.log(`${API_URL}search?q=${randomLetter}`);
  try {
    const response = await axios.get(`${API_URL}search?q=${randomLetter}`, {
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
    res.render("index.ejs", { content: response.data, searchBoolean: false });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}search?q=${req.body["searchTerm"]}`,
      {
        headers: { Authorization: `Bearer ${yourBearerToken}` },
      }
    );
    // console.log(`${API_URL}search?q=${req.body["searchTerm"]}`);
    // console.log(response.data["response"]["hits"]);
    res.render("index.ejs", { content: response.data, searchBoolean: true }); //show as string cuz we show the whole json
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});
app.listen(port, () => {
  // console.log(`Listening to port ${port}`);
});
