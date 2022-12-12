import { memo, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useAppDispatch } from '../../store';
import { fetchDestinationLatLng } from '../../store/userSlice';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ReactComponent as SearchIcon } from '../../assets/magnifying-glass.svg';
import AutoCompleteList from './AutoCompleteList';
import './searchForm.scss';

type SearchFormProps = {
  toggleSidebarHandler: (input: boolean) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ toggleSidebarHandler }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const window = useWindowDimensions();
  const dispatch = useAppDispatch();
  const [autoCompletes, setAutoCompletes] = useState<any[] | void>([]);
  const provider = new OpenStreetMapProvider();

  const fetchAutoCompleteData = async (input: string) => {
    try {
      const results = await provider.search({ query: input });
      return results;
    } catch (error) {
      return console.log(error);
    }
  };

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const data = await fetchAutoCompleteData(e.target.value);
    setAutoCompletes(data);
  };

  const clickAutoCompleteHandler = (text: string) => {
    setSearchInput(text);
    setAutoCompletes([]);

    if (window.width > 640) {
      toggleSidebarHandler(true);
    }
    dispatch(fetchDestinationLatLng(text));
  };

  const mouseEnterHandler = (text: string) => {
    setSearchInput(text);
  };

  const submitHandler = (input: string) => {
    if (!input.trim()) return toast.error('請輸入目的地', { position: 'bottom-center' });
    setAutoCompletes([]);

    if (window.width > 640) {
      toggleSidebarHandler(true);
    }

    return dispatch(fetchDestinationLatLng(input));
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={() => submitHandler(searchInput)}
        className="relative"
        data-testid="search-form"
        id="search-form"
      >
        <input
          type="text"
          id="destination"
          placeholder="Hi, 現在想去哪裡？"
          autoComplete="off"
          value={searchInput}
          onChange={changeHandler}
        />
        <button onClick={() => submitHandler(searchInput)} className="submit-btn">
          <SearchIcon fill="#9a9a9a" />
        </button>
      </form>
      {autoCompletes?.length ? (
        <ul
          id="geo-search-ul"
          className="absolute top-14 left-16 flex flex-col content-start items-start justify-start bg-white"
        >
          {autoCompletes.slice(0, 5).map((item) => {
            return (
              <AutoCompleteList
                data={item}
                onClick={clickAutoCompleteHandler}
                onMouseEnter={mouseEnterHandler}
              />
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default memo(SearchForm);
