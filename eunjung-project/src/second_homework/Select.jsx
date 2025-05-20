function Select({name, value, countryOptions, onChange}) {
    return (
        <select name={name} value={value} onChange={onChange}>
            <option value="default" disabled>
                지역을 선택해주세요.
            </option>
            {countryOptions.map((country,i)=>(
            <option key={i} value={country}>
                {country}
            </option>
            ))}
       </select>
    )
}

export default Select;