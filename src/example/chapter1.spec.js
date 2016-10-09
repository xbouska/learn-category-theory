/**
 * Created by Richard Bouška on 22. 9. 2016.
 */
/*jest.unmock('../lib/main'); // eslint-disable-line no-undef*/
import { str } from '../lib/main';


describe('str contract accepts a string param', () => { // eslint-disable-line no-undef
  expect(str('some text')).toBe('some text'); // eslint-disable-line no-undef
});
