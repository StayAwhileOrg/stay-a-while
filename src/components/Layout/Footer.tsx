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
    <div className={'md:mt-56 mt-26 '}>
      <div className={'w-full h-[1px] bg-[#2D4B4860]'}></div>
      <footer className="mt-20 mb-10 flex flex-col max-w-[980px]  mx-auto">
        <div className="flex md:flex-row justify-between flex-col md:items-start items-center text-center gap-10">
          <div className={'w-[164px] flex flex-col gap-2'}>
            <h1 className="text-[20px] font-semibold">Contact</h1>
            <p className="cursor-pointer">Help Center & Contact</p>
            <p
              onClick={handleListCabinClick}
              className="cursor-pointer hover:underline"
            >
              List your cabin
            </p>
          </div>
          <div className={'w-[164px] flex flex-col gap-2'}>
            <h1 className="text-[20px] font-semibold">Legal Policies</h1>
            <p className=" cursor-pointer">Terms of Service</p>
            <p className="cursor-pointer">Privacy Policy</p>
          </div>
          <div className={'w-[164px] flex flex-col gap-2'}>
            <h1 className="text-[20px] font-semibold">Follow us</h1>
            <div className="flex gap-2 mt-2 flex-row justify-center">
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
    </div>
  );
}
