require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`fakebook server running on port ${PORT}`);
});
