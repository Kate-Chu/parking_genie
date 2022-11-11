import { memo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.destination.trim()) return toast.error('請輸入目的地');
    return dispatch(fetchDestinationLatLng(data.destination));
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} data-testid="search-form" id="search-form">
        <input
          type="text"
          id="destination"
          placeholder="Hi, 現在想去哪裡？"
          {...register('destination')}
        />
        <button onClick={handleSubmit(onSubmit)} className="submit-btn">
          <SearchIcon fill="#9a9a9a" />
        </button>
      </form>
    </>
  );
};

export default memo(SearchForm);
