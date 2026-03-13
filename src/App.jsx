import { useState, useCallback } from 'react';
import _ from 'lodash';
import './App.css';

const russianLanguageQuotes = [
  'Дивишься драгоценности нашего языка: что ни звук, то и подарок; всё зернисто, крупно, как сам жемчуг.',
  'Русский язык в умелых руках и в опытных устах — красив, певуч, выразителен, гибок, послушен, ловок.',
  'Русский язык неисчерпаемо богат и всё обогащается с быстротой поражающей.',
  'Русский язык открывается до конца в своих поистине волшебных свойствах лишь тому, кто любит свой народ.',
  'Язык народа — лучший, никогда не увядающий цвет всей его духовной жизни.',
  'Нет таких звуков, красок, образов и мыслей — сложных и простых, — для которых не нашлось бы выражения.',
  'Наш язык мудр: между выражением «я убеждён» и «я убедился» — большая разница.',
  'О великий, могучий, правдивый и свободный русский язык!',
];

function App() {
  const [quote, setQuote] = useState(null);
  const [history, setHistory] = useState([]);
  const [author, setAuthor] = useState('');

  const authors = ['Н.В. Гоголь', 'А.И. Куприн', 'М. Горький', 'К.Г. Паустовский', 'К.Д. Ушинский'];

  const getRandomQuote = useCallback(() => {
    const newQuote = {
      id: Date.now(),
      text: _.sample(russianLanguageQuotes),
    };
    const randomAuthor = _.sample(authors);
    
    setQuote(newQuote);
    setAuthor(randomAuthor);
    setHistory(prev => [newQuote, ...prev.slice(0, 4)]);
  }, []);

  const clearHistory = () => {
    setHistory([]);
    setQuote(null);
    setAuthor('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🇷🇺 Великие цитаты о русском языке</h1>
        <p>Мудрость классиков о нашем великом и могучем</p>
      </header>

      <main className="quote-container">
        {!quote ? (
          <div className="welcome">
            <div className="language-emoji">📖</div>
            <button onClick={getRandomQuote} className="primary-btn">
              Получить цитату
            </button>
          </div>
        ) : (
          <>
            <blockquote className="quote">
              <q>{quote.text}</q>
              <cite>— {author}</cite>
            </blockquote>
            <div className="actions">
              <button onClick={getRandomQuote} className="primary-btn">
                Новая цитата
              </button>
              <button onClick={clearHistory} className="secondary-btn">
                Очистить
              </button>
            </div>
          </>
        )}

        {history.length > 0 && (
          <section className="history">
            <h3>📜 История:</h3>
            <ul>
              {history.map((item) => (
                <li key={item.id} className="history-item">
                  {item.text}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer>
        <p>Powered by <strong>lodash</strong> • {history.length} цитат показано</p>
      </footer>
    </div>
  );
}

export default App;
