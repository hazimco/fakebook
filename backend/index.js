const config = require("./utils/config");
const app = require("./app");

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`fakebook server running on port ${PORT}`);
});
