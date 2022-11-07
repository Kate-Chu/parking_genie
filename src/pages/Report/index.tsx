import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  comment: string;
};

const Report = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.comment);
  };

  return (
    <>
      <h1>Report</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="comment">
          評論
          <textarea
            id="comment"
            {...register('comment', {
              required: true,
            })}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Report;
