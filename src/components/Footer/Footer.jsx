import { FaYoutube, FaFacebook, FaTwitter, FaGoogle, FaGooglePlay, FaLinkedin } from "react-icons/fa"
import "./Footer.css"


const Footer = () => {

    return (
        <div>
            <div className="footer-part1">
                <div className="footer-fontsize" >
                    <FaYoutube className="youtube" />
                    <FaFacebook className="fb" />
                    <FaTwitter className='twitter' />
                    <FaGoogle className="google" />
                    <FaGooglePlay className='play' />
                    <FaLinkedin className='like' />
                </div>
            </div>

            <div className="footer-newbox">
                <ul className="footer-newbox-list">

                    <li><p>Service</p></li>
                    <li> <p>Activity</p></li>
                    <li><p>Terms and conditions</p></li>
                    <li><p>Contact us</p></li>
                    <li className="footer-new-box-item">
                        <p>Send your recomendation</p>
                        <div className="send-recomend" >
                            <input className="send-input" placeholder="Send your recomendation" />
                            <button className="footer-send-btn">Send</button>
                        </div>
                    </li>

                </ul>



            </div>

            <div className="footer-copyryt">
                <span>Copyright@ 2024 .All rights reserved.</span>
            </div>
        </div>





    )

}

export default Footer;









// import React from 'react'
// import './Footer.css'
// import { FaFacebookSquare } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className='footer'>
//       <div className='foot-container'>
//       <div className='footer-container'>
//         <p>Tel: +31619123456</p>
//         <p>flaverfinds@gmail.com</p>
//         <div>
//         <FaFacebookSquare/>
//       <FaInstagram/>
//       </div>
//       </div>

//       </div>
//     </footer>
//   )
// }

// export default Footer