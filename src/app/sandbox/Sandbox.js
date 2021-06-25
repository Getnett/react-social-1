import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../common/modals/modalReducer';
import { decrement, increment } from './testReducer';
export default function Sandbox(props) {
	const [target, setTarget] = useState(null);
	const dispatch = useDispatch();
	const data = useSelector((state) => state.test.data);
	const { loading } = useSelector((state) => state.async);
	return (
		<div>
			<h1>Redux Simple example</h1>
			<h2>Data from store is :{data} </h2>
			<Button
				name="increment"
				loading={loading && target === 'increment'}
				onClick={(e) => {
					dispatch(increment(10));
					setTarget(e.target.name);
				}}
				content="increment"
				color="green"
			/>
			<Button
				name="decrement"
				loading={loading && target === 'decrement'}
				onClick={(e) => {
					dispatch(decrement(5));
					setTarget(e.target.name);
				}}
				content="decrement"
				color="red"
			/>
			<Button
				onClick={() => dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))}
				content="Open Modal"
				color="blue"
			/>
		</div>
	);
}
