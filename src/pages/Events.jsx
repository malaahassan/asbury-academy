import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import FeedContent from '../components/FeedContent/FeedContent';

function Events() {
    return (
        <div>
            <Header />
            <div className="inner-content">
                <Sidebar page='events'/>
                <FeedContent page='events' />
            </div>
        </div>
    );
  }
  
export default Events;