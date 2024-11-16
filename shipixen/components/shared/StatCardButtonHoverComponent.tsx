import clsx from 'clsx';

export const StatCardButtonHoverComponent = ({
  className,
  title,
  subtitle,
}: {
  className?: string;
  title?: string;
  subtitle: string;
}) => {
  return (
    <div
      className={clsx(
        'w-full flex gap-1 items-center justify-center text-center flex-wrap',
        className,
      )}
    >
      {title ? (
        <span className="w-full text-xs flex gap-1 items-center font-semibold">
          <span className="w-full truncate">{title}</span>
        </span>
      ) : null}

      <span className="text-[10px]">{subtitle}</span>
    </div>
  );
};
