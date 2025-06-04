import VideoHistoryTableRow from './VideoHistoryTableRow.jsx';
import TableSkeleton from '../Skeletons/TableSkeleton.jsx';


function VideoHistoryTable({videos, loading, show_videos_number, by_user}) {
  
    return (
        <table>
          <thead>
            <tr>
              <th>VIDEO INFO.</th>
              <th>PROGRESS</th>
            </tr>
          </thead>
          <tbody>
              
              { !loading && videos.length > 0 ?

              videos.map((video, index) => <VideoHistoryTableRow key={video.id} {...video}/> )
              : loading &&

              <TableSkeleton columns={["VIDEO INFO.", "PROGRESS"]} lines_number={by_user ? 2 : 3} rows_number={show_videos_number}/>


              }
          </tbody>
        </table>
    );
  }
  
export default VideoHistoryTable;