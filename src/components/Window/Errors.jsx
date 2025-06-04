import ConnectionFailureWindow from './ConnectionFailureWindow';
import DataParseFailureWindow from './DataParseFailureWindow';

const Errors = ({ error, close }) => {
  switch (error.error) {
    case "connection":
        return ( <ConnectionFailureWindow retry={error.retry} close={close} message={error.message} height={610} /> );
        break;
    case "parse":
        return ( <DataParseFailureWindow retry={error.retry} close={close} message={error.message} height={610} /> );
        break;
  }

};

export default Errors;