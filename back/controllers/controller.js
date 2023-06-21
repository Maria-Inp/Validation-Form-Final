const { mongoUser, mongoPass } = require('../config/config');
const { MongoClient, ServerApiVersion } = require('mongodb');
const {
  isEmailValid,
  isPasswordSecure,
  correctCharacters,
  isNumber
} = require('../utils/validation');

const uri = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.nfgsoiq.mongodb.net/?retryWrites=true&w=majority`;

class Controller {

  static get(req, res) {
    const client = new MongoClient(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
    );

    client.connect(async (err) => {
      if (err) console.log(err);

      const collection = client.db("setude").collection("users");
      const { user, offset } = req.query;
      const query = user ? { fullName: new RegExp(user) } : {};
      const count = await collection.countDocuments(query);

      collection.find(query).skip((parseInt(offset) - 1) * 4).limit(5).toArray((err, result) => {
        if (err) console.log(err);
        else {
          client.close();
          res.send({ users: result, count });
        }
      });
    });
  }

  static post(req, res) {

    const { fullName, studentNumber, email, password, repeatPass } = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    if(!email.trim() || !password.trim() || !repeatPass.trim() || !studentNumber.trim() || !fullName.trim()) {
        return res.status(400).send({ error: true, message: "هیچ فیلدی نمیتواند خالی باشد!"});
    }

    // email
    if (!isEmailValid(correctCharacters(email))) {
      return res.status(400).send({ error: true, message: "ایمیل وارد شده معتبر نمی باشد" });
    }
    
    // password
    if (!isPasswordSecure(password)) {
      return res.status(400).send({ error: true, message: "رمز عبور میبایست حداقل دارای 8 کاراکتر شامل حداقل یک حرف کوچک، حداقل یک حرف بزرگ، حداقل یک عدد و یک کاراکتر خاص از (!@#$%^&*) باشد" });
    }

    // repeat password
    if (password !== repeatPass) {
      return res.status(400).send({ error: true, message: "رمز عبور تطابق ندارد" });
    }
    
    // student number
    if (!isNumber(correctCharacters(studentNumber))) {
      return res.status(400).send({ error: true, message: "شماره دانشجویی نامعتبر" });
    }

    // username
    const isBetween = (length, min, max) => length < min || length > max ? false : true;

    if (!isBetween(correctCharacters(fullName).length, 3, 25)) {
      return res.status(400).send({ error: true, message: "طول نام کاربری باید بین 3 و 25 کاراکتر لاتین باشد" });
    }

    client.connect(async (err) => {
      if (err) console.log(err);

      const collection = client.db("setude").collection("users");

      collection.insertOne(req.body, (err, result) => {
        if (err) console.log(err);
        client.close();
        res.send({ success: true });
      });
    });
  }

}

module.exports = Controller;
