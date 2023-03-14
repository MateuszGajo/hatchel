import { port } from "./config";
import startApp from "./server";

startApp().listen(port, () => console.log(`Server is running on port ${port}`));
