const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  cardID: {
    type: String,
    default: function () {
      const min = 0;
      const max = 999999;
      const number = Math.floor(Math.random() * (max - min + 1)) + min;
      return String(number).padStart(6, "0");
    },
  },
  googleID: {
    type: String,
    require: function () {
      !facebookID || !email;
    },
  },
  facebookID: {
    type: String,
    require: function () {
      !googleID || !email;
    },
  },
  thumbnail: {
    type: String,
    default:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAADaCAMAAACbxf7sAAAAgVBMVEUAAAD////w8PD7+/vPz8+rq6v39/ewsLCWlpbt7e2MjIxTU1O/v7/Z2dnj4+O4uLjHx8djY2PT09Nzc3OhoaFxcXF/f3/f39+GhoZdXV2fn595eXmQkJBGRkbn5+dMTEwtLS1CQkI7Ozs0NDQQEBBpaWkYGBgeHh4mJiYVFRUpKSn4Bf0AAAAMx0lEQVR4nO1deV/iPBBekEMQBBQFxeVQWF2//wd8Lc0x6bTNTI6m+/76/GdsS542mTvJr18dOnTo0KFDhw4dOnTo0KFDh/8Bfl+2r+PZcjCfbzbz+WA5G79uL79T9yokjo/r5X2vEvfL9eMxdR+9cRnOqylCzIeX1H11xsuw5juWftvhS+o+8/G85JGUWO5S95yD3cCNZY7BP8L1sPBhmWPRfmm83fvTzLDfpmZSi3UYljnWqdlU4U+AMWti8Sc1pxKcg9O8Uj2n5lXEMAbNDMPUzAxMY9HMME3NTuFuEpNnrze5S80wxywuzQyz1Bx/8BifZoan1Dy9jD0OlklpvjRFM0NC1yaaTilHKk1zZrqb/rhPYj7cNU0zQwJFE9VGqEbj1kMUy5aCRbM8iSGvGHhokmcg79oN+8ZonvspefZ6/YaE7+dNWp693uizCZ5fyXn2ejcNME3/PTPEZ3oepeaYYxSbaGI5pNGPyzOpXjFxH5PnQ2p2EIN4PMepuZkYx+L5nJpZEc9xeB5S88KIk4tqhQI1cRODZ0KHpRrz8DxfU3Mqx2toni2coDkOgYm2xPLDCGwLJouc2BE0ttJooJqLkIHt1g7cDAEHb8MR+VLcV7/sYBH8jwb5VOG2znH6CER00xyfCtycag2WQGbDU3OEKnB1sutq7sJkT5NLojyYUKfhgsijt8YIadzMbneP27Gojfh77UdtsdZbAKLEvm3WwdJOA6UZD9nEFEZe/eP9eVKM+ck4mySnABx/sDeczOmPvM1RXyzhb9zb+jWaPedDK5AWKipF9XUt1pkvz9v6xz8c9aXnEDyra3Ut7/G28kYaLGEFo1YkAM/H6p5YMuyewYatpWNGyNGfZ/VnebUqOb8CX1vx2wZe7K1wKyO1FIE+8eFpdc+MpzNLAvfIeq3qBi1u7uOuWevCDJOEU46zv1ptpu6q1Pq0R3rUlhHkKLycESeUkxFKmGpxQpwT7kQtuqX4cHpdoC4XAmYAqKG/m09gFJ7oPrlrGMKkg5eT61lP4CY9/46qbZX9CcJ7xMVCzuLoN+Hh0Oety0E9TC9T+WGM8i81eEE3r8p7QXswhGuGgvJ8GFat9i/6eRdyrVxQeHLYaGLXDwo1F2EKXeEaU6HIgBW4vrI/qgYqy8cVhaMMSOnitzxrB74wtfjZMQtOCs5Dm63KjAK1XjPsI8sAxqrQAi4k11e6jV1S7A+Ow13xn8vnTAUalV5YrUtjXRMVZoq+5ItK1G3xE6leAYr0FfxHf3zt+U1BvZXUoYobdNznUCRKtqKdquf+st+hHmH3r++irW/M4lKIe7TiFN8YFMKRU7MuxXO0RD7MfLzLRjCeJ/aVHOImLYz+5A3v+hKyFe2S7Kepf8jjUzaC8bxBz/0ZK8veCNgMI3RT3gBGOTmy7LJAhmZgljqkYDy/Fx8rpiC4b4JuyhvAmCcblw4KhijpjC8mG2vrYvIHA7EhPhfQ9nkDiKrQF0vxawSJtTaGnJMyo3YA5V8HvHph7YLZntfhgfJ5eoETf3048dnGWJGFgsVIgTF+80uAT7ZEbydXbGDS0lca84usqPMf3iM1r5n0+bEjRlrsn9B9C/R28t8GY5lq7Lrkm6hPLns5Rj3iq9npP+g+YYEBQzEfzGAsM9IiXJ5HlwdL4QjH86rIQlyjl2+LeAoQa/lgBtY/I9txZBIl5wrhg6WDDIMikyILcY2et+JzAbE2K74cBlFuBpFcPwUdBpXZ001fiIXQz9ocEPIdDINx8eUwiHLjKWTNBb0R5e/opnfEQkisolcGh0EuZIFDypij3GocckQPOqRqGOgJKAOJ+iIhsbTCe0GX5EIWOKSMjSy4YpdcOw8dUvXigeJELAbF+36jS6bFBsYycq4RSH4wjDora+oOPQh1Ws+lI7pkV2zgVJbyeNKc0QzQIVWiGtjjwizUNugY3Sdu+ig+B11BAs8lpUQ6c0CbS6VqgMUpfBM9mNfoPnGT3osr9+C1Hj1xiMKgsR0r+wMFoAGvXg+wx0VCRg/mN3SfuKnokGrFxdpUxxrRMIDiXJWABrwyp0Cf58Wff0b3Cc0KLKHs55/RBTTw/BdbAljDEOeyEUzAQfHnn9B9YnRDefmxAzv88Cq6eAlhurtgGPCyEUzAWfHn79B90hf4qugML+/KM43oFfSG3pKNYAKOiz+PbSWZZ6pYqM6s6OIV4jAKV+FtcjKBCSgEiR7MQnNhz7tXFkhj+FG94i9RwFicBW+TgwxMQDEJsDbRDcoXKImk8dc38jJNjkRlch9MQCHWsDbRDWr4lCXn2TW0vGAKgygUIXK2gQm4QxzE+NYWjBYIuN6Cv00JjyhjjkJLpMTzFqYH8KKFn4Y87+y+gv12cKjo4Q1dhi0Cv4LyMkBf8wYgaMRg1ClkEFkdGSrGaREKTxgxFmjB2IUa8bpJZIxAiEGYEMjzziH10PnRcZtTnh5l6C6Y11EDAXneYNaKz649dqNs6x2+DBfwto1hrImFDqkyqOo8b/HZseedIZ8IPivheAk1hnkJ54Qykes8b/HZsefdU2aNT3k7b+dlxq5MUJwrpwd73rpBsMCet57JPouseXs7MaqpYdhNubHY89YhBsEC20pAVUm1sh/MxuPFgGPWH1lEGcELaM6ogYA9bz1rL3kDtpXgo97Wr1uguP7S3SkeTwZR6JCq5D72vPWIEm8De971i16Je0BwK7HpW2hAh1TF1LDnrWeteBvAVhIj01LLR1M53A036IrM6J5sxJ63nrVn1KMNuqkUJD+GW7VLN3aNsSIbsee9LV4EXpAYlTYNSNKu3HpAetDImP0yuY89b1R0AjIOwtiz1opTpil3DQFDkcLb5OjCnjeYtaPifQsiUUoQlr2Kn04UFoJIGYY97yG6SDeIeWL/GIQKMi5PRgQDBkBkkgR73gt0kW4Qo9u+b4/doeFXYdOdJGhzSWGNPe8lukjnWqRpax12drOBv1SCbopAK7ra835AF2HP+8a2WNueQOAvIKBLI5gDKEnuC7MZhBiEwtGyR/tKw2Ntp+zSyGG7VjJR6Okq9Ys8bxBiEFOywvMWEYvb8XI+ucpn4PDaN77g86QnX2FovNrzBuJJTEltH0DPW5iKMPqnP721uN5l/T45PgZtEVU+Uud5iympvxRYMSVekBEW02aWVXC41JqTJyl0SJXHDDxvZB9czE69jLUqE9JoVfED1loGpx2VqUShRL/IRux5o1d4HQk7Q43JQWoqcT10rcrdhSdZk8KdfZW0wJ63NqCEn7b49VaQA3K2mxEr/UGtBQduCw6pWW+YBDvJRux5a/EkpiSy55RVY8xQIAKsAW3H05yIRKHV9V3SPWEIYfFUhAqFA0J9aOlbu+LGkxq8MNYmyUYgoYQEEeLp/LysMM31c06KpmHnW0WR6yaX1KBjGVHseWf2wWpYE6IB7+Y46/dGm6EpQ+3WgvPOjx5ESzzvqWWEWPY7YS5PZoEod2GuTwb0sOdtheV72GO77qfCEPdUgz5HiedNJVrveBDCkh7L9mneN5xKMhMvTdvdjLyurK7S9kjICPvsoUz7GLAoTc7DzPM+rFkFCDVLBUli0Wu3FFIPoZpW0/qpSotUo7Qo5QdfND3nw5OWXJ9yb6hAuRr8Ij7Sb8dHUlYNjhmvvS9LktUrcsrg6EWUlJpQ5t4TXfKUo1DedhrSq1J8t/6mpAGug+a8DXHglt5Q42u3YNXeeO8STRAEs1/vr+E2SdwPZrMBu47K/xQYwiedRD7yj4IA2343dgScD0Jszt+GLUqtOAYg2ubdkiUC7ZqcmoYdYXgm2b2ThRA7d17RAqlaB6/94wy0dpP6HAFPlGi1PAp6GkryzYSrEXZH/iRHU9IQ+ADLNuzgXorgp6+2VPKGP+jw2/6jKVC1ns0DDZ1jzUPNfrzuaNkZWxkinbOV/gSCAspX7QVAy7RpvPMNuSscI+MYjWi77IaoR123SPRGEbgaiY7vxoh+oDe9GDIqfPffJ4C1+0MsuO1GykQLzsQLfv5dOZKP3gbGbQ7GEooY8DtMgYWLvTfxwFs36YmE4bLQpzZa8JnonOt+I6fPG0hyArR/dtABCRRqQ2qliMbPsAx5LiUPjZ4bHOE8YDoatB2CZZLc8EFfOuyFfagTKd3RyEdtzOirw2d0RfPQvPIsxyVq1GzUqM1nQcTx24pRCxApCxU8hxQAESL5kSLx3gj8Vdv4NSXegjk1/ehhPk/QC2zrsExn1jJw62kt7dsmaKvxsXbmul+nN/ZY+H5zMJge3r5T99sJqyHDj5sPeXsdtw2H6cJaTn2/mDYc8oqFr9V0uNygwpbJfDmcriLUW7QA36fD3Q8Op39zMnbo0KFDhw4dOnTo0CEZ/gOD4a/unPcedAAAAABJRU5ErkJggg==",
  },
  username: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    require: function () {
      !googleID || !facebookID;
    },
    unique: true,
    minLength: 8,
    maxLength: 60,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
    maxLength: 60,
  },
  role: {
    type: String,
    enum: ["reader", "admin"],
    default: "reader",
  },
  wallet: {
    type: Number,
    require: true,
    default: 0,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(\d{4}-\d{3}-\d{3})$/.test(value);
      },
      message: "Invalid phone number format. Please use XXXX-XXX-XXX format.",
    },
  },
});

// instance method => 用於middleware authenticate
userSchema.methods.isAdmin = function () {
  return this.role == "admin";
};
userSchema.methods.isReader = function () {
  return this.role == "reader";
};
userSchema.methods.comparePassword = async function (password, callback) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return callback(null, result);
  } catch (e) {
    return callback(e, result);
  }
};
// userSchema.pre("save", function)，執行完save動作後會再接續執行function的內容
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saultRound = 10;
    const hashValue = await bcrypt.hash(this.password, saultRound);
    this.password = hashValue;
  }
  next();
});

// 產生一個名稱為users的collection
module.exports = mongoose.model("User", userSchema);
