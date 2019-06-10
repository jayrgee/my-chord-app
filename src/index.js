import chordChart from './chordCharts/mickeyb.json';
import { renderChords } from './render-chords';

window.chords = renderChords(chordChart);
