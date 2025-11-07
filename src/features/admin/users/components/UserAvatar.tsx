import Avatar from '@mui/material/Avatar';

export default function UserAvatar({ name, src }: { name: string; src?: string | null }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Avatar
      src={src || undefined}
      sx={{
        width: 150,
        height: 150,
        fontSize: 48,
        backgroundColor: '#1976d2',
      }}
    >
      {!src && initials}
    </Avatar>
  );
}
