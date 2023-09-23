import DatePicker from "@/components/DatePicker";
import { enUS, faIR } from "date-fns-jalali/locale";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <DatePicker
        locale={faIR}
        defaultValue={new Date()}
        onChange={(date) => {
          console.log(date);
        }}
      />
    </div>
  );
}
