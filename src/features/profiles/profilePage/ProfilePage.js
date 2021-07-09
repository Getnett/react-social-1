import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { getUserProfile } from '../../../app/firebase/firebaseFirestore';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import { listenToSelectedUserProfile } from '../profileActions';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';
import LoadingComponent from '../../../app/layout/LoadingComponent';
export default function ProfilePage({ match }) {
	const dispatch = useDispatch();
	const { selectedUserProfile } = useSelector((state) => state.profile);
	const { currentUser } = useSelector((state) => state.auth);
	const { loading, error } = useSelector((state) => state.async);

	useFirestoreDoc({
		query: () => getUserProfile(match.params.id),
		data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
		deps: [dispatch, match.params.id],
	});
	if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) return <LoadingComponent />;
	return (
		<Grid>
			<Grid.Column width={16}>
				<ProfileHeader profile={selectedUserProfile} isCurrentUser={selectedUserProfile.id === currentUser.uid} />
				<ProfileContent profile={selectedUserProfile} isCurrentUser={selectedUserProfile.id === currentUser.uid} />
			</Grid.Column>
		</Grid>
	);
}
