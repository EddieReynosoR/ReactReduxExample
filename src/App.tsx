import ListOfUsers from './components/ListOfUsers';
import './App.css'
import { CreateNewUser } from './components/CreateNewUser';
import { Toaster } from 'sonner';

function App() {

  return (
    <>
     <ListOfUsers/>
     <CreateNewUser/>
     <Toaster richColors />
    </>
  )
}

export default App
