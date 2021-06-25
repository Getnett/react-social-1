import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventForm from '../../features/events/eventForm/EventForm';

import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import EventDetailed from '../../features/events/eventDetailed/EventDetailed';
import Sandbox from '../sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import { ToastContainer } from 'react-toastify';

function App() {
	const { key } = useLocation();
	return (
		<>
			<ToastContainer position="top-right" hideProgressBar />
			<ModalManager />
			<Route exact path="/" component={HomePage} />
			<Route
				path="/(.+)"
				render={() => (
					<>
						<NavBar />
						<Container className="main">
							<Route exact path="/sandbox" component={Sandbox} />
							<Route exact path="/events" component={EventDashboard} />
							<Route path="/events/:id" component={EventDetailed} />
							<Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
						</Container>
					</>
				)}
			/>
		</>
	);
}

export default App;
