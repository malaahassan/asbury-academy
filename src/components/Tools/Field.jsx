import DropDown from './DropDown';

const Field = ({ label, value, onChange, type, options, id}) => {
            return(
            <div className='account-input-field'>
                <div className="accounts-name-header">
                    <h1 style={{ fontSize: '17px' }}>{label}</h1>
                    <svg className="settings-arrow" style={{ transform: 'rotate(0deg)' }} fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z" />
                    </svg>
                </div>
                   
                {type != "dropdown" ?
                    <input type={type} defaultValue={value} onChange={onChange} />
                    :
                    <DropDown
                                options={options}
                                value={value}
                                onChange={onChange} 
                                sections={[]}
                                menuId={id}
                    />
                }
                

              
                
            </div>
        )};
export default Field;