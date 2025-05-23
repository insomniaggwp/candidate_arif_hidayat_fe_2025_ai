import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { logout } from "../services/authService";

const BaseTemplate = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const isSuccessLogout = await logout();
      if (isSuccessLogout) {
        window.location.href = "/";
        alert('Logout successful.')
      } else {
       throw new Error('Logout Failed') 
      }
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <>
     <div className="flex p-5 text-neutral bg-primary justify-between items-center mb-4">
        <h1 className="text-headline-size text-headline-line font-bold cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard Content Managment</h1>

        <div className="flex items-center gap-4">
          <h1 className="text-headline-size text-subheadline-line">{user.username}</h1>
          <Button variant="danger" onClick={() => handleLogout()}>Logout</Button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4">
        {children}
      </div>
    </>
  )
}

export default BaseTemplate;