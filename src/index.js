import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import favicon from 'serve-favicon';
import routes from './server/routes/index2';

// react stuff
import reactRoutes from './universal/react/routes/index';
import { server } from 'redouter';
import rootReducer from './universal/redux/root';
import createElement from './universal/react/createElement';

const app = express();

app.use(favicon(`./src/client/todo.png`));
app.use('/static', express.static('./src/client'));
app.use(bodyParser.urlencoded({extended: true})); // basic HTML form POST
app.use(bodyParser.json());

// because HTML, even 5, doesn't support form actions other than GET and POST
app.use(methodOverride(req => {
	// we use multiple techniques to detect the supposed method
	let method;

	if (req.query._method) {
		method = req.query._method;
		delete req.query._method;
	} else if (req.body._method) {
		method = req.body._method;
		delete req.body._method;
	}

	if (method) {
		console.log(`Method overriden - ${method}`);
	}
	
	return method;
}));

// insert redouter middleware
app.use(server.redouter({
	rootReducer,
	routes: reactRoutes,
	createElement,
	templater: (html, store) => `
<!DOCTYPE HTML>
${html}
 <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>
 <script async src="/static/bundle.js"></script>
`
}));
app.use(routes);

const serverInstance = app.listen(process.env.PORT || 3000, () => {
	const { address, family, port } = serverInstance.address();
	console.log(`
Server started.
Address: ${address}
Family: ${family}
Port: ${port}
`);

});