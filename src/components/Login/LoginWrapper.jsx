const LoginWrapper = ({children}) => {
  return (
    <div className='login-page'>
      {/* <img className='login-bg' src='./images/login/test5.jpg' alt='Background' /> */}
      <ul className="login-background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
      </ul>
      {children}
    </div>
  );
};

export default LoginWrapper;