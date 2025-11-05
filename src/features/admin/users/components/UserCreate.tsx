import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import PageContainer from './PageContainer';
import UserForm from './UserForm';
import { useCreateUserMutation } from '../hooks/useUsers';

export default function UserCreate() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const createMutation = useCreateUserMutation();

  const handleSubmit = (formData: FormData) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        navigate('/admin/users');
        enqueueSnackbar('User created!', { variant: 'success' });
      },
      onError: (err) => {
        enqueueSnackbar(
          err?.response?.data?.errors?.[0]?.msg || err.message || 'Failed to create user',
          { variant: 'error' },
        );
      },
    });
  };

  <UserForm onSubmit={handleSubmit} />;

  return (
    <PageContainer
      title="New Admin User"
      breadcrumbs={[{ title: 'Users', path: '/admin/users' }, { title: 'New' }]}
    >
      <UserForm onSubmit={handleSubmit} />
    </PageContainer>
  );
}
