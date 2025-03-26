import { GrInstagram } from 'react-icons/gr';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth'; // adjust the path if needed

export function Footer() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  const handleListCabinClick = () => {
    if (isAuthenticated) {
      navigate('/cabin/post');
    } else {
      navigate('/login');
    }
  };

  return (
    <footer className="m-10 flex flex-col justify-between">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-[20px] font-semibold">Contact</h1>
          <p className="cursor-pointer">Help Center & Contact</p>
          <p
            onClick={handleListCabinClick}
            className="cursor-pointer hover:underline"
          >
            List your cabin
          </p>
        </div>
        <div>
          <h1 className=" text-[20px] font-semibold">Legal Policies</h1>
          <p className=" cursor-pointer">Terms of Service</p>
          <p className="cursor-pointer">Privacy Policy</p>
        </div>
        <div>
          <h1 className="text-[20px] font-semibold">Follow us</h1>
          <div className="flex justify-between mt-2 flex-row">
            <GrInstagram className="text-2xl cursor-pointer" />
            <FaFacebookSquare className="text-2xl ml-2 cursor-pointer" />
            <FaLinkedin className="text-2xl ml-2 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex font-semibold text-[15px] justify-center mt-20">
        <p>©2025 StayAwhile</p>
      </div>
    </footer>
  );
}
