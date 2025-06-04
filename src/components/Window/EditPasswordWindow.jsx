import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const EditPasswordWindow = ({ onClose, state}) => {

    const [errorsArray, setErrorsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const windowRef = useRef(null);
    useEffect(() => {
        if (!state) {
            const form = windowRef.current.querySelector('#changePassword-form');
            if (form) {
                form.reset();
            }
        }
    }, [state]);

    
    async function changePassword(e) {
        e.preventDefault();
        setErrorsArray([]);
        setIsLoading(true);
        
        const formData = new FormData(e.target);
        const dataObject = {};
        
        for (const [key, value] of formData.entries()) {
            dataObject[key] = value;
        }
    
        const requestBody = `data=${encodeURIComponent(JSON.stringify(dataObject))}`;
    
        const request = new Request('/back/edit_my_password.php', { // Corrected endpoint
            method: 'POST',
            credentials: 'same-origin',
            body: requestBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    
        try {
            const res = await fetch(request);
            setIsLoading(false);
    
            if (!res.ok) {
                throw new Error('Server error');
            }
    
            const data = await res.json();
    
            if (!data.status) {
                setErrorsArray(data.errors || ['Failed to change password']);
            } else {
                setErrorsArray([]);
                onClose();
            }
        } catch (err) {
            setIsLoading(false);
            if (err.message === 'Failed to fetch') {
                setErrorsArray(['Network connection failure']);
            } else {
                setErrorsArray(['An error occurred. Please try again later. If the problem persists, contact an admin or the support staff.']);
            }
        }
    }
    


     
    // async function changePassword(e) {
    //     e.preventDefault();
    //     setErrorsArray([]);
    //     setIsLoading(true)
    //     const request = new Request('/back/changePassword.php', {
    //         method: 'POST',
    //         credentials: 'same-origin',
    //         body: new FormData(e.target),
    //     });
    
    //     fetch(request)
    //         .then((res) => {
    //             setIsLoading(false);
    //             if (!res.ok) {
    //                 setErrorsArray(['Failed to change password']);
    //                 throw new Error('Server error');
    //             }
    //             return res.json();
    //         })
    //         .then((data) => {
    //             if (!data.status) {
    //                 setErrorsArray(data.errors);
    //             }else{
    //                 setErrorsArray([]);
    //                 onClose();
    //             }
    //         })
    //         .catch((err) => {
    //             if (err.message === 'Failed to fetch') {
    //                 setErrorsArray(['Network connection failure']);
    //             } else {
    //                 setErrorsArray(['An error occurred. Please try again later. If the problem persists, contact an admin or the support staff.']);
    //             }
    //         });
    // }
    
    return ReactDOM.createPortal(
        <div className='window-container' style={state===false ? { display: 'none' } : {}}>
            <div className={'window change-password-window'} ref={windowRef}>
                <h2 className="change-password-header">Change your password</h2>
                <form style={{width: "100%"}} onSubmit={changePassword} id='changePassword-form'>
                    <div className="uniqueField-parent required">
                        <span className="uniqueField-title">Current Password</span>
                        <input className="uniqueField" type="password" id="currentPasswordInput" name='currentPassword' />
                    </div>
                    <div className="uniqueField-parent required">
                        <span className="uniqueField-title">New Password</span>
                        <input className="uniqueField" type="password" id="newPasswordInput" name='newPassword'  />
                    </div>
                    <div className="uniqueField-parent required">
                        <span className="uniqueField-title">Confirm New Password</span>
                        <input className="uniqueField" type="password" id="confirmNewPassword" name='confirmNewPassword'  />
                    </div>
                    <div id="errorsBox" style={{display: "block", width: "100%"}}>
                        {errorsArray.length !== 0 && 
                        <div key={Math.random()} className="error-message change-password-message">
                            <span>Please fix the following problem(s):</span>
                            <ul>
                                {errorsArray.map((err, i)=>{
                                    return(
                                        <li key={i}>{err}</li>
                                    )
                                })}
                            </ul>
                        </div>}
                    </div>
                    <div className="hr-buttons-container">
                        <div className="hr" ></div>
                        
                        <div className='cropper-btn-container' style={ isLoading?{marginTop:'1rem', justifyContent: "flex-end", pointerEvents:'none', opacity:'0.7'} : {marginTop:'1rem', justifyContent: "flex-end"}}>
                            <button className='danger' form='' onClick={()=>{  setErrorsArray([]); onClose();}}>Cancel</button>
                            <button form='changePassword-form' >Save</button>
                        </div>
                    </div>
                    
                </form>


          
            </div>
        </div>,
        document.body
    );
};
export default EditPasswordWindow;