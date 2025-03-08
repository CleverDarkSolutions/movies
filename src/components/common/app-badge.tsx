interface AppBadgeProps {
    text: string;
}
const AppBadge = ({ text }: AppBadgeProps) => {
  return (
    <div className="rounded-full bg-secondary-dark text-white w-full h-6 mx-1 text-[14px] overflow-hidden text-center">
      {text}
    </div>
  );
};

export default AppBadge;
