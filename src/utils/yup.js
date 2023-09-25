import { object, string } from 'yup';

const queryMoviesSchema = object().shape({
    queryMovies: string().required('Нужно ввести ключевое слово'),
});

export { queryMoviesSchema };
