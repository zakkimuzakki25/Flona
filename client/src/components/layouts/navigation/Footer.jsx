/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import logo from '../../../assets/logo/logo-white.svg'
import emailIcon from '../../../assets/icon/footer/Email.svg'
import instagramIcon from '../../../assets/icon/footer/Instagram.svg'
import youtubeIcon from '../../../assets/icon/footer/Youtube.svg'
import facebookIcon from '../../../assets/icon/footer/Facebook.svg'

const Footer = () => {

  // useEffect(() => {
  //   if (token) {
  //     getDataUser()
  //   }
  //   console.log("keynav = " + Skey)
  //   if (typeof Skey === 'string') {
  //     setSearchKey(Skey)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [token])

  return (
    <footer className='flex flex-col w-full h-fit bg-primary-500 z-40 relative justify-center items-center'>
        {/* top */}
        <div className="flex flex-row w-full my-5 justify-between px-40 pt-5">

          {/* left */}
          <div className="flex flex-col items-center gap-4 h-full self-center">
            <Link to={"/"}>
              <img src={logo} alt="logo button flona" className="h-20" />
            </Link>
            <h4 className='font-medium text-white'>
              Misi Bersama Lindungi Dunia
            </h4>
          </div>

          {/* center */}
          <div className="flex flex-col items-start gap-6 text-white tracking-wide text-nowrap">
            <h4 className="font-semibold">Pusat Bantuan</h4>
            <div className="gap-7 flex flex-col items-start">
              <Link className='b1'>Tentang Flona</Link>
              <Link className='b1'>Pelayanan Pelanggan</Link>
              <Link className='b1'>Syarat dan Ketentuan</Link>
              <Link className='b1'>Kebijakan Privasi</Link>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col items-start gap-6 text-white tracking-wide text-nowrap">
            <h4 className="font-semibold">Hubungi Kami</h4>
            <div className="gap-3 flex flex-col items-start">
              <Link className="flex flex-row gap-2.5 items-center">
                <img src={instagramIcon} alt="instagram icon" className='h-7'/>
                <p className='b1'>@flona.id</p>
              </Link>
              <Link className="flex flex-row gap-2.5 items-center">
                <img src={facebookIcon} alt="facebook icon" className='h-7'/>
                <p className='b1'>Flona Indonesia</p>
              </Link>
              <Link className="flex flex-row gap-2.5 items-center">
                <img src={youtubeIcon} alt="youtube icon" className='h-7'/>
                <p className='b1'>Flona Indonesia</p>
              </Link>
              <Link className="flex flex-row gap-2.5 items-center">
                <img src={emailIcon} alt="email icon" className='h-7'/>
                <p className='b1'>flonaid@gmail.com</p>
              </Link>
            </div>
          </div>
            
        </div>

        {/* line */}
        <div className="flex w-full bg-primary-400 h-0.5"></div>

        {/* bottom */}
        <div className="flex w-full h-fit items-center justify-center py-7">
          <p className='b1 text-white'>© 2025 Flona. Seluruh Hak Cipta Dilindungi.</p>
        </div>
    </footer>
  )
}

export default Footer