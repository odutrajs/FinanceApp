export const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (active && payload && payload.length > 0) {
    const item = payload[0];
    return (
      <div className="bg-white p-2 rounded-xl shadow-md border text-xs flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: item.payload.cor }}
        />
        <span className="capitalize text-gray-800">{item.payload.name}</span>
        <span className="ml-auto font-semibold text-gray-900">
          R$ {item.payload.value.toFixed(2)}
        </span>
      </div>
    );
  }

  return null;
};
