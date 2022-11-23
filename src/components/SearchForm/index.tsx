import { memo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { ReactComponent as SearchIcon } from '../../assets/magnifying-glass.svg';
import { useAppDispatch } from '../../store';
import { fetchDestinationLatLng } from '../../store/userSlice';
import './searchForm.scss';

type Inputs = {
  destination: string;
};

const SearchForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<Inputs>();
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
    return dispatch(fetchDestinationLatLng(data.destination));
  };

  const changeHandler = async (e: any) => {
    const data = await fetchAutoCompleteData(e.target.value);
    setAutoCompletes(data);
  };
  console.log(autoCompletes);

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
      <ul className="absolute top-16 left-16  flex flex-col content-start items-start justify-start bg-white">
        {autoCompletes?.length
          ? autoCompletes.map((item, index) => {
              return (
                <li className="z-[1000] flex h-8 w-[18rem] flex-wrap items-center bg-white py-4 text-xs text-gray-80">
                  <button>{item.label}</button>
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
};

export default memo(SearchForm);
