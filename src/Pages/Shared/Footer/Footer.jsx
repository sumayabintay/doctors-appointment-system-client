import React from 'react'
import { Link } from 'react-router-dom'
import footer from '../../../assets/images/footer.png'

export default function Footer() {
  return (
    <footer
      style={{
        background: `url(${footer})`,
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
      className=" pt-24 text-neutral-content mx-5">
      <div className='footer text-black justify-between'>
        <div>
          <span className="footer-title text-secondary">SERVICES</span>
          <Link className="link link-hover">Emergency Checkup</Link>
          <Link className="link link-hover">Monthly Checkup</Link>
          <Link className="link link-hover">Weekly Checkup</Link>
          <Link className="link link-hover">Deep Checkup</Link>
        </div>
        <div>
          <span className="footer-title text-secondary">ORAL HEALTH</span>
          <Link className="link link-hover">Fluoride Treatment</Link>
          <Link className="link link-hover">Cavity Filling</Link>
          <Link className="link link-hover">Teath Whitening</Link>
        </div>
        <div>
          <span className="footer-title text-secondary">LEGAl</span>
          <Link className="link link-hover">Terms of use</Link>
          <Link className="link link-hover">Privacy policy</Link>
          <Link className="link link-hover">Cookie policy</Link>
        </div>
        <div>
          <span className="footer-title text-secondary">OUR ADDRESS</span>
          <Link className="link link-hover">Green University of Bangladesh</Link>
        </div>
      </div>
      <div className='mt-16 text-center pb-7 text-black'>
        <p>Copyright © 2023 - All Rights Reserved © Developers Team </p>
      </div>
    </footer>
  )
}
