import DatePicker from "@/components/DatePicker";
import { enUS, faIR, arDZ } from "date-fns-jalali/locale";

type Props = {};

export default function index({}: Props) {
  return (
    <div>
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
