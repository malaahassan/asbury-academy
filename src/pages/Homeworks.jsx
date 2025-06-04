import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import FeedContent from '../components/FeedContent/FeedContent';

function Homeworks() {
    return (
        <div>
            <Header />
            <div className="inner-content">
                <Sidebar page='homeworks'/>
                <FeedContent page='homeworks'/>
            </div>
        </div>
    );
  }
  
export default Homeworks;