import { ChordBox } from 'vexchords';

export function renderChords(chordChart) {
  const chords = [];

  function createChordElement(chordStruct) {

    const chordbox = document.createElement('div');
    chordbox.setAttribute('class', 'chord');

    const chordCanvas = document.createElement('div');

    const chordName = document.createElement('div');
    chordName.setAttribute('class','chordname');

    const chordHeading = document.createElement('h3');
    chordHeading.innerText = chordStruct.name;

    const chordLabel = document.createElement('span');
    chordLabel.setAttribute('class', 'chordlabel');
    chordLabel.innerText = chordStruct.number;

    const position = chordStruct.position || 0;
    const positionText = chordStruct.positionText || 0;
    const offset =
      positionText > 0
        ? position - positionText - 1
        : position > 0
          ? position - 1
          : position;

    const newChord = {
      el: chordCanvas,
      struct: chordStruct,
      frets: chordStruct.chord
        .map(x => x[1]) // assumes chord string order is 1,2,3,4,5,6
        .reverse()
        .map(x => (x === 'x' ? x : x + offset))
    };

    chords.push(newChord);

    const chordnotes = document.createElement('p');
    chordnotes.setAttribute('class', 'chordfrets');
    chordnotes.innerText = newChord.frets.toString();

    chordName.insertBefore(chordLabel, null);
    chordName.insertBefore(chordHeading, null);
    chordbox.insertBefore(chordName, null);
    chordbox.insertBefore(chordCanvas, null);
    chordbox.insertBefore(chordnotes, null);

    return chordbox;
  }

  function createSectionElement(sectionStruct) {

    const section = document.createElement('div');
    section.setAttribute('class', 'section');
    
    const sectionTitle = document.createElement('div');
    sectionTitle.setAttribute('class', 'title');
    sectionTitle.innerText = sectionStruct.section;
    
    const sectionDesc = document.createElement('div');
    sectionDesc.setAttribute('class', 'description');
    sectionDesc.innerText = sectionStruct.description;

    section.insertBefore(sectionTitle, null);
    section.insertBefore(sectionDesc, null);

    return section;
  }

  function init() {
    chords.length = 0;

    const container = document.getElementById('container');

    // Display chordChart
    const { title, description, sections } = chordChart;

    const titleElement = document.createElement('h1');
    titleElement.innerText = title;
    container.insertBefore(titleElement, null);

    const descElement = document.createElement('p');
    descElement.innerText = description;
    container.insertBefore(descElement, null);

    for (let i = 0; i < sections.length; i += 1) {
      const sectionStruct = sections[i];
      const section = createSectionElement(sectionStruct);

      for (let j = 0; j < sectionStruct.chords.length; j += 1) {
        section.append(createChordElement(sectionStruct.chords[j], j + 1));
      }

      container.insertBefore(section, null);
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

  init();
  return chords;
}
