import { useForm, SubmitHandler } from 'react-hook-form';
import { ReactComponent as SearchIcon } from '../../assets/magnifying-glass.svg';
import { useAppDispatch } from '../../store';
import { fetchDestinationLatLng } from '../../store/userSlice';
import './searchForm.scss';

type Inputs = {
  destination: string;
};

const SearchForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.destination.trim()) {
      alert('請輸入目的地'); // ======== pending: replace alert with toast
    } else {
      dispatch(fetchDestinationLatLng(data.destination));
    }
  };
  // console.log(watch('destination'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="destination"
        placeholder="Hi, 現在想去哪裡？"
        {...register('destination', {
          required: true,
        })}
      />
      <button onClick={handleSubmit(onSubmit)} className="submit-btn">
        <SearchIcon fill="#9a9a9a" />
      </button>
    </form>
  );
};

export default SearchForm;
