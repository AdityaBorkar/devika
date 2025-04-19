import { useNavigate } from 'react-router';

export default function HomePage() {
	const navigate = useNavigate();
	navigate('/dashboard');
	return <></>;
}
