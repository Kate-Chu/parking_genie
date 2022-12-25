import React, { memo, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch } from '../../store';
import { fetchDestinationLatLng } from '../../store/userSlice';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ReactComponent as SearchIcon } from '../../assets/magnifying-glass.svg';
import './searchForm.scss';

type SearchFormProps = {
  toggleSidebarHandler: (input: boolean) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ toggleSidebarHandler }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const dispatch = useAppDispatch();
  const window = useWindowDimensions();

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      return toast.error('請輸入目的地', { position: 'bottom-center' });
    }

    if (window.width > 640) {
      toggleSidebarHandler(true);
    }

    return dispatch(fetchDestinationLatLng(searchInput));
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={(e) => submitHandler(e)}
        className="relative"
        data-testid="search-form"
        id="search-form"
      >
        <input
          type="text"
          id="destination"
          placeholder="Hi, 現在想去哪裡？"
          value={searchInput}
          onChange={changeHandler}
        />
        <button onClick={(e) => submitHandler(e)} className="submit-btn">
          <SearchIcon fill="#9a9a9a" />
        </button>
      </form>
    </>
  );
};

export default memo(SearchForm);
