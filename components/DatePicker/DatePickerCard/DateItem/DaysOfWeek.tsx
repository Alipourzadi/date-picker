type Props = {
  days: string[];
};

export default function DaysOfWeek({ days }: Props) {
  return (
    <>
      {days.map((day, index) => (
        <div className="text-xs text-center font-boldFamily" key={index}>
          {day}
        </div>
      ))}
    </>
  );
}
