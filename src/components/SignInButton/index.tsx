import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from "next-auth/react";

export function SignInButton() {
    const session = useSession();
    const isUserLoggedIn = session.status === 'authenticated';
    const colorGitHubIcon =  isUserLoggedIn ? '#eba417' : '#04d361'
    return (
        <button 
            className={styles.signInButton}
            type="button"
            onClick={() => {
                if (!isUserLoggedIn){
                    signIn('github')
                } else {
                    signOut()
                }
            }}
            >
            <FaGithub color={colorGitHubIcon} />
             {isUserLoggedIn ? <>Allllou</> : <>Sign in with Github</>}
            <FiX className={styles.closeIcon} />
        </button>
    )
}