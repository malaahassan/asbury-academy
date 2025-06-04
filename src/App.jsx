import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import Dashboard from './pages/Dashboard';
import Favourites from './pages/Favourites'
import Profiles from './pages/Profiles';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from './pages/Posts';
import AdminAccounts from './pages/AdminAccounts';
import AdminGroups from './pages/AdminGroups';
import AdminTests from './pages/AdminTests';
import AdminVideos from './pages/AdminVideos';
import Videos from './pages/Videos';
import Watch from './pages/Watch';
import VideosHistory from './pages/VideosHistory';
import Assignments from './pages/Assignments';

//TESTS
import ACTTests from './pages/ACTTests';
import ESTTests from './pages/ESTTests';
import SATTests from './pages/SATTests';
import DigitalSATTests from './pages/DigitalSATTests';
import ReadingWorkouts from './pages/ReadingWorkouts';
import WritingWorkouts from './pages/WritingWorkouts';


import NotFound from './pages/NotFound';
import ProtectedRoutes from './components/Contexts/ProtectedRoutes';
import { LoginContextProvider } from './components/Contexts/LoginContext';
import { MenuProvider } from './components/Contexts/MenuContext';
import { ErrorProvider } from "./components/Contexts/UseXHR";
import './index.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <LoginContextProvider>
          <MenuProvider>
            <ErrorProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoutes />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/community" element={<Feed />} />
                  <Route path="/assignments" element={<Assignments />} />
                  <Route path="/videos" element={<Videos />} />
                  <Route path="/videos/history" element={<VideosHistory />} />
                  <Route path="/tests/act" element={<ACTTests />} />
                  <Route path="/tests/est" element={<ESTTests />} />
                  <Route path="/tests/sat" element={<SATTests />} />
                  <Route path="/tests/digitalsat" element={<DigitalSATTests />} />
                  <Route path="/tests/reading-workouts" element={<ReadingWorkouts />} />
                  <Route path="/tests/writing-workouts" element={<WritingWorkouts />} />
                  <Route path="/admin/accounts" element={<AdminAccounts />} />
                  <Route path="/admin/groups" element={<AdminGroups />} />
                  <Route path="/admin/tests" element={<AdminTests />} />
                  <Route path="/admin/videos" element={<AdminVideos />} />
                  {/* <Route path="/admin/admissions" element={<Admissions />} />
                  <Route path="/admin/inquiries" element={<Inquiries />} />
                  <Route path="/admin/audit-log" element={<AuditLog />} /> */}

                  <Route path="/settings" element={<Settings />} />
                  <Route path="/videos/watch/:id" element={<Watch />} />
                  <Route path="/community/posts/:id" element={<Posts />} />
                  <Route path="/community/profiles/:id" element={<Profiles />} />
                  <Route path="/community/favourites" element={<Favourites />} />
                  {/*<Route path="/exam/:id" element={<Exam />} />*/}
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorProvider>
          </MenuProvider>
        </LoginContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;