import { TooltipProps } from "recharts";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CustomTooltipProps extends TooltipProps<number, string> {}

export const CustomTooltip = (props: CustomTooltipProps) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark p-6 shadow rounded-2xl">
        <p className="label">{`${label}`}</p>
        <p
          className="intro"
          style={{ color: "#FFFFFF" }}
        >{`Precio: $${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
