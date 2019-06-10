import { ChordBox } from 'vexchords';
import chordChart from './mickeyb.json';

const chords = [];

function createChordElement(chordStruct) {
  const chordbox = $('<div>').addClass('chord');
  const chordcanvas = $('<div>');
  const chordname = $('<div>').addClass('chordname');
  const heading = $('<h3>').append(chordStruct.name);
  const number = $('<span>')
    .addClass('chordlabel')
    .append(chordStruct.number);

  const position = chordStruct.position || 0;
  const positionText = chordStruct.positionText || 0;
  const offset =
    positionText > 0
      ? position - positionText - 1
      : position > 0
        ? position - 1
        : position;

  const newChord = {
    el: chordcanvas[0],
    struct: chordStruct,
    frets: chordStruct.chord
      .map(x => x[1]) // assumes chord string order is 1,2,3,4,5,6
      .reverse()
      .map(x => (x === 'x' ? x : x + offset))
  };

  chords.push(newChord);

  const chordnotes = $('<p>')
    .addClass('chordfrets')
    .append(newChord.frets.toString());

  chordname.append(number);
  chordname.append(heading);
  chordbox.append(chordname);
  chordbox.append(chordcanvas);
  chordbox.append(chordnotes);

  return chordbox;
}

function createSectionElement(sectionStruct) {
  const section = $('<div>').addClass('section');
  const sectionTitle = $('<div>').addClass('title');
  const sectionDesc = $('<div>').addClass('description');

  section.append(sectionTitle);
  section.append(sectionDesc);
  sectionTitle.append(sectionStruct.section);
  sectionDesc.append(sectionStruct.description);

  return section;
}

function init() {
  const container = $('#container');

  // Display chordChart
  for (let i = 0; i < chordChart.length; i += 1) {
    const sectionStruct = chordChart[i];
    const section = createSectionElement(sectionStruct);

    for (let j = 0; j < sectionStruct.chords.length; j += 1) {
      section.append(createChordElement(sectionStruct.chords[j], j + 1));
    }

    container.append(section);
  }

  // Render chords
  chords.forEach(chord => {
    const struct = chord.struct;
    const numFrets = struct.numFrets || 5;
    new ChordBox(chord.el, {
      width: 260,
      height: numFrets * 60,
      numFrets,
      defaultColor: '#444'
    }).draw(struct);
  });
}

(() => {
  init();
})();
