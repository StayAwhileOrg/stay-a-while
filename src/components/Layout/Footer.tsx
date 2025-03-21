import { GrInstagram } from 'react-icons/gr';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className="m-10 flex flex-col justify-between">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="md:text-[24px] text-[20px] font-semibold">Contact</h1>
          <p className="text-[15px] md:text-[20px] cursor-pointer">
            Help Center & Contact
          </p>
          <p className="text-[15px] md:text-[20px] cursor-pointer">
            List your cabin
          </p>
        </div>
        <div>
          <h1 className="md:text-[24px] text-[20px] font-semibold">
            Legal Policies
          </h1>
          <p className="text-[15px] md:text-[20px] cursor-pointer">
            Terms of Service
          </p>
          <p className="text-[15px] md:text-[20px] cursor-pointer">
            Privacy Policy
          </p>
        </div>
        <div>
          <h1 className="md:text-[24px] text-[20px] font-semibold">
            Follow us
          </h1>
          <div className="flex justify-between mt-2 flex-row">
            <GrInstagram className="text-2xl cursor-pointer" />
            <FaFacebookSquare className="text-2xl ml-2 cursor-pointer" />
            <FaLinkedin className="text-2xl ml-2 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex font-semibold  md:text-[20px] text-[15px] justify-center mt-20">
        <p>©2025 StayAwhile</p>
      </div>
    </footer>
  );
}
