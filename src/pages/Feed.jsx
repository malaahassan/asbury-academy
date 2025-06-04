import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import FeedContent from '../components/FeedContent/FeedContent';

function Feed() {

  
    return (
        <div className="inner-content">
          <Sidebar page='community'/>
          <div className="inner-content-with-header">
            <Header />
            <FeedContent page='community'/>
          </div>
        </div>
    );
  }
  
export default Feed;