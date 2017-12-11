// react 16 needs a requestAnimationFrame polyfill
import 'raf/polyfill'

// enzyme needs an adapter...
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})
