import React, { useEffect, useRef, useState } from 'react'
import PinInput from 'react-hook-pin-input';
import style from '../styles/LoadingOverlay.module.css'
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

export const getServerSideProps = async () => {
  if (typeof window !== "undefined") {
    return {
      props: {}
    }
  }
}

const LoadingOverlay = ({ overlay, otpBox, setActive, email }) => {
  const [OTP, setOTP] = useState("");
  const router = useRouter()

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    if (OTP.length === 6) {
      const result = await signIn('credentials', { verification: true, otp: OTP, email, redirect: false })

      if (result.ok) {
        toast.success('Successsfully Created User')
        setActive({ overlay: false, otpBox: false })
        setOTP('')
        router.push('/')
      } else {
        toast.error(result.error)
      }
    } else {
      toast.error('Fill the OTP field correctly')
    }
  }

  useEffect(() => {
    if (overlay) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = 'auto'
    }
  }, [])

  return (
    <div className={`${style.loading_overlay} ${!overlay && style.loading_overlay_hidden}`} >
      <div className={`${style.otpBox} ${!otpBox && style.otpBox_hidden}`}>
        <div className={style.otp_message}>
          You have got an OTP in your email
        </div>
        <form onSubmit={handleOtpSubmit}>
          <PinInput
            onChange={setOTP}
            onComplete={() => console.log(OTP)}
            autoFocus
          // values={[OTP]}
          />
          <div className={style.otp_action}>
            <button type='submit' className={style.submit_button}>Submit</button>
            <div
              onClick={() => {
                setActive(false)
                setOTP('')
              }}
              className={style.submit_button}>
              Cancel
            </div>
          </div>
          <div className={style.otp_spam_message}>
            If you dont see any mail, please check the spam folder
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoadingOverlay