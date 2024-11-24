import { useState } from 'react'

const useShowPopUp = () => {
    const [status, setStatus] = useState("")
    const [text, setText] = useState('Error')
    const [isShow, setIsShow] = useState(false)
    const DURATION = 5000;

    const showPopUp = ({ status, text }) => {
        setStatus(status);
        setText(text);
        setIsShow(true)
    }

    return {
        status,
        setStatus,
        setText,
        text,
        duration: DURATION,
        isShow,
        setIsShow,
        onClose: () => setIsShow(false),
        showPopUp,
    }
}

export default useShowPopUp