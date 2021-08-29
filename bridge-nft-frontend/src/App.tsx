import loadable from '@loadable/component';
const OtherComponent = loadable(() => import('./CustomNavbar'));

function App() {
  return (
    <div>
        <OtherComponent />
    </div>
  );
}

export default App;