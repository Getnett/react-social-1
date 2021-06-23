import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../common/modals/modalReducer';
import { decrement, increment } from './testReducer';
export default function Sandbox(props) {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.test.data);
	return (
		<div>
			<h1>Redux Simple example</h1>
			<h2>Data from store is :{data} </h2>
			<Button onClick={() => dispatch(increment(10))} content="increment" color="green" />
			<Button onClick={() => dispatch(decrement(5))} content="decrement" color="red" />
			<Button
				onClick={() => dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))}
				content="Open Modal"
				color="blue"
			/>
		</div>
	);
}
