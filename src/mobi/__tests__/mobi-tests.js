import { getFriend } from '@friends-library/friends';
import { convert } from '../../publish/asciidoc';
import { mobi } from '../index';

const rebecca = getFriend('rebecca-jones');

describe('mobi()', () => {

  let spec;

  beforeEach(() => {
    spec = {
      html: 'Foobar',
      lang: 'en',
      friend: rebecca,
      document: rebecca.documents[0],
      edition: rebecca.documents[0].editions[0]
    };
  });

  test.only('changes meta charset tags', () => {
    spec.html = convert('== Chapter 1\n\nParagraph.\n');
    const manifest = mobi(spec);

    const epubCharset = '<meta charset="UTF-8"/>';
    const mobiCharset = '<meta http-equiv="Content-Type" content="application/xml+xhtml; charset=UTF-8"/>';

    expect(manifest['OEBPS/sect1.xhtml']).not.toContain(epubCharset);
    expect(manifest['OEBPS/sect1.xhtml']).toContain(mobiCharset);
  });

  test('uses mobi prefix for uuid', () => {
    const manifest = mobi(spec);

    const expected = '<dc:identifier id="pub-id">friends-library/mobi/';

    expect(manifest['OEBPS/package-document.opf']).toContain(expected);
  });
});