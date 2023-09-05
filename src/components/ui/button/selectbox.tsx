const SelectYear = (props: IOptions) => {
  let options: Array<OptinoType> = new Array<OptinoType>();

  for (let i = props.from; i <= props.to; ++i) {
    options.push({ value: i.toString(), name: i.toString() + "년" });
  }

  return (
    <select>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectYear;
