import './SearchForm.css';

export default function SearchForm() {
    return (
        <section className="search-form" aria-label="Поиск по картотеке фильмов">
            <form className="search-form__form">
                <div className="search-form__search-wrapper">
                    <input
                        type="text"
                        className="search-form__input"
                        name="film-name"
                        required="required"
                        placeholder="Фильм" />
                    <button type="submit" className="search-form__button button" />
                </div>
                <label className="search-form__label-tumbler">
                    <input
                        type="checkbox"
                        className="search-form__tumbler"
                        name="checkbox" />
                    <span className="search-form__text-tumbler">Короткометражки</span>
                </label>
            </form>
        </section>
    );
}
