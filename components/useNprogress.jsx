import { useRouter } from "next/router";
import NProgress from "nprogress";

const useNProgress = () => {
    const router = useRouter()

    const delayAndGo=(e, to)=>{
        console.log({to});
        NProgress.start()
        e.preventDefault();
        setTimeout(() => router.push(`/post/${to}`, 600))
    }

    const handleStop = () => {
        NProgress.done()
    }

    return {delayAndGo, handleStop}

}

export default useNProgress