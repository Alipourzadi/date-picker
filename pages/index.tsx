import DatePicker from "@/components/DatePicker";

type Props = {};

export default function index({}: Props) {
  return (
    <div>
      <DatePicker
        locale="fa"
        defaultValue={new Date()}
        onChange={(date) => {
          console.log(date);
        }}
      />
    </div>
  );
}
