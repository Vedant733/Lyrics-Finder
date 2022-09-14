import axios from 'axios';
import { apiKey } from '../constants';

export const getLyrics = (track, artist) => {
    return fetch(`/matcher.lyrics.get?q_track=${track}&q_artist=${artist}&apikey=${apiKey}`,)
}