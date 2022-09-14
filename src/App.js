import FindLyrics from './components/FindLyrics';
import { primary } from './constants';
import logo from './logo.svg';

function App() {
  return (
    <div style={{ color: primary, textAlign: 'center' }}>
      <h1>Lyrics Finder</h1>
      <h4>Getting Your favourite Song's Lyrics At A Click Away.</h4>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FindLyrics />
      </div>
    </div>
  );
}

export default App;
