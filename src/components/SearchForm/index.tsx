import { memo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useAppDispatch } from '../../store';
import { fetchDestinationLatLng, userActions } from '../../store/userSlice';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ReactComponent as SearchIcon } from '../../assets/magnifying-glass.svg';
import AutoCompleteList from './AutoCompleteList';
import './searchForm.scss';

type Inputs = {
  destination: string;
};

const SearchForm = () => {
  const window = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue } = useForm<Inputs>();
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.destination.trim()) return toast.error('請輸入目的地');
    setAutoCompletes([]);
    if (window.width > 640) {
      dispatch(userActions.toggleSidebar());
    }
    return dispatch(fetchDestinationLatLng(data.destination));
  };

  const changeHandler = async (e: any) => {
    const data = await fetchAutoCompleteData(e.target.value);
    setAutoCompletes(data);
  };

  const clickAutoCompleteHandler = (text: string) => {
    setValue('destination', text);
    setAutoCompletes([]);
    if (window.width > 640) {
      dispatch(userActions.toggleSidebar());
    }
    dispatch(fetchDestinationLatLng(text));
  };

  const mouseEnterHandler = (text: string) => {
    setValue('destination', text);
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative"
        data-testid="search-form"
        id="search-form"
      >
        <input
          type="text"
          id="destination"
          placeholder="Hi, 現在想去哪裡？"
          {...register('destination', {
            onChange: changeHandler,
          })}
        />
        <button onClick={handleSubmit(onSubmit)} className="submit-btn">
          <SearchIcon fill="#9a9a9a" />
        </button>
      </form>
      <ul className="absolute top-14 left-16  flex flex-col content-start items-start justify-start bg-white">
        {autoCompletes?.length
          ? autoCompletes.slice(0, 5).map((item) => {
              return (
                <AutoCompleteList
                  data={item}
                  onClick={clickAutoCompleteHandler}
                  onMouseEnter={mouseEnterHandler}
                />
              );
            })
          : null}
      </ul>
    </>
  );
};

export default memo(SearchForm);
