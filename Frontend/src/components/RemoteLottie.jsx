import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
const RemoteLottie = ({ path, className, loop = true, ...props }) => {
    const [animationData, setAnimationData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!path) return;
        let isMounted = true;
        fetch(path)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load animation: ${res.statusText}`);
                return res.json();
            })
            .then(data => {
                if (isMounted) setAnimationData(data);
            })
            .catch(err => {
                console.error('RemoteLottie Error:', err);
                if (isMounted) setError(err);
            });
        return () => {
            isMounted = false;
        };
    }, [path]);
    if (error) {
        return <div className={`flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg ${className}`}>
            <span className="text-[10px] text-slate-400 font-medium">Failed to load animation</span>
        </div>;
    }
    if (!animationData) {
        return <div className={`animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg ${className}`} />;
    }
    return (
        <Lottie
            animationData={animationData}
            className={className}
            loop={loop}
            {...props}
        />
    );
};
export default RemoteLottie;