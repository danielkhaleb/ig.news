import { signIn, useSession, UseSessionOptions } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const session = useSession();
    const router = useRouter();

    async function handleSubscribe() {
        if (!session || session.status !== 'authenticated') {
            signIn('github');
            return;
        }

        console.log(session)
        if (session?.data?.active) {
            router.push('/posts')
            return;
        }
        try {
            const response = await api.post('/subscribe');

            const { sessionId } = response.data;

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({sessionId})
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <button
        onClick={handleSubscribe}
        type="button"
        className={styles.subscribeButton}>
            Subscribe Here
        </button>
    )
}