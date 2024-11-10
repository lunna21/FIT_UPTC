import dynamic from 'next/dynamic';

const Pending = dynamic(() => import('@/components/Pending'), { ssr: false });

export default Pending;