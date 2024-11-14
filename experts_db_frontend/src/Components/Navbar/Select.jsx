const Autocomplete = () => {
    const [options, setOptions] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleInputChange = (inputValue) => {
      setSearchString(inputValue);
      if (inputValue.length >= 1) {
        fetch(`${API_URL}/api/v1/navbar_search?q=${inputValue}`)
          .then(response => response.json())
          .then(data => {
            let options = [];
            if (data.mentors) {
              options = options.concat(data.mentors.options.map(option => ({ value: option.id, label: `m/${option.username}` })));
            }
            if (data.candidates) {
              options = options.concat(data.candidates.options.map(option => ({ value: option.id, label: `c/${option.username}` })));
            }
            if (data.batches) {
              options = options.concat(data.batches.options.map(option => ({ value: option.id, label: `b/${option.name}` })));
            }
            setOptions(options);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        setOptions([]);
      }
    };
  
    const handleSelection = (selectedOption) => {
      setSelectedOption(selectedOption);
      window.location.assign(`/search?q=${searchString}`);
    };
  
    return (
      <div className="w-80">
        <Select
          options={options}
          value={selectedOption}
          onInputChange={handleInputChange}
          onChange={setSelectedOption}
          placeholder={<span className="flex items-center"><BiSearch className="mr-2" /> Search</span>}
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: "#edeff1",
              borderRadius: "9999px",
              borderColor: state.isFocused ? "#3f51b5" : "#ccc",
              height: "40px",
              width: "100%",
              padding: "0.5rem 1rem",
            }),
          }}
        />
      </div>
    );
  };
  