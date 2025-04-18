import connect from "connect";
import cors from "cors";
import { createFakeMiddleware, createLogger } from "vite-plugin-fake-server-turbo";

const loggerOutput = createLogger("warn", {
	allowClearScreen: false,
	// customLogger: undefined,
});

async function main() {

	const app = connect();
	app.use(cors());
	const middleware = await createFakeMiddleware(
		{
			...{
  "include": [
    "mock"
  ],
  "exclude": [
    "_*"
  ],
  "infixName": "fake",
  "extensions": [
    "ts",
    "js",
    "mjs",
    "cjs",
    "cts",
    "mts"
  ],
  "enableProd": false,
  "enableDev": false,
  "watch": true,
  "logger": false,
  "basename": "/api",
  "headers": {},
  "build": {
    "port": 8888,
    "outDir": "distMockServer"
  },
  "http2": true,
  "cors": true
},
			loggerOutput,
			// config.root
			root: process.cwd(),
		},
		app
	);
	app.use(middleware);

	app.listen(8888);
	console.log("listen: http://localhost:8888");
}

main();
