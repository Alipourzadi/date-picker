type Props = {
  days: string[];
};

export default function DaysOfWeek({ days }: Props) {
  return (
    <div className="grid grid-cols-7 gap-4 justify-between items-stretch pt-2">
      {days.map((day, index) => (
        <div className="text-xs text-center font-boldFamily" key={index}>
          {day}
        </div>
      ))}
    </div>
  );
}
