interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'teal' | 'amber' | 'gray';
}

export function Badge({ children, variant = 'blue' }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export function getRoomVariant(room: string): 'amber' | 'blue' | 'teal' {
  if (room.includes('VIP')) return 'amber';
  if (room.includes('Mawar')) return 'blue';
  return 'teal';
}
