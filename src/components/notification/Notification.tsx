
interface Props {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description: string;
};

const typeStyles = {
  success: 'bg-green-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500 text-black',
  error: 'bg-red-500',
};

export default function Notification({ type, message, description }: Props) {
  return (
    <div className={`rounded-md shadow-md p-4 text-white ${typeStyles[type]}`}>
      <div className="font-semibold">{message}</div>
      <div className="text-sm mt-1 opacity-90">{description}</div>
    </div>
  );
}
