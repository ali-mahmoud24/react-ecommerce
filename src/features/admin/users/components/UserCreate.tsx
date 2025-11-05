import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import PageContainer from './PageContainer';
import UserForm from './UserForm';

export default function UserCreate() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await fetch('http://localhost:8000/api/v2/users', {
        method: 'POST',
        body: formData, // <-- send as form-data
      });

      if (!res.ok) throw new Error('Failed to create user');

      enqueueSnackbar('User created successfully!', { variant: 'success' });
      navigate('/admin/users');
    } catch (error) {
      enqueueSnackbar((error as Error).message, { variant: 'error' });
    }
  };

  return (
    <PageContainer
      title="New Admin User"
      breadcrumbs={[{ title: 'Users', path: '/admin/users' }, { title: 'New' }]}
    >
      <UserForm onSubmit={handleSubmit} />
    </PageContainer>
  );
}
