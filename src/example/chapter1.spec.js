/**
 * Created by Richard Bouška on 22. 9. 2016.
 */

import { str } from '../../lib/main';


test('str contract accepts a string param', () => { // eslint-disable-line no-undef
  expect(str('some text')).toBe('some text'); // eslint-disable-line no-undef
});
